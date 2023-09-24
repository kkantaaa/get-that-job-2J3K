import { Router } from "express";
import { pool } from "../utils/db_connection.js";
import { protect } from "../utils/protect.js";

const jobAppRouter = Router();
// jobAppRouter.use(protect);

jobAppRouter.get("/", async (req, res) => {
  try {
    const userid = `${req.query.userId}`; //ยังไม่สามารถ set ค่าให้ userid ผ่าน param ได้
    // const userid = 26;
    if (!userid) {
      return res.status(401).json({
        message: "no userId please login",
      });
    }
    console.log(`user id is ${userid}`); //ยังไม่สามารถส่งค่า userid ไป query ได้

    let query = "";
    let values = [];

    query = `SELECT job_id
    FROM application
    WHERE user_id = $1`;
    values = [userid];

    const result = await pool.query(query, values);

    return res.json({
      data: result.rows,
    });
  } catch (error) {
    return res.json({
      message: `${error}`,
    });
  }
});

export default jobAppRouter;
