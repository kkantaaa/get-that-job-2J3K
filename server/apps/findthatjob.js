import { Router } from "express";
import { pool } from "../utils/db_connection.js";

const findthatjobRouter = Router();

findthatjobRouter.get("/", async (req, res) => {});
findthatjobRouter.post("/", async (req, res) => {});

export default findthatjobRouter;

