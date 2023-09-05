import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function RecruitCompanyInfo() {
  const navigate = useNavigate();
  const { handleSubmit, control, setValue, watch } = useForm();
  const [logoPreview, setLogoPreview] = useState(null);

  const onSubmit = (data) => {
    // put form submission logic later
    navigate("/path to job listing");
  };

  useEffect(() => {
    const logoFile = watch("file");
    console.log("Logo File:", logoFile);
    if (logoFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        console.log("Logo Preview Data URL:", e.target.result);
        setLogoPreview(e.target.result);
      };
      reader.readAsDataURL(logoFile);
    } else {
      setLogoPreview(null);
    }
  }, [watch]);

  return (
    <form className="companyname-info" onSubmit={handleSubmit(onSubmit)}>
      <div className="input-container">
        <div className="company-website-input">
          <label htmlFor="company-website">
            COMPANY WEBSITE
            <Controller
              name="company-website"
              control={control}
              defaultValue=""
              //   rules={{ required: "Company name is required" }}
              render={({ field }) => (
                <input
                  id="title"
                  type="text"
                  placeholder="http://www.mycompany.sa"
                  {...field}
                />
              )}
            />
          </label>
        </div>

        <div className="about-company-input">
          <label htmlFor="abtcompany">
            ABOUT COMPANY
            <Controller
              name="abtcompany"
              control={control}
              defaultValue=""
              //   rules={{ required: "About company experience is required" }}
              render={({ field }) => (
                <input
                  id="abtcompany"
                  type="text"
                  placeholder="My Company SA has the vision to change the way how..."
                  {...field}
                />
              )}
            />
          </label>
        </div>

        <div className="logo-upload-container">
          UPLOAD THE COMPANY LOGO
          <br />
          <input
            type="file"
            accept=".jpg, .png, .gif, .jpeg"
            onChange={(e) => {
              if (e.target.files.length > 0) {
                setValue("file", e.target.files[0]);
              }
            }}
          />
        </div>

        <div className="logo-list-preview-container">
          {logoPreview && (
            <div className="logo-preview-container">
              <img src={logoPreview} alt="Logo Preview" />
              {/* <p>{watch("file").name}</p> */}
              <button
                className="logo-remove-button"
                onClick={() => setValue("file", null)}
              >
                x
              </button>
            </div>
          )}
        </div>

        <div className="previous-button">
          <button onClick={() => navigate("/recruiter/register1")}>
            PREVIOUS
          </button>
        </div>

        <div className="skip-button">
          <button onClick={() => navigate("/path to job listing")}>
            SKIP THIS!
          </button>
        </div>

        <div className="next-button">
          <button type="submit">NEXT</button>
        </div>
      </div>
    </form>
  );
}

export default RecruitCompanyInfo;
