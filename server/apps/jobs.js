import { Router } from "express";
import { pool } from "../utils/db_connection.js";

const jobRouter = Router();

jobRouter.post("/", async (req, res) => {
    console.log("Request Body:", req.body);
    

  try {
    const job = {
      job_title: req.body.job_title,
      category: req.body.category, //use category replace category_name
      //type
      salary_min: req.body.salary_min,
      salary_max: req.body.salary_max,
      about_job_position: req.body.about_job_position,
      mandatory_requirement: req.body.mandatory_requirement,
      optional_requirement: req.body.optional_requirement,
    };
    console.log("Category Name:", job.category);
    const categoryQuery = await pool.query(
      "SELECT * FROM job_categories WHERE category_name = $1",
      [job.category]
    );
    console.log("Category Query Result:", categoryQuery.rows);
    if (categoryQuery.rows.length === 0) {
      return res.status(404).json({ message: "Category not found" });
    }

    await pool.query(
      "insert into jobs (job_title,job_category_id,salary_min,salary_max,about_job_position,mandatory_requirement,optional_requirement) values ($1,$2,$3,$4,$5,$6,$7)",
      [
        job.job_title,
        parseInt(categoryQuery.rows[0].job_category_id, 10),
        job.salary_min,
        job.salary_max,
        job.about_job_position,
        job.mandatory_requirement,
        job.optional_requirement,
      ]
    );
    return res.json({
      message: "job account created!",
    });
  } catch (error) {
    console.log(error);
    return res.status(503).json({
      message: " error! please try create job again!",
    });
  }
});

export default jobRouter;
