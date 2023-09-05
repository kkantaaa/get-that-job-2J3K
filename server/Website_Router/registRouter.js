import { Router } from "express";
import { pool } from "../utils/db_connection.js";
//
// import { supabase } from "../utils/supabaseClient.js";

// console.log(supabase);
const registRouter = Router();

//test database connection
registRouter.get("/", async (req, res) => {
  const result = await pool.query("select * from clients");
  return res.json({
    message: result.rows,
  });
});
//test database connection


export default registRouter;
