import { Router } from "express";
import { pool } from "../utils/db_connection.js";
import { protect } from "../utils/protect.js";

const jobRouter = Router();
jobRouter.use(protect);

jobRouter.post("/", async (req, res) => {
  console.log("Request Body:", req.body);
  console.log("req: ", req.user.id);
  const hasClosed = req.body.status === "closed"
  try {
    const job = {
   
      recruiter_id: req.user.id,
      job_title: req.body.job_title,
      category: req.body.category, //use category replace category_name
      type: req.body.type, //use type replace type_name
      salary_min: req.body.salary_min,
      salary_max: req.body.salary_max,
      about_job_position: req.body.about_job_position,
      mandatory_requirement: req.body.mandatory_requirement,
      optional_requirement: req.body.optional_requirement,
      opened_at: new Date(),
      updated_at: new Date(),
      closed_at: hasClosed ? new Date() : null,
    };
    console.log("Category Name:", job.category);
    const categoryQuery = await pool.query(
      "SELECT * FROM job_categories WHERE category_name = $1",
      [job.category]
    );
    console.log("Category Query Result:", categoryQuery.rows);
    if (categoryQuery.rows.length === 0) {
      return res.status(410).json({ message: "Category not found" });
    }

    const typeQuery = await pool.query(
      "SELECT * FROM job_types WHERE type_name = $1",
      [job.type]
    );
    console.log("type Query Result:", typeQuery.rows);
    if (typeQuery.rows.length === 0) {
      return res.status(411).json({ message: "type not found" });
    }

    await pool.query(
      "insert into jobs (recruiter_id,job_title,job_category_id,job_type_id,salary_min,salary_max,about_job_position,mandatory_requirement,optional_requirement,closed_at) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)",
      [
        job.recruiter_id,
        job.job_title,
        parseInt(categoryQuery.rows[0].job_category_id, 10),
        parseInt(typeQuery.rows[0].job_type_id, 10),
        job.salary_min,
        job.salary_max,
        job.about_job_position,
        job.mandatory_requirement,
        job.optional_requirement,
        job.closed_at,
      ]
    );
    return res.json({
      message: "job account created!",
    });
  } catch (error) {
    console.log(error);
    return res.status(510).json({
      message: " error! please try create job again!",
    });
  }
});

export default jobRouter;
