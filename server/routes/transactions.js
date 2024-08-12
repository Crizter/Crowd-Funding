import express from 'express';
import { pool } from '../database/db.js';

const router = express.Router();

router.post('/payment', async (req,res) => { 

    const userId = req.query.userId ;
    const projectId = req.query.projectId ; 
    const transactionAmount = req.body.transactionAmount; 
    if (!userId) {
        return res.status(400).json({ message: 'No user id passed' });
    }

    if (!projectId) {
        return res.status(400).json({ message: 'No project id passed' });
    }

    if (!transactionAmount) {
        return res.status(400).json({ message: 'No transaction amount passed' });
    }
    try {
        await pool.query('INSERT INTO transactions(project_id, user_id, transaction_amount ) VALUES  ($1, $2, $3) ', [projectId, userId, transactionAmount])
        await pool.query('UPDATE projects  SET amount_raised = amount_raised + ($1) WHERE id = ($2)', [transactionAmount, projectId]) ;
        res.status(200).json({message : 'Transaction updated successfully.'});
    } catch (error) {
        res.status(400).json({message : error.message})
    }
}) ; 

router.get('/all-payments', async (req,res) => { 
    const userId = req.query.userId ; 
    if (!userId) {
        return res.status(400).json({ message: 'No project id passed' });
    }
    
    try {
        const response = await pool.query('SELECT * FROM  transactions WHERE user_id = ($1)', [userId])
        if (response.rows.length === 0) {
            return res.status(204).json({ message: 'No data found' });
        }
        console.log('All transactions', response.rows);
        res.status(200).json(response.rows) ; 
    } catch (error) {
        res.status(400).json({message : error.message})
    }

})

export default router ; 