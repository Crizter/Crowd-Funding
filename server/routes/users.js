import express from "express";
import { pool } from "../database/db.js";
import passport from "passport";

const router = express.Router();

router.get(
  "/data",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
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

    try {
      const response = await pool.query("SELECT * FROM users WHERE id = $1", [
        userIdFromQuery,
      ]);
      if (response.rows.length === 0) {
        return res.status(400).json({ message: "No user found." });
      }
      res.status(200).json(response.rows[0]);
    } catch (error) {
      res
        .status(500)
        .json({ message: `Error fetching user information. ${error.message}` });
    }
  }
);

router.post(
    "/editData",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
      const userIdFromQuery = parseInt(req.query.userId);
      const userIdFromToken = parseInt(req.user.id);
      const { name, email } = req.body;
  
      if (!userIdFromQuery) {
        return res.status(400).json({ message: "No user id passed" });
      }
      if (userIdFromQuery !== userIdFromToken) {
        return res.status(403).json({
          message: "Forbidden: You do not have access to this resource",
        });
      }
  
      try {
        if (name) {
          await pool.query("UPDATE users SET name = $1 WHERE id = $2", [
            name,
            userIdFromQuery,
          ]);
        }
  
        if (email) {
          // Check if the email is already in use by another user
          const { rows } = await pool.query(
            "SELECT id FROM users WHERE email = $1",
            [email]
          );
          // If the email is found and the ID does not match the current user, it means it's already taken
          if (rows.length === 0 ) {
             // Update the email if no duplicate found
          await pool.query("UPDATE users SET email = $1 WHERE id = $2", [
            email,
            userIdFromQuery,
          ]);
          } 
        }
        return res.status(200).json({ message: "User data updated successfully" });
      } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: "Internal server error" });
      }
    }
  );
  

export default router ; 

