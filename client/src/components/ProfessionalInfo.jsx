import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/authentication";
import { useGlobalContext } from "@/contexts/registerContexts";
import { useEffect } from "react";

function ProfessionalInfo() {
  const navigate = useNavigate();
  const { userData, setUserData } = useGlobalContext();
  const { UserRegister } = useAuth();
  const { handleSubmit, control, setValue, watch } = useForm();

  useEffect(() => {
    console.log("Updated userData:", userData);
  }, [userData]);

  const handlerSkip = async (event) => {
    event.preventDefault();
    try {
      await UserRegister(userData);
      navigate("/path to job listing");
    } catch (error) {
      console.error("Error during registration", error);
    }
  };

  const onSubmit = async (data) => {
    const { title, jobExp, education, havefile } = data;
    setUserData({
      ...userData,
      title,
      jobExp,
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

  return (
    <form className="font-Inter" onSubmit={handleSubmit(onSubmit)}>
      <div className="input-container">
        <p className="text-[10px] font-normal tracking-[1.5px] uppercase">
          You can complete this information later
        </p>
        <p className="mb-[8px] text-[10px] font-normal tracking-[1.5px] uppercase">
          but we reccomend you to do it now
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
                  className="mb-[16px] flex w-[360px] h-[36px] rounded-md border border-Pink  bg-background p-[8px] text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
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
            htmlFor="jobExp"
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
                  className="flex w-[600px] h-[112px] rounded-md border border-Pink  bg-background p-[8px] text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
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
                  className="flex w-[600px] h-[76px] rounded-md border border-Pink  bg-background p-[8px] text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
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

        <div className="file-upload-container">
          <p className="text-[10px] font-normal leading-normal tracking-[1.5px] uppercase">
            UPLOAD / UPDATE YOUR CV
          </p>

          <input
            className="mt-[4px] text-[14px] font-normal leading-[20px] tracking-[0.25px]"
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

        <p className="text-[12px] font-normal text-LightGray leading-[16px] tracking-[0.4px] uppercase">
          Only PDF. Max size 5MB
        </p>

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
        <div className="mt-[16px] flex flex-row">
          <div className="mr-[16px] w-[140px] h-[40px] px-[16px] py-[8px] bg-Pink rounded-[16px] text-white text-center text-sm tracking-[1.25px]">
            <button
              onClick={() => navigate("/user/register2")}
              className="flex flex-row"
              type="submit"
            >
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
              <div className="ml-[4px]">PREVIOUS</div>
            </button>
          </div>

          <div className="text-[14px] mr-[16px] w-[120px] h-[40px] px-[16px] py-[8px] border-2 border-Pink rounded-[16px] text-black font-[500px] text-center tracking-[1.25px]">
            <button onClick={handlerSkip}>SKIP THIS!</button>
          </div>

          <div className="w-[120px] h-[40px] px-[16px] py-[8px] bg-Pink rounded-[16px] text-white text-center text-sm tracking-[1.25px]">
            <button
              className="flex flex-row"
              type="submit"
              onClick={handleSubmit}
            >
              <div className="ml-[10px]">FINISH</div>
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
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default ProfessionalInfo;
