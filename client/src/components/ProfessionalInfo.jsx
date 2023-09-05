import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function ProfessionalInfo() {
  const navigate = useNavigate();
  const { handleSubmit, control, setValue, watch } = useForm();

  const onSubmit = (data) => {
    // put form submission logic here
    navigate("/path to job listing");
  };

  return (
    <form className="professional-info" onSubmit={handleSubmit(onSubmit)}>
      <div className="input-container">
        <div className="title-input">
          <label htmlFor="title">
            TITLE
            <Controller
              name="title"
              control={control}
              defaultValue=""
              rules={{ required: "Title is required" }}
              render={({ field }) => (
                <input
                  id="title"
                  type="text"
                  placeholder="Example: Mechanical administrator"
                  {...field}
                />
              )}
            />
          </label>
        </div>

        <div className="job-exp-input">
          <label htmlFor="jobExp">
            PROFESSIONAL EXPERIENCE
            <Controller
              name="jobExp"
              control={control}
              defaultValue=""
              rules={{ required: "Professional experience is required" }}
              render={({ field }) => (
                <input
                  id="jobExp"
                  type="text"
                  placeholder="Worked 6 years in a bitcoin farm until I decided to change my life..."
                  {...field}
                />
              )}
            />
          </label>
        </div>

        <div className="education-input">
          <label htmlFor="education">
            EDUCATION
            <Controller
              name="education"
              control={control}
              defaultValue=""
              rules={{ required: "Education is required" }}
              render={({ field }) => (
                <input
                  id="education"
                  type="text"
                  placeholder="Major in life experiences with a PHD in procrastination"
                  {...field}
                />
              )}
            />
          </label>
        </div>

        <div className="file-upload-container">
          UPLOAD / UPDATE YOUR CV
          <br />
          <input
            type="file"
            accept=".pdf, .doc, .docx"
            onChange={(e) => {
              if (e.target.files.length > 0) {
                setValue("file", e.target.files[0]);
              }
            }}
          />
        </div>

        <div className="file-list-preview-container">
          {watch("file") && (
            <div className="file-preview-container">
              <p>{watch("file").name}</p>
              <button
                className="file-remove-button"
                onClick={() => setValue("file", null)}
              >
                x
              </button>
            </div>
          )}
        </div>

        <div className="previous-button">
          <button onClick={() => navigate("/user/register2")}>PREVIOUS</button>
        </div>

        <div className="skip-button">
          <button onClick={() => navigate("/path to job listing")}>SKIP THIS!</button>
        </div>

        <div className="next-button">
          <button type="submit">NEXT</button>
        </div>
      </div>
    </form>
  );
}

export default ProfessionalInfo;
