import * as pg from "pg";
import dotenv from "dotenv";

dotenv.config();
const { Pool } = pg.default;
const pool = new Pool({
  connectionString: `postgresql://postgres:${process.env.GTJ_SUPABASE_PASSWORD}@db.vzijxarmxcbeahvervum.supabase.co:5432/postgres`,
});

export { pool };

// This is supabase set up using the string connection
// Not relevant to set up supabase using the supabaseClient