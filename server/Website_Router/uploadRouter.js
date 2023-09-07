import { Router } from "express";
import { supabase } from "../utils/supabaseClient.js";
//
// import multer from "multer";
// import { pool } from "../utils/db_connection.js";
// import bcrypt from "bcrypt";
//

const uploadRouter = Router();

// Set up an endpoint for file uploads
uploadRouter.post("/upload", async (req, res) => {
  try {
    // test req if not have file
    const file = req.files.file;  
    if (!file) {
      return res.status(400).send("No file uploaded.");
    }

    // Upload the file 
    const uploadResult = await supabase.storage
      .from("testbucket")
      .upload(`public/${file.name}`, file.data, {
        cacheControl: "3600",
        upsert: false,
      });

    console.log(uploadResult);

  
    res.status(200).send("File uploaded successfully to supabase.");
  } catch (error) {
    console.error(error);
    res.status(500).send("can't upload file to supabase");
  }
});


export default uploadRouter;
