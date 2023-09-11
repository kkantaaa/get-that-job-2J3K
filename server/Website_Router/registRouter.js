import { Router } from "express";
import { pool } from "../utils/db_connection.js";
import bcrypt from "bcrypt";
import { supabase } from "../utils/supabaseClient.js";
import multer from "multer";

const registRouter = Router();
const multerUpload = multer({ dest: "../uploads/" });
const avatarUpload = multerUpload.fields([{ name: "avatar", maxCount: 3 }]);

//test database connection
registRouter.get("/test/get_tabledata", async (req, res) => {
  console.log("check table");
  const result = await pool.query("select * from testregist");
  return res.json({
    message: result.rows,
  });
});
//test database connection

//registRouter.post("/test/post_tabledata") - test insert data to database
//Postman - "Post" "localhost:4000/regist/test/post_tabledata"
registRouter.post("/test/post_tabledata", async (req, res) => {
  console.log("check table");
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
//registRouter.post("/test/post_tabledata") - test insert data to database

//registRouter.post("/professional") - insert data to database // usertype = professional
registRouter.get("/professional", async (req, res) => {
  const result = await pool.query("select * from UserTable");
  return res.json({
    message: result.rows,
  });
});
//Postman - "Post" "localhost:4000/regist/professional"
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
      jobexp: req.body.jobexp,
      education: req.body.education,
      havefile: req.body.havefile,
      confirmedpassword: req.body.confirmedpassword,
    };
    const salt = await bcrypt.genSalt(14);
    user.password = await bcrypt.hash(user.password, salt);

    await pool.query(
<<<<<<< HEAD
<<<<<<< HEAD
      "insert into UserTable (email,password,name,phone,birthdate,linkedin,title,jobexp,education,havefile) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)",
=======
      "insert into UserTable (email,password,name,phone,birthdate,linkedin,title,jobExp,education,havefile,confirmedpassword) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)",
>>>>>>> 7ee33a7 (commit changes)
=======
      "insert into UserTable (email,password,name,phone,birthdate,linkedin,title,jobExp,education,havefile,confirmedpassword) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)",
>>>>>>> 35f86b0 (commit changes)

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
    console.log(user);
    return res.json({
      message: "Get that job account created!,  welcome professional user!",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: err ,
    });
  }
});
//registRouter.post("/user/professional") - insert data to database // usertype = professional

//registRouter.post("/recruiter") - insert data to database // usertype = recruiter
registRouter.get("/recruiter", async (req, res) => {
  const result = await pool.query("select * from recruitertable");
  return res.json({
    message: result.rows,
  });
});
//Postman - "Post" "localhost:4000/regist/recruiter"
registRouter.post("/recruiter", async (req, res) => {
  console.log("check table");
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
      "insert into recruitertable (companyemail,companypassword,companyname,companywebsite,aboutcompany,havefile) values ($1,$2,$3,$4,$5,$6)",
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
      message: "Get that job account created!,  welcome recruiter user!",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: err ,
    });
  }
});
//registRouter.post("/recruiter") - insert data to database // usertype = recruiter

export default registRouter;
