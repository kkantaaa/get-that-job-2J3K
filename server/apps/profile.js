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
        `UPDATE recruiter_informations SET ${queryParams} WHERE recruiter_id = $${
          Object.keys(updatedProfile).length + 1
        }::integer`,
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

/* Professional Profile Routers  */
/* V V V */
profileRouter.get("/propro", async (req, res) => {
  try {
    const user_id = req.user.user_id;

    const fetchdataid = await pool.query(
      `SELECT * FROM user_profiles INNER JOIN users  ON user_profiles.user_id = users.user_id WHERE user_profiles.user_id = $1`,
      [user_id]
    );
    res.json(fetchdataid.rows[0]);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
profileRouter.put("/propro", async (req, res) => {
  try {
    const user_id = req.user.user_id;

    const {
      email,
      user_birthdate,
      user_cv,
      user_education,
      user_experience,
      user_linkedin,
      user_name,
      user_phone,
      user_title,
    } = req.body;
    await pool.query(
      `
      UPDATE user_profiles
      SET
        user_birthdate = $1,
        user_cv = $2,
        user_education = $3,
        user_experience = $4,
        user_linkedin = $5,
        user_name = $6,
        user_phone = $7,
        user_title = $8,
        edited_at = now()   
      WHERE user_id = $9       `,
      [
        user_birthdate,
        user_cv,
        user_education,
        user_experience,
        user_linkedin,
        user_name,
        user_phone,
        user_title,
        user_id,
      ]
    );
    await pool.query(
      `
    UPDATE users
    SET email = $2,
    edited_at = now()   
    WHERE user_id = $1
     `,
      [user_id, email]
    );
    res.status(200).json({ message: "Profile updated successfully" });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default profileRouter;
