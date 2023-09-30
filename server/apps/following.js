import { Router } from "express";
import { pool } from "../utils/db_connection.js";
import { protect } from "../utils/protect.js";

const followingRouter = Router();
followingRouter.use(protect);

followingRouter.get("/job", async (req, res) => {
  try {
    // const userid = `${req.query.userId}`;
    // const userid = 26;
    const userid = req.user.user_id;
    // console.log(`this is userid from token : ${userid}`);
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

followingRouter.get("/companyinfo", async (req, res) => {
  try {
    // const userid = `${req.query.userId}`
    // const userid = 26;
    const userid = req.user.user_id;
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

followingRouter.get("/companycount", async (req, res) => {
  try {
    const userid = req.user.user_id;
    // const userid = `${req.query.userId}`;
    // const userid = 26;
    // const recruiterid = `${req.query.recruiterId}`;
    // const recruiterid = 83;
    if (!userid) {
      return res.status(401).json({
        message: "no userId please login",
      });
    }
    // console.log(`user id is ${userid}`);

    let query = "";
    let values = [];

    // query = `SELECT *
    // FROM company_follows
    // INNER JOIN jobs ON company_follows.recruiter_id = jobs.recruiter_id
    // WHERE (user_id = $1)`;

    query = `SELECT company_follows.user_id, company_follows.recruiter_id, COUNT(jobs.job_id) AS job_count
    FROM company_follows
    INNER JOIN jobs ON company_follows.recruiter_id = jobs.recruiter_id
    WHERE (user_id = $1)
    GROUP BY company_follows.recruiter_id, company_follows.user_id`;

    // values = [userid, recruiterid];
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

followingRouter.get("/companyjob/:id", async (req, res) => {
  const recruiterId = req.params.id;
  // const recruiterId = 83;
  // console.log(`recruiter id : ${recruiterId}`);

  if (!recruiterId) {
    return res.status(401).json({
      message: "Please specified recruiterId in order to get the companyjob",
    });
  }

  let results;

  try {
    results = await pool.query(
      `SELECT *
      FROM jobs
      INNER JOIN recruiter_informations ON jobs.recruiter_id = recruiter_informations.recruiter_id
      INNER JOIN job_categories ON jobs.job_category_id = job_categories.job_category_id
      INNER JOIN job_types ON jobs.job_type_id = job_types.job_type_id
      WHERE jobs.recruiter_id = $1`,
      [recruiterId]
    );
  } catch (error) {
    return res.json({
      message: `${error}`,
    });
  }

  return res.json({
    data: results.rows,
  });

  // try {
  //   // console.log(`user id is ${userid}`);

  //   let query = "";
  //   let values = [];

  //   query = `SELECT *
  //           FROM jobs
  //           INNER JOIN recruiter_informations ON jobs.recruiter_id = recruiter_informations.recruiter_id
  //           WHERE jobs.recruiter_id = $1`;
  //   values = [recruiterId];

  //   const results = await pool.query(query, values);

  //   return res.json({
  //     data: results.rows,
  //   });
  // } catch (error) {
  //   return res.json({
  //     message: `${error}`,
  //   });
  // }
});

followingRouter.post("/followjob", async (req, res) => {
  const userid = req.user.user_id;
  const jobid = `${req.body.jobId}`;
  console.log(`user id is ${userid}`);
  console.log(`job id is ${jobid}`);
  try {
    // const result = await pool.query(
    //   `SELECT * FROM job_follows WHERE (user_id = $1) AND (job_id = $2)`,
    //   [userid, jobid]
    // );
    // if (result) {
    //   return res.status(401).json({
    //     message: "job already following",
    //   });
    // }
    if (!userid) {
      return res.status(401).json({
        message: "no user id please login",
      });
    }
    if (!jobid) {
      return res.status(401).json({
        message: "no job id please try again",
      });
    }

    await pool.query(
      `insert into job_follows (user_id, job_id)
      values ($1, $2)`,
      [userid, jobid]
    );

    return res.json({
      message: "job has been following.",
    });
  } catch (error) {
    return res.json({
      message: `${error}`,
    });
  }
});

followingRouter.post("/unfollowjob", async (req, res) => {
  try {
    const userid = req.user.user_id;
    const jobid = `${req.body.jobId}`;
    console.log(`user id is ${userid}`);
    console.log(`job id is ${jobid}`);

    if (!userid) {
      return res.status(401).json({
        message: "no user id please login",
      });
    }
    if (!jobid) {
      return res.status(401).json({
        message: "no job id please try again",
      });
    }
    // const result = await pool.query(
    //   `SELECT * FROM job_follows WHERE (user_id = $1) AND (job_id = $2)`,
    //   [userid, jobid]
    // );
    // if (!result) {
    //   return res.status(401).json({
    //     message: "job already not following",
    //   });
    // }
    // console.log(result);

    await pool.query(
      `DELETE FROM job_follows
      WHERE (user_id = $1)
      AND (job_id = $2)`,
      [userid, jobid]
    );

    return res.json({
      message: "job following has been deleted.",
    });
  } catch (error) {
    return res.json({
      message: `${error}`,
    });
  }
});

followingRouter.post("/followcompany", async (req, res) => {
  const userid = req.user.user_id;
  const recruiterid = `${req.body.recruiterId}`;
  console.log(`user id is ${userid}`);
  console.log(`recruiter id is ${recruiterid}`);
  try {
    if (!userid) {
      return res.status(401).json({
        message: "user id not found, please login",
      });
    }

    if (!recruiterid) {
      return res.status(401).json({
        message: "recruiter id not found, please try again",
      });
    }

    await pool.query(
      `insert into company_follows (user_id, recruiter_id)
      values ($1, $2)`,
      [userid, recruiterid]
    );

    return res.json({
      message: "company has been following.",
    });
  } catch (error) {
    return res.json({
      message: `${error}`,
    });
  }
});

followingRouter.post("/unfollowcompany", async (req, res) => {
  try {
    const userid = req.user.user_id;
    const recruiterid = `${req.body.recruiterId}`;
    // const recruiterid = `${req.query.recruiterId}`;
    console.log(`user id is ${userid}`);
    console.log(`recruiter id is ${recruiterid}`);

    if (!userid) {
      return res.status(401).json({
        message: "user id not found, please login",
      });
    }

    if (!recruiterid) {
      return res.status(401).json({
        message: "recruiter id not found, please try again",
      });
    }

    await pool.query(
      `DELETE FROM company_follows
      WHERE (user_id = $1)
      AND (recruiter_id = $2)`,
      [userid, recruiterid]
    );

    return res.json({
      message: "comapny following has been deleted.",
    });
  } catch (error) {
    return res.json({
      message: `${error}`,
    });
  }
});

export default followingRouter;
