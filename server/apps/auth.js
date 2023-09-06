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
      "SELECT * FROM [table_name_user] WHERE [column_name_email] = $1",
      [
        // รอเปลี่ยนชื่อ column email , user
        email,
      ]
    );
    const user = result.rows[0];

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password); //รอเปลี่ยนชื่อ column ของ user

    if (!isPasswordValid) {
      return res.status(400).json({ message: "password not valid" });
    }

    const token = jwt.sign(
      {
        id: user._id, //รอเปลี่ยนชื่อ column ของ user
        email: user.email, //รอเปลี่ยนชื่อ column ของ user
        firstName: user.firstName, //รอเปลี่ยนชื่อ column ของ user
        lastName: user.lastName, //รอเปลี่ยนชื่อ column ของ user
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
      "SELECT * FROM recruiter WHERE email = $1",
      [
        // รอเปลี่ยนชื่อ column email , recruiter
        email,
      ]
    );
    const user = result.rows[0];

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, recruiter.password); //รอเปลี่ยนชื่อ column ของ recruiter

    if (!isPasswordValid) {
      return res.status(400).json({ message: "password not valid" });
    }

    const token = jwt.sign(
      {
        id: user._id, //รอเปลี่ยนชื่อ column ของ recruiter
        email: user.email, //รอเปลี่ยนชื่อ column ของ recruiter
        firstName: user.firstName, //รอเปลี่ยนชื่อ column ของ recruiter
        lastName: user.lastName, //รอเปลี่ยนชื่อ column ของ recruiter
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "900000",
      }
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
