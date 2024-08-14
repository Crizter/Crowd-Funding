import express from 'express' ; 
import {  pool } from '../database/db.js';
import passport from 'passport' ; 
const router = express.Router() ; 

// CREATE PROJECT
router.post('/create',passport.authenticate('jwt', {session : false}), async (req, res) => {
    const { title, description, funding_goal, category, deadline, country } = req.body;
    const userIdFromQuery = parseInt(req.query.userId);
    const userIdFromToken = parseInt(req.user.id);

    if (!userIdFromQuery) {
        return res.status(400).json({ message: "No user id passed" });
      }
      if (userIdFromQuery !== userIdFromToken) {
        return res.status(403).json({
          message: "Forbidden: You do not have access to this resource",
        });
      }

    if (!title || !description || !funding_goal || !category || !deadline || !country) {
        return res.status(400).json({ message: 'Empty Field' });
    }

    try {
        await pool.query(
            'INSERT INTO projects (title, description, funding_goal, category, deadline, creator_id, country) VALUES ($1, $2, $3, $4, $5, $6,$7)', 
            [title, description, funding_goal, category, deadline, userIdFromQuery,country]
        );
        res.status(201).json('Successfully created the post.');
    } catch (error) {
        res.status(400).json({ message: `Error creating the post. ${error.message}` });
    }
});

// UPDATE PROJECT  

router.post('/update', async (req,res) => { 
    const { title, description, funding_goal, category, deadline } = req.body;
    const postId = req.query.postId ; 
    
    if(!postId) { 
       return res.status(400).json({message : 'Post not found for update.'})
    }
    try {
        const response = await  pool.query('SELECT * FROM projects WHERE id  = $1', [postId]) ; 
        const result = response.rows[0] ; 
        if(!result) { 
           return res.status(400).json({message : 'Post not found in the database.'}) ; 
        }
        await pool.query(
            `UPDATE projects 
             SET title = COALESCE($1, title),
                 description = COALESCE($2, description),
                 funding_goal = COALESCE($3, funding_goal),
                 category = COALESCE($4, category),
                 deadline = COALESCE($5, deadline)
             WHERE id = $6`,
            [title, description, funding_goal, category, deadline, postId]
        );
        res.status(200).json({message : 'Updated successfully.'});
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message : `Error updating the format. ${error.message}`}) ; 
    }
});

// DELETE THE PROJECT 
router.post('/delete', async (req,res) => { 
    const postId = req.query.postId ; 

    if(!postId) { 
        return res.status(400).json({message : 'Post not found for update.'})
    }
    try {
        const response = await pool.query('SELECT * FROM projects WHERE id  = $1', [postId]) ; 
        const result = response.rows[0] ; 
        if(!result ) { 
           return  res.status(400).json({message : 'Post not found in the database.'}) ; 
        }
        await pool.query(
           'DELETE FROM projects  WHERE id = $1 ', [postId]
        );
        res.status(200).json({message : 'Deleted successfully.'});
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message : `Error deleting the format. ${error.message}`}) ; 
    }
});


// VIEW ALL THE PROJECTS BASED ON USER ID 


router.get('/viewAll-id',async(req,res) => { 
    const userId = req.query.userId ; 

    try {
        const response = await pool.query('SELECT * FROM projects WHERE creator_id = ($1)', [userId]) ;   
        if(!response) { 
           return  res.status(400).json({message : 'Posts not found in the database.'}) ; 
        }
        res.status(200).json(response.rows) ; 

    } catch (error) {
         console.log(error.message);
        res.status(500).json({message : `Error loading the posts. ${error.message}`}) ; 
    }
})

// VIEW ALL THE PROJECTS WITHOUT PASSING USER ID. 


router.get('/viewAll',async(req,res) => { 

    try {
        const response = await pool.query('SELECT * FROM projects') ;   
        if(!response) { 
           return  res.status(400).json({message : 'Posts not found in the database.'}) ; 
        }
        console.log(response.rows);
        res.status(200).json(response.rows) ; 
        
    } catch (error) {
         console.log(error.message);
        res.status(500).json({message : `Error loading the posts. ${error.message}`}) ; 
    }
})

// VIEW SINGLE PROJECT 
 router.get('/view', async(req,res)=>{ 
    const project_id = req.query.project_id ; 

    if(!project_id) { 
        return res.status(400).json({message : 'Post not found.'})
    }
    try {
        const response = await pool.query('SELECT * FROM projects WHERE id  = $1', [project_id]) ; 
        const result = response.rows[0] ; 
        if(!result) { 
           return  res.status(400).json({message : 'Post not found in the database.'}) ; 
        }
    
        return res.status(200).json(result);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message : `Error deleting the format. ${error.message}`}) ; 
    }
 })

// FILTER OUT THE PROJECT 
 router.get('/filter', async(req,res) => {

    const category = req.query ; 
    console.log('the category is ', category.selectOption);
    
    try {
        const response = await pool.query('SELECT * FROM projects WHERE category = $1', [category.selectOption]) ; 
        console.log(response.rows);
        if(category.selectOption === 'Show All'){
            const alternateResponse = await pool.query('SELECT * FROM projects') ; 
            return res.status(200).json(alternateResponse.rows)
        }
        if(response.rows.length === 0 ) { 
            return res.status(200).json(response.rows) ; 
        }
        res.status(200).json(response.rows) ; 

    } catch (error) {
         console.log(error.message);
        res.status(500).json({message : `Error deleting the format. ${error.message}`}) ; 
    }
 })

export default  router ;