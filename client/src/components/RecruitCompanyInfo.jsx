import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGlobalContext } from "@/contexts/registerContexts";
import { useAuth } from "@/contexts/authentication";
import ArrowLeft from "../images/registration-page/arrow-left.svg";
import ArrowRight from "../images/registration-page/arrow-right.svg";

function RecruitCompanyInfo() {
  const navigate = useNavigate();
  const { recruiterData, setRecruiterData } = useGlobalContext();
  const { handleSubmit, control, setValue, watch } = useForm();
  const [logoPreview, setLogoPreview] = useState(null);
  const { RecruiterRegister } = useAuth();
  const { upload } = useAuth();

  useEffect(() => {
    console.log("Updated RecruiterData:", recruiterData);
  }, [recruiterData]);

  const handlerSkip = async (event) => {
    event.preventDefault();
    try {
      await RecruiterRegister(recruiterData);
<<<<<<< HEAD
      // navigate("/path to job post");
=======
      navigate("/path to job post");
>>>>>>> d850079 (fix: edit buttons)
    } catch (error) {
      console.error("Error during registration", error);
    }
  };
<<<<<<< HEAD
  console.log(recruiterData);

  const onSubmit = async (data) => {
    console.log(data);
=======

  const onSubmit = async (data) => {
    const { companywebsite, aboutcompany, havefile } = data;
    setRecruiterData({
      ...recruiterData,
      companywebsite,
      aboutcompany,
      havefile,
    });
>>>>>>> d850079 (fix: edit buttons)

    const img = data.file;
    console.log({ img: img });
    let company_logo = await upload(img);


    if (company_logo === undefined) {
      company_logo = null;
    }
    
    try {
<<<<<<< HEAD
      // const { company_website, about_company } = data;

      setRecruiterData({
        ...recruiterData,
        company_website: data.company_website,
        about_company: data.about_company,
        company_logo: company_logo,
      });
      
      await RecruiterRegister(recruiterData);
      // navigate("/path to job listing");
=======
      await RecruiterRegister(recruiterData, data);
      navigate("/path to job listing");
>>>>>>> d850079 (fix: edit buttons)
    } catch (error) {
      console.error("Error during registration", error);
    }
  };

  // useEffect(() => {
  //   const logoFile = watch("file");
  //   console.log("Logo File:", logoFile);
  //   if (logoFile) {
  //     const reader = new FileReader();
  //     reader.onload = (e) => {
  //       console.log("Logo Preview Data URL:", e.target.result);
  //       setLogoPreview(e.target.result);
  //     };
  //     reader.readAsDataURL(logoFile);
  //   } else {
  //     setLogoPreview(null);
  //   }
  // }, [watch]);

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
            className="mb-[4px] text-[10px] font-normal tracking-[1.5px]"
          >
            COMPANY WEBSITE
            <Controller
              name="company_website"
              control={control}
              defaultValue=""
              //   rules={{ required: "Company name is required" }}
              render={({ field }) => (
                <input
                  className="mb-[16px] flex w-[360px] h-[36px] rounded-md border border-Pink  bg-background p-[8px] text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  id="company_website"
                  name="company_website"
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
<<<<<<< HEAD
            htmlFor="about_company"
            className="mb-[4px] text-xs[10px] font-normal tracking-[1.5px]"
=======
            htmlFor="abtcompany"
            className="mb-[4px] text-[10px] font-normal tracking-[1.5px]"
>>>>>>> eb21c4d (fix: fix buttons and font size)
          >
            ABOUT COMPANY
            <Controller
              name="about_company"
              control={control}
              defaultValue=""
              //   rules={{ required: "About company experience is required" }}
              render={({ field }) => (
                <input
<<<<<<< HEAD
                  className="flex w-[600px] h-[76px] rounded-md border border-Pink  bg-background p-[8px] text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
=======
                  className="flex w-[360px] h-[36px] rounded-md border border-Pink  bg-background p-[8px] text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
>>>>>>> eb21c4d (fix: fix buttons and font size)
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
        <p className="text-[10px] font-normal leading-[16px] tracking-[0.4px]">
          Between 100 and 2000 characters
        </p>
        <div className="logo-upload-container">
          <p className="mt-[8px] text-[10px] font-[400px] leading-normal tracking-[1.5px] uppercase">
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

        <p className="text-[12px] text-LightGray font-normal leading-[16px] tracking-[0.4px] uppercase">
          Only PDF. Max size 5MB
        </p>

        <div className="mt-[16px] flex flex-row">
          <div className="mr-[16px] w-[140px] h-[40px] px-[16px] py-[8px] bg-Pink rounded-[16px] text-white text-center text-sm tracking-[1.25px]">
<<<<<<< HEAD
            <button
=======
          <button
>>>>>>> eb21c4d (fix: fix buttons and font size)
              onClick={() => navigate("/recruiter/register1")}
              className="flex flex-row"
              type="submit"
            >
<<<<<<< HEAD
              <img src={ArrowLeft} />
=======
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M10.828 12L15.778 16.95L14.364 18.364L8 12L14.364 5.63599L15.778 7.04999L10.828 12Z"
                  fill="white"
                />
              </svg>
>>>>>>> eb21c4d (fix: fix buttons and font size)
              <div className="ml-[4px]">PREVIOUS</div>
            </button>
          </div>

          <div className="text-[14px] mr-[16px] w-[120px] h-[40px] px-[16px] py-[8px] border-2 border-Pink rounded-[16px] text-black font-[500px] text-center tracking-[1.25px]">
            <button onClick={handlerSkip}>SKIP THIS!</button>
          </div>

          <div className="w-[120px] h-[40px] px-[16px] py-[8px] bg-Pink rounded-[16px] text-white text-center text-sm tracking-[1.25px]">
<<<<<<< HEAD
            <button
=======
          <button
>>>>>>> eb21c4d (fix: fix buttons and font size)
              className="flex flex-row"
              type="submit"
              onClick={handleSubmit}
            >
              <div className="ml-[10px]">FINISH</div>
<<<<<<< HEAD
              <img src={ArrowRight}/>
=======
              <svg
                className="ml-[8px]"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M13.1722 12L8.22217 7.04999L9.63617 5.63599L16.0002 12L9.63617 18.364L8.22217 16.95L13.1722 12Z"
                  fill="white"
                />
              </svg>
>>>>>>> eb21c4d (fix: fix buttons and font size)
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default RecruitCompanyInfo;
