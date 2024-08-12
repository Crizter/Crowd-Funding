import express from 'express';
import { dashBoardFields, pool } from '../database/db.js';
import '../auth/passport.js'
import passport from 'passport';

const router = express.Router();


// Endpoint to get user information with authorization check
router.get('/user-dashboard', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const userIdFromToken = parseInt(req.user.id); // User ID from JWT payload
    const userIdFromQuery = parseInt(req.query.userId); // User ID from query parameters    
    
    if (!userIdFromQuery) {
        return res.status(400).json({ message: 'No user ID provided.' });
    }

    // Check if the user ID from the query matches the user ID from the token
    if (userIdFromToken !== userIdFromQuery) {
        return res.status(403).json({ message: 'Forbidden: You do not have access to this resource' });
    }

    try {
        const result = await pool.query('SELECT * FROM users WHERE id = $1', [userIdFromQuery]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'User not found.' });
        }
        console.log(result.rows[0]);
        
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: `Error fetching user information. ${error.message}` });
    }
});

// Endpoint for admin dashboard
router.get('/admin-dashboard', async (req, res) => {
    const userId = req.query.userId;
    const role = 'admin';
    if (!userId) {
        return res.status(400).json({ message: 'No user ID provided.' });
    }
    try {
        const result = await pool.query('SELECT * FROM users WHERE id = $1 AND role = $2', [userId, role]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Admin user not found.' });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: `Error fetching admin dashboard. ${error.message}` });
    }
});

// ENDPOINT TO GET FIELD RESULTS OF DASHBOARD
 router.get('/getDashboardData',passport.authenticate('jwt', {session: false }), async(req,res) => { 
    const userIdFromToken = parseInt(req.user.id); // User ID from JWT payload
    const userIdFromQuery = parseInt(req.query.userId); // User ID from query parameters    
    console.log('User ID from token:', typeof(userIdFromToken));
    console.log('User ID from query:', typeof(userIdFromQuery));
    if(!userIdFromQuery) { 
        return res.status(400).json({message : 'No user ID provided.'}) ; 

    }
    // Check if the user ID from the query matches the user ID from the token
    if (userIdFromToken !== userIdFromQuery) {
        return res.status(403).json({ message: 'Forbidden: You do not have access to this resource' });
    }

    try {
        
        const body = await dashBoardFields(userIdFromQuery) ; 
        if(!body) { 
            return res.status(400).json({message : 'No data found.'}) ; 
        }
        console.log(body);
        res.status(200).json(body) ; 
        
    } catch (error) {
        res.status(500).json({ message: `Error fetching data. ${error.message}` });
    }
 })
export default router;

