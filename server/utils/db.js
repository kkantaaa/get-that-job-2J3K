import * as pg from "pg";
const { Pool } = pg.default;

const pool = new Pool({
  connectionString: "postgresql://postgres:11014020@localhost:5432/GTJ", //เปลี่ยน db
});

export { pool };
