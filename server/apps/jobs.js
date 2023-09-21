import { Router } from "express";
import { pool } from "../utils/db_connection.js";
import { protect } from "../utils/protect.js";

const jobRouter = Router();
jobRouter.use(protect);

// get jobs by recruiter id for recruiter role
jobRouter.get("/recruiter", async (req, res) => {
  try {
    const recruiter_id = req.user.recruiter_id;
    const filter = req.query.filter || null;

    let query = `
    SELECT
    jobs.recruiter_id,
    jobs.job_id,
    company_name,
    company_logo,
    job_title,
    job_categories.job_category_id,
    category_name,
    job_types.job_type_id,
    type_name,
    salary_min,
    salary_max,
    about_job_position,
    mandatory_requirement,
    optional_requirement,
    opened_at,
    closed_at,
    (
      SELECT COUNT(application_id)
      FROM application
      WHERE application.job_id = jobs.job_id
    ) AS total_candidates,
    (
      SELECT COUNT(application_id)
      FROM application
      WHERE application.job_id = jobs.job_id
        AND application_status = 'inprogress'
    ) AS candidates_on_track
  FROM
    jobs
  INNER JOIN job_categories ON jobs.job_category_id = job_categories.job_category_id
  INNER JOIN job_types ON jobs.job_type_id = job_types.job_type_id
  INNER JOIN recruiter_informations ON jobs.recruiter_id = recruiter_informations.recruiter_id
  WHERE jobs.recruiter_id = $1
    `;
    const queryOrder = `ORDER BY closed_at DESC`

    const values = [recruiter_id];

    if (filter === "closed") {
      query += " AND closed_at IS NOT NULL ";
    } else if (filter === "ontrack") {
      query += ` AND EXISTS (
        SELECT 1
        FROM application
        WHERE application.job_id = jobs.job_id
          AND application_status = 'inprogress'
      )`;
    }
    

    query += queryOrder;
    
    const result = await pool.query(query, values);

    return res.json({
      data: result.rows,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

jobRouter.get("/recruiter/:job_id", async (req, res) => {
  const recruiter_id = req.user.recruiter_id;
  const job_id = req.params.job_id;

  const query = `SELECT
  jobs.recruiter_id,
  jobs.job_id,
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
  (
    SELECT COUNT(application_id)
    FROM application
    WHERE application.job_id = jobs.job_id
  ) AS total_candidates,
  (
    SELECT COUNT(application_id)
    FROM application
    WHERE application.job_id = jobs.job_id
      AND application_status = 'inprogress'
  ) AS candidates_on_track
FROM
  jobs
INNER JOIN job_categories ON jobs.job_category_id = job_categories.job_category_id
INNER JOIN job_types ON jobs.job_type_id = job_types.job_type_id
INNER JOIN recruiter_informations ON jobs.recruiter_id = recruiter_informations.recruiter_id
WHERE jobs.recruiter_id = $1 AND jobs.job_id = $2;
`;
  try {
    const result = await pool.query(query, [recruiter_id, job_id]);

    return res.json({
      data: result.rows,
    });
  } catch (error) {
    return res.json({
      message: `${error}`,
    });
  }
});

jobRouter.get("/", async (req, res) => {
  try {
    //comment 5 อันนี้เพื่อ query ใน postman
    const keywords = `%${req.query.keywords}%` || null;
    const category = `${req.query.category}` || null;
    const type = `${req.query.type}` || null;
    const min = `${req.query.minSalary}` || null;
    const max = `${req.query.maxSalary}` || null;

    // console.log(`category from server/apps/jobs : ${category}`);

    // uncomment 5 อันนี้เพื่อ query ใน postman
    // const type = req.query.type || null;
    // const keywords = req.query.keywords || null;
    // const category = req.query.category || null;
    // const min = req.query.minSalary || null;
    // const max = req.query.maxSalary || null;

    let query = "";
    let values = [];

    //queryเก่า ตาราง jobs_mock
    // query = `SELECT *
    // FROM jobs_mock
    // WHERE (job_title ILIKE $1 OR $1 IS NULL)
    // AND (job_category = $2 OR $2 IS NULL)
    // AND (job_type_id = $3 OR $3 IS NULL)
    // AND (salary_min >= $4 OR $4 IS NULL)
    // AND (salary_max <= $5 OR $5 IS NULL)
    // limit 20`;

    query = `SELECT *
    FROM jobs
    INNER JOIN job_categories ON jobs.job_category_id = job_categories.job_category_id
    INNER JOIN job_types ON jobs.job_type_id = job_types.job_type_id
    INNER JOIN recruiter_informations ON jobs.recruiter_id = recruiter_informations.recruiter_id
    WHERE (job_title ILIKE $1 OR company_name ILIKE $1 OR $1 IS NULL)
      AND (category_name = $2 OR $2 IS NULL)
      AND (type_name = $3 OR $3 IS NULL)
      AND (salary_min >= $4 OR $4 IS NULL)
      AND (salary_max <= $5 OR $5 IS NULL)`;
    values = [keywords, category, type, min, max];

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
    result = await pool.query(
      `select * from jobs
    INNER JOIN job_categories ON jobs.job_category_id = job_categories.job_category_id
    INNER JOIN job_types ON jobs.job_type_id = job_types.job_type_id
    INNER JOIN recruiter_informations ON jobs.recruiter_id = recruiter_informations.recruiter_id
    where job_id=$1`,
      [jobId]
    );
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

// jobRouter.put("/:job_id", async (req, res) => {
//   try {
//     // Validate request data (e.g., check if required fields are present)

//     const hasClosed = req.body.status === "closed";
//     const updatedJob = {
//       ...req.body,
//       updated_at: new Date(),
//       closed_at: hasClosed ? new Date() : null,
//     };
//     const job_id = req.params.job_id;

//     const categoryQuery = await pool.query(
//       "SELECT * FROM job_categories WHERE category_name = $1",
//       [updatedJob.category_name]
//     );
//     console.log("Category Query Result:", categoryQuery.rows);
//     if (categoryQuery.rows.length === 0) {
//       return res.status(410).json({ message: "Category not found" });
//     }

//     const typeQuery = await pool.query(
//       "SELECT * FROM job_types WHERE type_name = $1",
//       [updatedJob.type_name]
//     );
//     console.log("Type Query Result:", typeQuery.rows);
//     if (typeQuery.rows.length === 0) {
//       return res.status(411).json({ message: "Type not found" });
//     }

//     await pool.query(
//       "UPDATE jobs SET job_title = $1, job_category_id = $2, job_type_id = $3, salary_min = $4, salary_max = $5, about_job_position = $6, mandatory_requirement = $7, optional_requirement = $8, updated_at = $9, closed_at = $10 WHERE job_id = $11",
//       [
//         updatedJob.job_title,
//         parseInt(categoryQuery.rows[0].job_category_id, 10),
//         parseInt(typeQuery.rows[0].job_type_id, 10),
//         updatedJob.salary_min,
//         updatedJob.salary_max,
//         updatedJob.about_job_position,
//         updatedJob.mandatory_requirement,
//         updatedJob.optional_requirement,
//         updatedJob.updated_at,
//         updatedJob.closed_at,
//         job_id,
//       ]
//     );

//     return res.json({
//       message: `Job ${job_id} has been updated.`,
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(503).json({
//       message: "Error! Please try to update the job again.",
//     });
//   }
// });
jobRouter.put("/:job_id", async (req, res) => {
  try {
    // Validate request data (e.g., check if required fields are present)
    console.log(req.body);
    const hasClosed = req.body.closed_at === "closed";
    const updatedJob = {
      ...req.body,
      updated_at: new Date(),
      closed_at: hasClosed ? new Date() : null,
    };
    const job_id = req.params.job_id;
    console.log({ updatedJob: updatedJob });
    const excludedKeys = ["job_id", "company_name","company_logo","category_name","type_name","total_candidates","candidates_on_track"];

    // Generate the SQL query dynamically
    const query = Object.keys(updatedJob)
      .filter((key) => !excludedKeys.includes(key)) // Exclude keys in excludedKeys array
      .map((key, index) => `${key} = $${index + 1}`)
      .join(", ");
    console.log({query:query});
    const queryParams = Object.keys(updatedJob)
    .filter((key) => !excludedKeys.includes(key))
    .map((key) => updatedJob[key]);


    console.log(queryParams);
    await pool.query(
      `UPDATE jobs SET ${query} WHERE job_id = $${queryParams.length + 1}::integer`,
      [...queryParams, job_id]
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
