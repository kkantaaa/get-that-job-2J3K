import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import authRouter from "./apps/auth.js";
import dotenv from "dotenv";

async function init() {
  dotenv.config();
  // cloudinary.config({
  //   cloud_name: process.env.CLOUD_NAME,
  //   api_key: process.env.API_KEY,
  //   api_secret: process.env.API_SECRET,
  //   secure: true,
  // });

  const app = express();
  const port = 3000;

  app.use(cors());
  app.use(bodyParser.json());

  app.use("/auth", authRouter);

  app.get("/", (req, res) => {
    res.send("Hello GET THAT JOB!");
  });

  app.get("*", (req, res) => {
    res.status(404).send("Not found");
  });

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

init();
