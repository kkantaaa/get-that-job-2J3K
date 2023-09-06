import { Router } from "express";
import { pool } from "../utils/db_connection.js";
import bcrypt from "bcrypt";
// import { supabase } from "../utils/supabaseClient.js";

const registRouter = Router();

//test database connection
registRouter.get("/", async (req, res) => {
  const result = await pool.query("select * from clients");
  return res.json({
    message: result.rows,
  });
});
//test database connection

//registRouter.post("/users") - test insert data to database
//Postman - "Post" "localhost:4000/regist/users"
registRouter.post("/users", async (req, res) => {
  try {
    const user = {
      email: req.body.email,
      password: req.body.password,
      name: req.body.name,
      phone: req.body.phone,
      url: req.body.url,
      title: req.body.title,
      experience: req.body.experience,
    };
    const salt = await bcrypt.genSalt(14);
    user.password = await bcrypt.hash(user.password, salt);

    await pool.query(
      "insert into testregist (email,password,name,phone,url,title,experience) values ($1,$2,$3,$4,$5,$6,$7)",
      [
        user.email,
        user.password,
        user.name,
        user.phone,
        user.url,
        user.title,
        user.experience,
      ]
    );
    return res.json({
      message: "Get that job account created!",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: " error! please try register server again!",
    });
  }
});
//registRouter.post("/users") - test insert data to database

export default registRouter;
