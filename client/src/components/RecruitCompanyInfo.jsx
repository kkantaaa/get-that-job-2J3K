import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGlobalContext } from "@/contexts/registerContexts";
import { useAuth } from "@/contexts/authentication";

function RecruitCompanyInfo() {
  const navigate = useNavigate();
  const { recruiterData, setRecruiterData } = useGlobalContext();
  const { handleSubmit, control, setValue, watch } = useForm();
  const [logoPreview, setLogoPreview] = useState(null);
  const { RecruiterRegister } = useAuth();

  useEffect(() => {
    console.log("Updated RecruiterData:", recruiterData);
  }, [recruiterData]);

  const handlerSkip = async (event) => {
    event.preventDefault();
    try {
      await RecruiterRegister(recruiterData);
      navigate("/path to job post");
    } catch (error){
      console.error("Error during registration", error);
    }
  };


  const onSubmit = async (data) => {
    const { companywebsite, aboutcompany, havefile} = data;
    setRecruiterData({
      ...recruiterData,
      companywebsite,
      aboutcompany,
      havefile,
    });

    try {
      await RecruiterRegister(recruiterData, data);
      navigate("/path to job listing");
    } catch (error){
      console.error("Error during registration", error);
    }
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
    <form className="font-Inter" onSubmit={handleSubmit(onSubmit)}>
      <div className="input-container">
        <p className="text-[10px] font-normal tracking-[1.5px] uppercase">
          You can complete this information later
        </p>
        <p className="mb-[8px] text-[10px] font-normal tracking-[1.5px] uppercase">
          but we reccomend you to do it now
        </p>
        <div className="company-website-input">
          <label
            htmlFor="company-website"
            className="mb-[4px] text-xs[10px] font-normal tracking-[1.5px]"
          >
            COMPANY WEBSITE
            <Controller
              name="companywebsite"
              control={control}
              defaultValue=""
              //   rules={{ required: "Company name is required" }}
              render={({ field }) => (
                <input
                  className="mb-[16px] flex w-[360px] h-[36px] rounded-md border border-Pink  bg-background p-[8px] text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  id="companywebsite"
                  name="companywebsite"
                  type="text"
                  placeholder="http://www.mycompany.sa"
                  {...field}
                />
              )}
            />
          </label>
        </div>

        <div className="about-company-input">
          <label
            htmlFor="abtcompany"
            className="mb-[4px] text-xs[10px] font-normal tracking-[1.5px]"
          >
            ABOUT COMPANY
            <Controller
              name="aboutcompany"
              control={control}
              defaultValue=""
              //   rules={{ required: "About company experience is required" }}
              render={({ field }) => (
                <input
                  className="mb-[16px] flex w-[360px] h-[36px] rounded-md border border-Pink  bg-background p-[8px] text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  id="aboutcompany"
                  name="aboutcompany"
                  type="text"
                  placeholder="My Company SA has the vision to change the way how..."
                  {...field}
                />
              )}
            />
          </label>
        </div>
        <p className="text-[12px] font-normal leading-[16px] tracking-[0.4px]">
          Between 100 and 2000 characters
        </p>
        <div className="logo-upload-container">
          <p className="mt-[8px] text-[10px] font-normal leading-normal tracking-[1.5px] uppercase">
            UPLOAD THE COMPANY LOGO
          </p>
          <input
            className="mt-[4px] text-[14px] font-normal leading-[20px] tracking-[0.25px]"
            name="havefile"
            id="havefile"
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
        <div className="mt-[16px] flex flex-row">
          <div className="mr-[16px] w-[106px] h-[40px] px-[16px] py-[8px] bg-Pink rounded-[16px] text-white text-center text-sm tracking-[1.25px]">
            <button onClick={() => navigate("/recruiter/register1")}>
              PREVIOUS
            </button>
          </div>

          <div className="mr-[16px] w-[106px] h-[40px] px-[16px] py-[8px] border-2 border-Pink rounded-[16px] text-black text-center text-[12px] tracking-[1.25px]">
            <button onClick={handlerSkip}>
              SKIP THIS!
            </button>
          </div>

          <div className="w-[106px] h-[40px] px-[16px] py-[8px] bg-Pink rounded-[16px] text-white text-center text-sm tracking-[1.25px]">
            <button type="submit">NEXT</button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default RecruitCompanyInfo;
