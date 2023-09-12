import { Router } from "express";
import { pool } from "../utils/db_connection.js";
import bcrypt from "bcrypt";
import multer from "multer";

const registRouter = Router();
const multerUpload = multer({ dest: "../uploads/" });

// Routes for testing database connection
registRouter.get("/test/get_tabledata", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM testregist");
    return res.json({
      message: result.rows,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Error fetching data from the database",
    });
  }
});

registRouter.post("/test/post_tabledata", async (req, res) => {
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
      "INSERT INTO testregist (email, password, name, phone, url, title, experience) VALUES ($1, $2, $3, $4, $5, $6, $7)",
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
    console.error(err);
    return res.status(500).json({
      message: "Error! Please try registering again.",
    });
  }
});

// Routes for professional users
registRouter.get("/professional", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM UserTable");
    return res.json({
      message: result.rows,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Error fetching data from the database",
    });
  }
});

registRouter.post("/professional", async (req, res) => {
  console.log(req.body);
  try {
    const user = {
      email: req.body.email,
      password: req.body.password,
      name: req.body.name,
      phone: req.body.phone,
      birthdate: req.body.birthdate,
      linkedin: req.body.linkedin,
      title: req.body.title,
      jobexp: req.body.jobExp,
      education: req.body.education,
      havefile: req.body.havefile,
      confirmedpassword: req.body.confirmedPassword,
    };
    const salt = await bcrypt.genSalt(14);
    user.password = await bcrypt.hash(user.password, salt);

    await pool.query(
      "insert into UserTable (email,password,name,phone,birthdate,linkedin,title,jobExp,education,havefile,confirmedpassword) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)",
      [
        user.email,
        user.password,
        user.name,
        user.phone,
        user.birthdate,
        user.linkedin,
        user.title,
        user.jobexp,
        user.education,
        user.havefile,
        user.confirmedpassword,
      ]
    );

    return res.json({
      message: "Get that job account created! Welcome professional user!",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Error! Please try registering again.",
    });
  }
});

// Routes for recruiter users
registRouter.get("/recruiter", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM recruitertable");
    return res.json({
      message: result.rows,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Error fetching data from the database",
    });
  }
});

registRouter.post("/recruiter", async (req, res) => {
  try {
    const user = {
      companyemail: req.body.companyemail,
      companypassword: req.body.companypassword,
      companyname: req.body.companyname,
      companywebsite: req.body.companywebsite,
      aboutcompany: req.body.aboutcompany,
      havefile: req.body.havefile,
    };
    const salt = await bcrypt.genSalt(14);
    user.companypassword = await bcrypt.hash(user.companypassword, salt);

    await pool.query(
      "INSERT INTO recruitertable (companyemail, companypassword, companyname, companywebsite, aboutcompany, havefile) VALUES ($1, $2, $3, $4, $5, $6)",
      [
        user.companyemail,
        user.companypassword,
        user.companyname,
        user.companywebsite,
        user.aboutcompany,
        user.havefile,
      ]
    );

    return res.json({
      message: "Get that job account created! Welcome recruiter user!",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Error! Please try registering again.",
    });
  }
});

export default registRouter;
