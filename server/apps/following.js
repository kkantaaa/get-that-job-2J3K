import { Router } from "express";
import { pool } from "../utils/db_connection.js";

const followingRouter = Router();

followingRouter.get("/job", async (req, res) => {
  try {
    const userid = `${req.query.userId}`;
    // const userid = 26;
    if (!userid) {
      return res.status(401).json({
        message: "no userId please login",
      });
    }
    // console.log(`user id is ${userid}`);

    let query = "";
    let values = [];

    query = `SELECT *
        FROM job_follows
        INNER JOIN jobs ON job_follows.job_id = jobs.job_id
        INNER JOIN recruiter_informations ON jobs.recruiter_id = recruiter_informations.recruiter_id
        INNER JOIN job_categories ON jobs.job_category_id = job_categories.job_category_id
        INNER JOIN job_types ON jobs.job_type_id = job_types.job_type_id
        WHERE user_id = $1`;
    values = [userid];

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

followingRouter.get("/companyinfo", async (req, res) => {
  try {
    const userid = `${req.query.userId}` || null;
    // const userid = 26;
    if (!userid) {
      return res.status(401).json({
        message: "no userId please login",
      });
    }
    // console.log(`user id is ${userid}`);

    let query = "";
    let values = [];

    query = `SELECT *
            FROM company_follows
            INNER JOIN recruiter_informations ON company_follows.recruiter_id = recruiter_informations.recruiter_id
            WHERE user_id = $1
            ORDER BY following_id ASC`;
    values = [userid];

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

followingRouter.get("/company", async (req, res) => {
  try {
    const userid = `${req.query.userId}`;
    // const userid = 26;
    const recruiterid = `${req.query.recruiterId}`;
    // const recruiterid = 83;
    if (!userid) {
      return res.status(401).json({
        message: "no userId please login",
      });
    }
    // console.log(`user id is ${userid}`);

    let query = "";
    let values = [];

    query = `SELECT *
          FROM company_follows
          INNER JOIN recruiter_informations ON company_follows.recruiter_id = recruiter_informations.recruiter_id
          INNER JOIN jobs ON company_follows.recruiter_id = jobs.recruiter_id
          WHERE (user_id = $1)
       AND (recruiter_informations.recruiter_id = $2)`;

    values = [userid, recruiterid];
    // values = [userid];

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

export default followingRouter;
