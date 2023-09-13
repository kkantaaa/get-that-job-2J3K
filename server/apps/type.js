import { Router } from "express";
import { pool } from "../utils/db_connection.js";

const typeRouter = Router();

typeRouter.post("/", async (req, res) => {
  try {
    const type = {
      type_name: req.body.type_name,
    };
    await pool.query("insert into job_types (type_name) values ($1)", [
      type.type_name,
    ]);
    return res.json({
      message: "type created!",
    });
  } catch (err) {
    console.log(err);
    return res.status(512).json({
      message: err,
    });
  }
});

typeRouter.get("/", async (req, res) => {
  const result = await pool.query("SELECT * FROM job_types ");
  return res.json({
    result: result.rows,
  });
});

export default typeRouter;
