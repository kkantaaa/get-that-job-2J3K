import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// import { db } from "../utils/db.js";

const authRouter = Router();

authRouter.post("/login", async (req, res) => {

  const user = await db.collection("users").findOne({
    username: req.body.username,
  });

  if (!user) {
    return res.status(404).json({
      message: "user not found",
    });
  }

  const isValidPassword = await bcrypt.compare(
    req.body.password,
    user.password
  );

  if (!isValidPassword) {
    return res.status(400).json({
      message: "password not valid",
    });
  }

  const token = jwt.sign(
    { id: user._id, firstName: user.firstName, lastName: user.lastName },
    process.env.SECRET_KEY,
    {
      expiresIn: "900000",
    }
  );

  return res.json({
    message: "login succesfully",
    token,
  });
});

export default authRouter;
