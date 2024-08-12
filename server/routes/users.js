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

export default router ; 

