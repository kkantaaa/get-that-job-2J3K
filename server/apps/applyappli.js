import { Router } from "express";
import { pool } from "../utils/db_connection.js";

const applyappliRouter = Router();

applyappliRouter.post("/:user_Id/job-list/:job_Id", async (req, res) => {
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

applyappliRouter.get("/:job_id", async (req, res) => {
  const job_id = req.params.job_id;
  try {
    const userdata = await pool.query(
      "SELECT * FROM jobs INNER JOIN recruiter_informations on jobs.recruiter_id = recruiter_informations.recruiter_id WHERE job_id = $1",
      [job_id]
    );
    res.json(userdata.rows[0]);
  } catch (error) {
    console.error("Error submitting application:", error);
    res
      .status(500)
      .json({ error: "An error occurred while submitting the application." });
  }
});

applyappliRouter.get("/u/:user_id", async (req, res) => {
  const user_id = req.params.user_id;
  console.log("user_id:", user_id);
  try {
    const userdata = await pool.query("SELECT * FROM kan  WHERE user_id = $1", [
      user_id,
    ]);
    console.log("Application submitted successfully :", userdata.rows[0]);
    res.json(userdata.rows[0]);
  } catch (error) {
    console.error("Error submitting application:", error);
    res
      .status(500)
      .json({ error: "An error occurred while submitting the application." });
  }
});

//recruiter ใช้
applyappliRouter.get("/recruiter/:job_id", async (req, res) => {
  try {
    const job_id = req.params.job_id;
    const status = req.query.status || null; // status query

    let query = `
      SELECT
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
        application.job_id = $1
    `;

    const queryParams = [job_id];

    if (status !== null) {
      query += " AND application_status = $2";
      queryParams.push(status);
    }

    const result = await pool.query(query, queryParams);

    return res.json(result.rows);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

applyappliRouter.put("/recruiter/:application_id", async (req, res) => {
  try {
    const application_id = req.params.application_id;
    const updateApplication = {
      application_status: req.body.application_status,
    };

    await pool.query(
      "UPDATE application SET application_status = $1 WHERE application_id = $2",
      [updateApplication.application_status, application_id]
    );

    return res.json({
      message: `Status of Application ${application_id} has been updated`,
    });
  } catch (error) {
    console.error("Error updating application status:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default applyappliRouter;
//("/apply/xxxxxxxxx", applyappliRouter);
