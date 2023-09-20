import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { pool } from "../utils/db_connection.js";

const authRouter = Router();

authRouter.post("/user/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const client = await pool.connect();
    const result = await client.query(
      "SELECT * FROM usertable WHERE email = $1",
      [email]
    );
    const user = result.rows[0];

    if (!user) {
      return res.status(404).json({ message: "User is not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Password isvalid" });
    }

    const token = jwt.sign(
      {
        user_id: user.user_id,
        email: user.email,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "900000",
      }
    );

    return res.json({
      message: "user login succesfully",
      token,
    });
  } catch (error) {
    console.error("Error logging in", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

authRouter.post("/recruiter/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const client = await pool.connect();
    const result = await client.query(
      "SELECT * FROM recruiters WHERE email = $1",
      [email]
    );
    const recruiter = result.rows[0];

    if (!recruiter) {
      return res.status(404).json({ message: "user not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, recruiter.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "password not valid" });
    }

    const token = jwt.sign(
      {
        recruiter_id: recruiter.recruiter_id,
        email: recruiter.email,
      },
      process.env.SECRET_KEY
    );

    return res.json({
      message: "recruiter login succesfully",
      token,
    });
  } catch (error) {
    console.error("Error logging in", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default authRouter;
