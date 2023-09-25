import { Router } from "express";
import { pool } from "../utils/db_connection.js";
import { protect } from "../utils/protect.js";

const profileRouter = Router();
profileRouter.use(protect);

profileRouter.get("/recruiter", async (req, res) => {
  try {
    const recruiter_id = req.user.recruiter_id;

    const query = `SELECT recruiters.recruiter_id, email, company_name, company_website, about_company, company_logo
        FROM recruiters
        INNER JOIN recruiter_informations
        ON recruiters.recruiter_id = recruiter_informations.recruiter_id
        WHERE recruiters.recruiter_id = $1`;

    const result = await pool.query(query, [recruiter_id]);

    return res.json({
      data: result.rows,
    });
  } catch (error) {
    return res.json({
      message: `${error}`,
    });
  }
});

profileRouter.put("/recruiter", async (req, res) => {
    try {
      const recruiter_id = req.user.recruiter_id;
      const updatedProfile = {
        ...req.body,
      };
  
      if (updatedProfile.email) {
        await pool.query(
          `UPDATE recruiters SET email = $1 WHERE recruiter_id = $2`,
          [updatedProfile.email, recruiter_id]
        );
        delete updatedProfile.email;
      }
  
      if (Object.keys(updatedProfile).length > 0) {
        const queryParams = Object.keys(updatedProfile)
          .map((key, index) => `${key} = $${index + 1}`)
          .join(", ");
        console.log({ query: queryParams });
  
        await pool.query(
          `UPDATE recruiter_informations SET ${queryParams} WHERE recruiter_id = $${Object.keys(updatedProfile).length + 1}::integer`,
          [...Object.values(updatedProfile), recruiter_id]
        );
      }
  
      return res.status(200).json({
        message: "Profile updated successfully.",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "Error updating profile. Please try again.",
      });
    }
  });
  

export default profileRouter;
