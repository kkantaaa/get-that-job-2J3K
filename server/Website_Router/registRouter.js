import { Router } from "express";
import { pool } from "../utils/db_connection.js";
import bcrypt from "bcrypt";
import multer from "multer";

const registRouter = Router();
const multerUpload = multer({ dest: "../uploads/" });

// Test database connection
registRouter.get("/test/get_tabledata", async (req, res) => {
  try {
    const result = await pool.query("select * from testregist");
    return res.json({ message: result.rows });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Error fetching data from the database" });
  }
});

// Test insert data to the database
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
    return res.status(500).json({ message: "Error creating the account" });
  }
});

// Insert data to the UserTable for professional users
registRouter.post("/professional", async (req, res) => {
  try {
    const user = {
      email: req.body.email,
      password: req.body.password,
      name: req.body.name,
      phone: req.body.phone,
      birthdate: req.body.birthdate,
      linkedin: req.body.linkedin,
      title: req.body.title,
      jobexp: req.body.jobexp,
      education: req.body.education,
      havefile: req.body.havefile,
      confirmedpassword: req.body.confirmedpassword,
    };

    const salt = await bcrypt.genSalt(14);
    user.password = await bcrypt.hash(user.password, salt);

    await pool.query(
      "insert into UserTable (email,password,name,phone,birthdate,linkedin,title,jobExp,education,havefile,confirmedpassword) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)",

      "insert into UserTable (email,password,name,phone,birthdate,linkedin,title,jobexp,education,havefile) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)",

      "insert into UserTable (email,password,name,phone,birthdate,linkedin,title,jobExp,education,havefile,confirmedpassword) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)",

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
    return res.status(500).json({ message: "Error creating the account" });
  }
});

// Insert data to the recruitertable for recruiter users
registRouter.post("/recruiter", async (req, res) => {
  try {
    const user = {
      email: req.body.email,
      password: req.body.password,
      company_name: req.body.company_name,
      company_website: req.body.company_website,
      about_company: req.body.about_company,
      company_logo: req.body.company_logo,
    };

    const salt = await bcrypt.genSalt(14);
    user.password = await bcrypt.hash(user.password, salt);
    
    await pool.query(
      "INSERT INTO recruiters (email, password ) VALUES ($1, $2)",
      [user.email, user.password]
    );
    
    const recruiterQuery = await pool.query(
      "SELECT * FROM recruiters WHERE email = $1",
      [user.email]
    );
    console.log("Recruiter Query Result:", recruiterQuery.rows);
    if (recruiterQuery.rows.length === 0) {
      return res.status(410).json({ message: "Recruiter Email not found" });
    }
    await pool.query(
      "INSERT INTO recruiter_informations (recruiter_id, company_name, company_website, about_company, company_logo) VALUES ($1, $2, $3, $4, $5)",
      [
        parseInt(recruiterQuery.rows[0].recruiter_id, 10),
        user.company_name,
        user.company_website,
        user.about_company,
        user.company_logo,
      ]
    );

    return res.json({
      message: "Get that job account created! Welcome recruiter user!",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error creating the account" });
  }
});



export default registRouter;
