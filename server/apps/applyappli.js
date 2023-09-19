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

export default applyappliRouter;
//("/apply/xxxxxxxxx", applyappliRouter);
