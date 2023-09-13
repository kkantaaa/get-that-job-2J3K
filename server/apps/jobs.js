import { Router } from "express";
import { pool } from "../utils/db_connection.js";
import { protect } from "../utils/protect.js";

const jobRouter = Router();
// jobRouter.use(protect);

jobRouter.get("/", async (req, res) => {
  try {
    const keywords = req.query.keywords || null;
    // const keywords = "%Dev%";
    const category = req.query.category || null;
    const type = req.query.type || null;
    const minSalary = req.query.minSalary || null;
    // const minSalary = 2000;
    const maxSalary = req.query.maxSalary || null;
    // const maxSalary = 4000;

    let query = "";
    let values = [];

    //ยัวไม่ได้เพิ่ม SEARCH BY COMPANY NAME -> link recruiter_id to company_name : join jobs table to recruiter_profile table
    //ยังไม่ได้เลือกแสดงผลเฉพาะงานที่ status open
    query = `SELECT *
    FROM jobs_mock
    WHERE (job_title ILIKE $1 OR $1 IS NULL)
    AND (job_category = $2 OR $2 IS NULL)
    AND (job_type_id = $3 OR $3 IS NULL)
    AND (salary_min >= $4 OR $4 IS NULL)
    AND (salary_max <= $5 OR $5 IS NULL)
    limit 12`;
    values = [keywords, category, type, minSalary, maxSalary];

    // query = `SELECT * FROM jobs_mock WHERE job_title ILIKE $1 AND salary_min >= $2`;
    // values = [keywords, minSalary];

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
    result = await pool.query("select * from jobs_mock where job_id=$1", [
      jobId,
    ]);
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
  const hasClosed = req.body.status === "closed";
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

jobRouter.put("/:job_id", async (req, res) => {
  try {
    // Validate request data (e.g., check if required fields are present)

    const hasClosed = req.body.status === "closed";
    const updatedJob = {
      ...req.body,
      updated_at: new Date(),
      closed_at: hasClosed ? new Date() : null,
    };
    const job_id = req.params.job_id;

    const categoryQuery = await pool.query(
      "SELECT * FROM job_categories WHERE category_name = $1",
      [updatedJob.category]
    );
    console.log("Category Query Result:", categoryQuery.rows);
    if (categoryQuery.rows.length === 0) {
      return res.status(410).json({ message: "Category not found" });
    }

    const typeQuery = await pool.query(
      "SELECT * FROM job_types WHERE type_name = $1",
      [updatedJob.type]
    );
    console.log("Type Query Result:", typeQuery.rows);
    if (typeQuery.rows.length === 0) {
      return res.status(411).json({ message: "Type not found" });
    }

    await pool.query(
      "UPDATE jobs SET job_title = $1, job_category_id = $2, job_type_id = $3, salary_min = $4, salary_max = $5, about_job_position = $6, mandatory_requirement = $7, optional_requirement = $8, updated_at = $9, closed_at = $10 WHERE job_id = $11",
      [
        updatedJob.job_title,
        parseInt(categoryQuery.rows[0].job_category_id, 10),
        parseInt(typeQuery.rows[0].job_type_id, 10),
        updatedJob.salary_min,
        updatedJob.salary_max,
        updatedJob.about_job_position,
        updatedJob.mandatory_requirement,
        updatedJob.optional_requirement,
        updatedJob.updated_at,
        updatedJob.closed_at,
        job_id,
      ]
    );

    return res.json({
      message: `Job ${job_id} has been updated.`,
    });
  } catch (error) {
    console.error(error);
    return res.status(503).json({
      message: "Error! Please try to update the job again.",
    });
  }
});

export default jobRouter;
