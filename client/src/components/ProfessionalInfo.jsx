import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/authentication";
import { useGlobalContext } from "@/contexts/registerContexts";
import { useEffect, useRef } from "react";
import ArrowLeft from "../images/registration-page/arrow-left.svg";
import ArrowRight from "../images/registration-page/arrow-right.svg";
import FileInputIcon from "../images/registration-page/upload-line.svg";

function ProfessionalInfo() {
  const navigate = useNavigate();
  const { userData, setUserData } = useGlobalContext();
  const { UserRegister } = useAuth();
  const { handleSubmit, control, setValue } = useForm();
  const fileInputRef = useRef(null);

  useEffect(() => {
    console.log("Updated userData:", userData);
  }, [userData]);

  const handlerSkip = async (event) => {
    event.preventDefault();
    try {
      await UserRegister(userData);
      navigate("/user/findthatjob");
    } catch (error) {
      console.error("Error during registration", error);
    }
  };

  const onSubmit = async (data) => {
    const { title, jobexp, education, havefile } = data;
    setUserData({
      ...userData,
      title,
      jobexp,
      education,
      havefile,
    });

    try {
      await UserRegister(userData, data);
      navigate("/user/findthatjob");
    } catch (error) {
      console.error("Error during registration", error);
    }
  };

  const handleFileButtonClick = () => {
    fileInputRef.current.click();
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
        <div className="title-input">
          <label
            htmlFor="title"
            className="mb-[4px] text-[10px] font-normal tracking-[1.5px]"
          >
            TITLE
            <Controller
              name="title"
              control={control}
              defaultValue=""
              rules={{ required: "Title is required" }}
              render={({ field }) => (
                <input
                  name="title"
                  className="mb-[16px] flex w-[360px] h-[36px] rounded-md border border-Pink bg-background p-[8px] text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
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
          <label
            htmlFor="jobexp"
            className="mb-[4px] text-[10px] font-normal tracking-[1.5px]"
          >
            PROFESSIONAL EXPERIENCE
            <Controller
              name="jobexp"
              control={control}
              defaultValue=""
              rules={{ required: "Professional experience is required" }}
              render={({ field }) => (
                <input
                  className="flex w-[600px] h-[112px] rounded-md border border-Pink bg-background p-[8px] text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  name="jobexp"
                  id="jobexp"
                  type="text"
                  placeholder="Worked 6 years in a bitcoin farm until I decided to change my life..."
                  {...field}
                />
              )}
            />
          </label>
        </div>
        <p className="mb-[16px] text-[10px] font-normal leading-[16px] tracking-[0.4px]">
          Between 300 and 2000 characters
        </p>

        <div className="education-input">
          <label
            htmlFor="education"
            className="mb-[4px] text-[10px] font-normal tracking-[1.5px]"
          >
            EDUCATION
            <Controller
              name="education"
              control={control}
              defaultValue=""
              rules={{ required: "Education is required" }}
              render={({ field }) => (
                <input
                  className="flex w-[600px] h-[76px] rounded-md border border-Pink bg-background p-[8px] text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  name="education"
                  id="education"
                  type="text"
                  placeholder="Major in life experiences with a PHD in procrastination"
                  {...field}
                />
              )}
            />
          </label>
        </div>
        <p className="mb-[16px] text-[10px] font-normal leading-[16px] tracking-[0.4px]">
          Between 100 and 2000 characters
        </p>

        {/* Upload File */}
        <div className="file-upload-container">
          <p className="text-[10px] font-normal leading-normal tracking-[1.5px] uppercase">
            UPLOAD / UPDATE YOUR CV
          </p>

          <div 
          onClick={handleFileButtonClick}
          className="p-2 active:bg-DarkPink hover:bg-LightPink flex items-center rounded-[8px] bg-Pink text-white w-[134px] h-[36px] cursor-pointer">
            <img
              src={FileInputIcon}
              alt="File Input"
            />
            <p className="ml-[8px] text-[14px] font-normal leading-normal tracking-[0.25px] cursor-pointer">
              Choose a file
            </p>
            <input
              ref={fileInputRef}
              className="hidden"
              name="havefile"
              type="file"
              id="havefile"
              accept=".pdf"
              onChange={(e) => {
                if (e.target.files.length > 0) {
                  setValue("file", e.target.files[0]);
                }
              }}
            />
          </div>
        </div>

        <p className="text-[10px] font-normal text-LightGray leading-[16px] tracking-[0.4px] uppercase">
          Only .PDF Max size 5MB
        </p>

        <div className="mt-[16px] flex flex-row">
          {/* Previous Button */}
          <div className="mr-[16px] w-[140px] h-[40px] px-[16px] py-[8px] bg-Pink rounded-[16px] text-white text-center text-sm tracking-[1.25px]">
            <button
              onClick={() => navigate("/user/register2")}
              className="flex flex-row"
              type="button"
            >
              <img src={ArrowLeft} alt="Previous" />
              <div className="ml-[4px]">PREVIOUS</div>
            </button>
          </div>

          {/* Skip Button */}
          <div className="text-[14px] mr-[16px] w-[120px] h-[40px] px-[16px] py-[8px] border-2 border-Pink rounded-[16px] text-black font-[500px] text-center tracking-[1.25px]">
            <button onClick={handlerSkip} type="button">
              SKIP THIS!
            </button>
          </div>

          {/* Finish Button */}
          <div className="w-[120px] h-[40px] px-[16px] py-[8px] bg-Pink rounded-[16px] text-white text-center text-sm tracking-[1.25px]">
            <button
              className="flex flex-row"
              type="submit"
              onClick={handleSubmit(onSubmit)}
            >
              <div className="ml-[10px]">FINISH</div>
              <img src={ArrowRight} alt="Finish" />
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default ProfessionalInfo;

