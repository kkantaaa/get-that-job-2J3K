// import * as pg from "pg";
// const { Pool } = pg.default;

// const pool = new Pool({
//   connectionString: "postgresql://postgres:11014020@localhost:5432/GTJ", //เปลี่ยน db
// });

// export { pool };

import * as pg from "pg";
import dotenv from "dotenv";

const { Pool } = pg.default;
const pool = new Pool({
  connectionString: `postgresql://postgres:${process.env.GTJ_SUPABASE_PASSWORD}@db.vzijxarmxcbeahvervum.supabase.co:5432/clients`,
});

export { pool };
