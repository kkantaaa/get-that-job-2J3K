import { Router } from "express";
import { pool } from "../utils/db_connection.js";
import { protect } from "../utils/protect.js";

const jobRouter = Router();
jobRouter.use(protect);
//get jobs by recruiter id for recruiter role
jobRouter.get("/:recruiter_id", async (req, res) => {
  const recruiter_id = req.params.recruiter_id;

  if (!recruiter_id) {
    return res.status(401).json({
      message: "Please specified recruiter id in order to get the job",
    });
  }
  const query = `SELECT
  company_name,
  company_logo,
  job_title,
  category_name,
  type_name,
  salary_min,
  salary_max,
  about_job_position,
  mandatory_requirement,
  optional_requirement,
  opened_at,
  closed_at,
  COUNT(application.application_id) AS total_candidates,
  COUNT(
    CASE
      WHEN application.application_status = 'inprogress' THEN 1
      ELSE NULL
    END
  ) AS candidates_on_track
FROM
  jobs
INNER JOIN job_categories ON jobs.job_category_id = job_categories.job_category_id
INNER JOIN job_types ON jobs.job_type_id = job_types.job_type_id
INNER JOIN application ON jobs.job_id = application.job_id
INNER JOIN recruiter_informations ON jobs.recruiter_id = recruiter_informations.recruiter_id
WHERE
  jobs.recruiter_id = $1
GROUP BY
  company_name,
  company_logo,
  job_title,
  category_name,
  type_name,
  salary_min,
  salary_max,
  about_job_position,
  mandatory_requirement,
  optional_requirement,
  opened_at,
  closed_at;
`
  try {
    let result = await pool.query(query, [
      recruiter_id,
    ]);
    return res.json({
      data: result.rows
    });
    
  } catch (error) {
    return res.json({
      message: `${error}`,
    });
  }

  
});

jobRouter.get("/", async (req, res) => {
  try {
    const keywords = req.query.keywords || null;

    // const keywords = "%office%";
    console.log(`keywords from server/apps/jobs : ${keywords}`);
    const category = req.query.category || null;
    const type = req.query.type || null;
    // const minSalary = req.query.minSalary || null;
    const minSalary = 2000;
    // const maxSalary = req.query.maxSalary || null;
    const maxSalary = 4000;

    let query = "";
    let values = [];

    //ยัวไม่ได้เพิ่ม SEARCH BY COMPANY NAME -> link recruiter_id to company_name : join jobs table to recruiter_profile table
    //OR (recruiter_informations.company_name ILIKE $1 OR IS NULL)
    //ยังไม่ได้เลือกแสดงผลเฉพาะงานที่ status open
    query = `SELECT *
    FROM jobs_mock
    WHERE (job_title ILIKE $1 OR $1 IS NULL)
    AND (job_category = $2 OR $2 IS NULL)
    AND (job_type_id = $3 OR $3 IS NULL)
    AND (salary_min >= $4 OR $4 IS NULL)
    AND (salary_max <= $5 OR $5 IS NULL)
    limit 20`;
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

// jobRouter.get("/:id", async (req, res) => {
//   const jobId = req.params.id;

//   if (!jobId) {
//     return res.status(401).json({
//       message: "Please specified job id in order to get the job",
//     });
//   }

//   let result;

//   try {
//     result = await pool.query("select * from jobs_mock where job_id=$1", [
//       jobId,
//     ]);
//   } catch (error) {
//     return res.json({
//       message: `${error}`,
//     });
//   }

//   return res.json({
//     data: result?.rows?.[0] ?? [],
//   });
// });

jobRouter.post("/", async (req, res) => {
  console.log(req);
  const hasClosed = req.body.status === "closed";
  console.log(req);

  try {
    const job = {
      recruiter_id: req.user.id,
      job_title: req.body.jobTitle,
      category: req.body.jobCategory, //use category replace category_name
      type: req.body.jobType, //use type replace type_name
      salary_min: req.body.salaryRangeMin,
      salary_max: req.body.salaryRangeMax,
      about_job_position: req.body.aboutJobPosition,
      mandatory_requirement: req.body.mandatoryRequirement,
      optional_requirement: req.body.optionalRequirement,
      opened_at: new Date(),
      updated_at: new Date(),
      closed_at: hasClosed ? new Date() : null,
    };

    console.log(job);

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
