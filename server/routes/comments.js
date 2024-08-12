import express from "express";
import { pool } from "../database/db.js";
import passport from "passport";

const router = express.Router();

// POST COMMENTS
router.post(
  "/add-comment",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const userIdFromToken = parseInt(req.user.id); // User ID from JWT payload
    const projectId = parseInt(req.query.projectId);
    const comment = req.body.comment;
    console.log(userIdFromToken, projectId, comment);
    
    // CHECK IF USER IS LOGGED IN
    if (!userIdFromToken) {
      return res.status(400).json({ message: "No user ID provided." });
    }

    if (!projectId || !comment) {
      return res
        .status(204)
        .json({ message: "No project ID or comment provided." });
    }

    try {
      await pool.query(
        "INSERT INTO comments(creator_id , project_id, comment) VALUES ($1, $2, $3)",
        [userIdFromToken, projectId, comment]
      );
      res.status(201).json({ message: "Successfully posted the comment." });
    } catch (error) {
      res
        .status(500)
        .json({ message: `Error posting the comment. ${error.message}` });
    }
  }
);
  // router.post ('/add-comment' , async (req,res) => { 
  //   const projectId = parseInt(req.query.projectId);
  //   // const projectId = parseInt(req.query.projectId);
  //   const userIdFromToken = 1 ; 
  //   const comment = req.body.comment;
  //   console.log(projectId, comment);
  //   if (!projectId || !comment) {
  //           return res
  //             .status(204)
  //             .json({ message: "No project ID or comment provided." });
  //         }

  //   try {
  //     await pool.query(
  //       "INSERT INTO comments(creator_id , project_id, comment) VALUES ($1, $2, $3)",
  //       [userIdFromToken, projectId, comment]
  //     );
  //     res.status(201).json({ message: "Successfully posted the comment." });
  //   } catch (error) {
  //     res
  //       .status(500)
  //       .json({ message: `Error posting the comment. ${error.message}` });
  //   }
  // }) ;


// DELETE THE COMMENT

router.delete(
  "/delete-comment",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const userIdFromToken = parseInt(req.user.id); // User ID from JWT payload
    const userIdFromQuery = parseInt(req.query.userId); // User ID from query parameters
    const commentId = req.query.commentId;
    if (!userIdFromQuery) {
      return res.status(400).json({ message: "No user ID provided." });
    }

    // Check if the user ID from the query matches the user ID from the token
    if (userIdFromToken !== userIdFromQuery) {
      return res
        .status(403)
        .json({
          message: "Forbidden: You do not have access to this resource",
        });
    }
    if (!commentId) {
      return res.status(400).json({ message: "No comment provided." });
    }
    try {
      await pool.query("DELETE FROM comments WHERE id = $1", [commentId]);
      res.status(200).json({ message: "Deleted successfully." });
    } catch (error) {
      res
        .status(500)
        .json({ message: `Error displaying  the comments. ${error.message}` });
    }
  }
);

// VIEW ALL THE COMMENTS 
router.get('/view-comment', async (req,res) => { 
    const projectId = req.query.projectId ; 
    
    
    try {
      
        const response = await pool.query('SELECT * FROM comments WHERE project_id = $1', [projectId]) ; 
        const result = response.rows; 
        if(response.rows.length === 0 ) { 
            return res.status(404).json({message : 'no comments yet'})
        }
        res.status(200).json(result) ; 


    } catch (error) {
      res
        .status(500)
        .json({ message: `Error displaying  the comments. ${error.message}` });
    } 
})

export default router;
