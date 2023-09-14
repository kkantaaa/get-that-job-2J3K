import { Router } from "express";
import { supabase } from "../utils/supabaseClient.js";
//
import multer from "multer";
// import { pool } from "../utils/db_connection.js";
// import bcrypt from "bcrypt";
//

const upload = multer({ dest: "uploads/" });
const uploadRouter = Router();

// Set up an endpoint for file uploads
uploadRouter.post("/", upload.single("file"), async (req, res) => {
  try {
    // test req if not have file
    const file = req.file;
    if (!file) {
      return res.status(400).send("No file uploaded.");
    }
    console.log({ reqbody: file });
    // Upload the file
    const uploadResult = await supabase.storage
      .from("testbucket")
      .upload(`companyLogo/${file.originalname}`, file, {
        cacheControl: "3600",
        upsert: false,
        contentType: "image/webp",
      });
    const url = supabase.storage
      .from("testbucket")
      .getPublicUrl(`${file.originalname}`);
    console.log(url);
    console.log({ uploadResult: uploadResult });

    res.status(200).send("File uploaded successfully to supabase.");
  } catch (error) {
    console.error(error);
    res.status(500).send("can't upload file to supabase");
  }
});

export default uploadRouter;
