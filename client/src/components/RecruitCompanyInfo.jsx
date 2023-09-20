import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useGlobalContext } from "@/contexts/registerContexts";
import { useAuth } from "@/contexts/authentication";
import ArrowLeft from "../images/registration-page/arrow-left.svg";
import ArrowRight from "../images/registration-page/arrow-right.svg";
import FileInputIcon from "../images/registration-page/upload-line.svg";

function RecruitCompanyInfo() {
  const navigate = useNavigate();
  const { recruiterData } = useGlobalContext();
  const { handleSubmit, control } = useForm();
  const { RecruiterRegister } = useAuth();
  const { upload } = useAuth();
  const fileInputRef = useRef(null);
  const [file, setFile] = useState();

  useEffect(() => {
    console.log("Updated RecruiterData:", recruiterData);
  }, [recruiterData]);

  const handlerSkip = async (event) => {
    event.preventDefault();
    try {
      await RecruiterRegister(recruiterData);
      navigate("/recruiter/jobpostings");
    } catch (error) {
      console.error("Error during registration", error);
    }
  };

  console.log(recruiterData);
  const onSubmit = async (data) => {
    console.log(data);

    const img = {
      fileType: "companyLogo",
      file: data.file,
    };

    console.log({ img: img });
    let company_logo = await upload(img);

    if (company_logo === undefined) {
      company_logo = null;
    }

    try {
      const fetchData = {
        ...recruiterData,
        company_website: data.company_website,
        about_company: data.about_company,
        company_logo: company_logo,
      };

      await RecruiterRegister(fetchData);
      navigate("/recruiter/jobpostings");
    } catch (error) {
      console.error("Error during registration", error);
    }
  };

  const handleFileButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFilePreview = (e) => {
    if (e.target.files.length > 0) {
      const fileURL = URL.createObjectURL(e.target.files[0]);
      setFile(fileURL);
      console.log(file);
    }
  };

  return (
    <form className="font-Inter" onSubmit={handleSubmit(onSubmit)}>
      <div className="input-container">
        <p className="text-[10px] font-normal tracking-[1.5px] uppercase">
          You can complete this information later
        </p>
        <p className="mb-[8px] text-[10px] font-normal tracking-[1.5px] uppercase">
          but we recommend you to do it now
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
              render={({ field }) => (
                <input
                  className="mb-[16px] flex w-[360px] h-[36px] rounded-md border border-Pink bg-background p-[8px] text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
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
            htmlFor="about_company"
            className="mb-[4px] text-[10px] font-normal tracking-[1.5px]"
          >
            ABOUT COMPANY
            <Controller
              name="about_company"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  className="flex w-[600px] h-[76px] rounded-md border border-Pink bg-background p-[8px] text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  id="about_company"
                  name="about_company"
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

        {/* button */}
        <div
          onClick={handleFileButtonClick}
          className="mt-[8px] p-2 active:bg-DarkPink hover:bg-LightPink flex items-center rounded-[8px] bg-Pink text-white w-[134px] h-[36px] cursor-pointer"
        >
            <img src={FileInputIcon} alt="File Input" />
            <p className="ml-[8px] text-[14px] font-normal leading-normal tracking-[0.25px] cursor-pointer">
              Choose a file
            </p>
            <input
              ref={fileInputRef}
              className="hidden"
              name="havefile"
              type="file"
              id="havefile"
              accept=".jpg, .png, .jpeg, .gif"
              onChange={handleFilePreview}
            />
        </div>

        <div className="mt-[4px]">
            {file && (
              <img
                src={file}
                alt="Preview"
                className="mb-4"
                style={{ maxWidth: "200px" }}
              />
            )}
            </div>

        <p className="text-[10px] font-normal text-LightGray leading-[16px] tracking-[0.4px] uppercase">
          Only .jpg, .png, .jpeg, .gif Max size 5MB
        </p>

        <div className="mt-[16px] flex flex-row">
          <div className="mr-[16px] w-[140px] h-[40px] px-[16px] py-[8px] bg-Pink rounded-[16px] text-white text-center text-sm tracking-[1.25px]">
            <button
              onClick={() => navigate("/recruiter/register1")}
              className="flex flex-row"
              type="submit"
            >
              <img src={ArrowLeft} alt="Previous" />
              <div className="ml-[4px]">PREVIOUS</div>
            </button>
          </div>

          <div className="text-[14px] mr-[16px] w-[120px] h-[40px] px-[16px] py-[8px] border-2 active:bg-DarkPink hover:bg-LightPink border-Pink rounded-[16px] text-black font-[500px] text-center tracking-[1.25px]">
            <button onClick={handlerSkip}>SKIP THIS!</button>
          </div>

          <div className="w-[120px] h-[40px] px-[16px] py-[8px] active:bg-DarkPink hover:bg-LightPink bg-Pink rounded-[16px] text-white text-center text-sm tracking-[1.25px]">
            <button
              className="flex flex-row"
              type="submit"
              onClick={handleSubmit}
            >
              <div className="ml-[10px]">FINISH</div>
              <img src={ArrowRight} alt="Next" />
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default RecruitCompanyInfo;
