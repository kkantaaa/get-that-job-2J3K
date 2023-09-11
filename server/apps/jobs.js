import { Router } from "express";
import { pool } from "../utils/db_connection.js";

const jobRouter = Router();

jobRouter.get("/", async (req, res) => {
  try {
    const keywords = req.query.keywords || null;
    const category = req.query.category || null;
    const type = req.query.type || null;
    const max_salary = req.query.max_salary || null;
    const min_salary = req.query.min_salary || null;

    let query = "";
    let values = [];

    if (keywords && category && type) {
      query = `SELECT *
    FROM jobs
    WHERE (job_title ilike $1 or job_title IS NULL) AND
          (recruiter_profile.companyname ilike $1 or recruiter_profile.companyname IS NULL) AND
          (category = $2 OR $2 IS NULL) AND
          (type = $3 OR $3 IS NULL) AND
          (salary_max <= $4 AND salary_min >= $5 OR $4 IS NULL OR $5 IS NULL)`;
      values = [keywords, category, type, max_salary, min_salary];
    }

    // if (keywords) {
    //   query = `select * from jobs
    // where title ilike $1
    // or recruiter.companyname ilike $1`;
    //   values = [keywords];
    // }
    else {
      query = `select * from posts`;
    }

    const results = await pool.query(query, values);

    return res.json({
      data: results.rows,
    });
  } catch (error) {
    return res.json({
      message: `${error}`,
    });
  }
});

jobRouter.get("/:id", async (req, res) => {
  const jobId = req.params.id;

  if (!jobId) {
    return res.status(401).json({
      message: "Please specified job id in order to get the job",
    });
  }

  let result;

  try {
    result = await pool.query("select * from jobs where job_id=$1", [jobId]);
  } catch (error) {
    return res.json({
      message: `${error}`,
    });
  }

  return res.json({
    data: result?.rows?.[0] ?? [],
  });
});

jobRouter.post("/", async (req, res) => {
  try {
    const job = {
      job_title: req.body.job_title,
      category: req.body.category_name,
      //type
      salary_min: req.body.salary_min,
      salary_max: req.body.salary_max,
      about_job_position: req.body.about_job_position,
      mandatory_requirement: req.body.mandatory_requirement,
      optional_requirement: req.body.optional_requirement,
    };
    const categoryQuery = await pool.query(
      "SELECT * FROM job_categories WHERE category_name = $1",
      [job.category_name]
    );

    if (categoryQuery.rows.length === 0) {
      return res.status(404).json({ message: "Category not found" });
    }

    await pool.query(
      "insert into jobs (job_title,job_category_id,salary_min,salary_max,about_job_position,mandatory_requirement,optional_requirement) values ($1,$2,$3,$4,$5,$6,$7)",
      [
        job.job_title,
        categoryQuery.rows[0].job_category_id,
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
