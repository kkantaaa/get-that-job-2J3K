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
// Insert data to the UserTable for professional users
// registRouter.post("/professional", async (req, res) => {

//   try {
//     const user = {
//       email: req.body.email,
//       password: req.body.password,
//       user_name: req.body.name,
//       user_phone: req.body.phone,
//       user_birthdate: req.body.birthdate,
//       user_linkedin: req.body.linkedin,
//       user_title: req.body.title,
//       user_experience: req.body.jobexp,
//       user_education: req.body.education,
//       user_cv: req.body.user_cv,
//     };

//     const salt = await bcrypt.genSalt(14);
//     user.password = await bcrypt.hash(user.password, salt);

//     await pool.query(
//       "INSERT INTO users (email, password ) VALUES ($1, $2)",
//       [user.email, user.password]
//     );

//     const userQuery = await pool.query(
//       "SELECT * FROM users WHERE email = $1",
//       [user.email]
//     );
//     console.log("User Query Result:", userQuery.rows);
//     if (userQuery.rows.length === 0) {
//       return res.status(410).json({ message: "user Email not found" });
//     }
//     await pool.query(
//       "INSERT INTO user_profiles (user_id, user_name, user_phone, user_birthdate, user_linkedin, user_title, user_experience, user_education, user_cv) VALUES ($1, $2, $3, $4, $5,$6,$7,$8,$9)",
//       [
//         parseInt(userQuery.rows[0].user_id, 10),
//         user.user_name,
//         user.user_phone,
//         user.user_birthdate,
//         user.user_linkedin,
//         user.user_title,
//         user.user_experience,
//         user.user_education,
//         user.user_cv
//       ]
//     );

//     return res.json({
//       message: "Get that job account created! Welcome Professional user!",
//     });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ message: "Error creating the account" });
//   }
// });

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
    let validationfounderror = await validationforprofressional(user);
    if (validationfounderror) {
      return res
        .status(410)
        .json({ message: "Email address is already registered" });
    }

    const salt = await bcrypt.genSalt(14);
    user.password = await bcrypt.hash(user.password, salt);

    await pool.query(
      "insert into usertable (email,password,name,phone,birthdate,linkedin,title,jobExp,education,havefile,confirmedpassword) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)",

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
//double table => recruiters + recruiter_information
registRouter.post("/recruiter", async (req, res) => {
  console.log(req.body);
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
      return res.status(410).json({ message: "Recruiter email not found" });
    } else if (recruiterQuery.rows.length > 1) {
      return res
        .status(410)
        .json({ message: "Email address is already registered" });
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

// single table => recruitertable
// registRouter.post("/recruiter", async (req, res) => {
//   try {
//     const user = {
//       companyemail: req.body.companyemail,
//       companypassword: req.body.companypassword,
//       companyname: req.body.companyname,
//       companywebsite: req.body.companywebsite,
//       aboutcompany: req.body.aboutcompany,
//       havefile: req.body.havefile,
//     };

//     const salt = await bcrypt.genSalt(14);
//     user.companypassword = await bcrypt.hash(user.companypassword, salt);

//     await pool.query(
//       "INSERT INTO recruitertable (companyemail, companypassword, companyname, companywebsite, aboutcompany, havefile) VALUES ($1, $2, $3, $4, $5, $6)",
//       [
//         user.companyemail,
//         user.companypassword,
//         user.companyname,
//         user.companywebsite,
//         user.aboutcompany,
//         user.havefile,
//       ]
//     );

//     return res.json({
//       message: "Get that job account created! Welcome recruiter user!",
//     });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ message: "Error creating the account" });
//   }
// });
async function validationforprofressional(body) {
  const isemailtaken = await pool.query(
    "select email from usertable where email = $1",
    [body.email]
  );
  if (isemailtaken.rows[0]) {
    return res
      .status(410)
      .json({ message: "Email address is already registered" });
  }
}
export default registRouter;
//http://localhost:5173/regist/xxxxxxxx
