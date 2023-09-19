import { Router } from "express";
import { pool } from "../utils/db_connection.js";

const testapply = Router();

testapply.get("/:job_Id", async (req, res) => {
  try {
    const tryjoin = req.params.job_Id;

    const jobdata = await pool.query(
      "SELECT mock_appliacation_company.company_name, job_title, salary_min, salary_max, job_category ,job_type, is_following, date_time,avatar FROM jobs_mock inner join mock_appliacation_company on jobs_mock.company_id = mock_appliacation_company.company_id WHERE jobs_mock.company_id = $1",
      [tryjoin]
    );

    res.json(jobdata.rows);
    console.log(jobdata.rows);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

testapply.get("/logo/:logo_id", async (req, res) => {
  try {
    const trylogo = req.params.logo_id;

    const logodata = await pool.query(
      "SELECT company_logo FROM mock_appliacation_logo WHERE id = $1",
      [trylogo]
    );
    res.json(logodata.rows);
    console.log(logodata.rows);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

testapply.get("/:user_Id/job-list/:job_Id", async (req, res) => {
  try {
    const user_Id = req.params.user_Id;
    const job_Id = req.params.job_Id;

    const userdata = await pool.query(
      "SELECT user_appli_exp, user_appli_CV FROM Mock_Application_User WHERE user_appli_id = $1",
      [user_Id]
    );

    res.json(userdata.rows);
    console.log(userdata.rows);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

testapply.post("/:user_Id/job-list/:job_Id", async (req, res) => {
  try {
    const job_Id = req.params.job_Id;

    console.log(req.body);

    const { currentCV, interestedReason, professionalExperience } = req.body;
    console.log("job_Id:", job_Id);
    console.log("professionalExperience:", professionalExperience);
    console.log("currentCV:", currentCV);
    console.log("interestedReason:", interestedReason);
    const userdata = await pool.query(
      "INSERT INTO test_send_applicatio (job_id, professional_experience, cv, interested_reason) " +
        "VALUES ($1, $2, $3, $4) " +
        "ON CONFLICT (job_id) DO UPDATE SET " +
        "professional_experience = $2, " +
        "cv = $3, " +
        "interested_reason = $4 " +
        "RETURNING *",
      [job_Id, professionalExperience, currentCV, interestedReason]
    );

    console.log("Application submitted successfully");
    res.json(userdata.rows[0]);
  } catch (error) {
    console.error("Error submitting application:", error);
    res
      .status(500)
      .json({ error: "An error occurred while submitting the application." });
  }
});

testapply.get("/recruiter/:job_id", async (req, res) => {
  try {
    const job_id = req.params.job_id;
    const status = `${req.query.status}` || null; //status query
    const result = await pool.query(
      `SELECT
      application.job_id,
      application.application_id,
      application.user_id,
      user_name,
      user_linkedin,
      email,
      user_phone,
      sent_date,
      application_status,
      exp_in_application,
      interested_reason,
      cv_in_application
    FROM
      application
    INNER JOIN users ON application.user_id = users.user_id
    INNER JOIN user_profiles ON application.user_id = user_profiles.user_id
    WHERE
      (application.job_id = $1)
    AND (application_status = $2 OR $2 is NULL)
    `,
      [job_id,status]
    );

    return res.json(result.rows);
    
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default testapply;
