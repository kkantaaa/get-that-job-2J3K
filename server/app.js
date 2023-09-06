import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import authRouter from "./apps/auth.js";
import dotenv from "dotenv";
import registRouter from "./Website_Router/registRouter.js";

async function init() {
  dotenv.config();
  // cloudinary.config({
  //   cloud_name: process.env.CLOUD_NAME,
  //   api_key: process.env.API_KEY,
  //   api_secret: process.env.API_SECRET,
  //   secure: true,
  // });
  const app = express();
  const port = 4000;
  app.use(cors());
  app.use(bodyParser.json());

  // router
  app.use("/regist", registRouter);
  app.use("/auth", authRouter);

  // router

  // test route
  app.get("/", (req, res) => {
    res.send("Hello Get That Job!");
  });

  app.get("*", (req, res) => {
    res.status(404).send("Not found, Check route");
  });

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    // test route
  });
}

init();
