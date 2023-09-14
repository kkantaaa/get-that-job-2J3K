import { Router } from "express";
import { pool } from "../utils/db_connection.js";

const testapply   = Router();

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

        










export default testapply;