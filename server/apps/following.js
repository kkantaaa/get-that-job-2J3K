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

followingRouter.get("/company", async (req, res) => {});

export default followingRouter;
