import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/authentication";

function ProfessionalInfo() {
  const navigate = useNavigate();
  const {UserRegister} = useAuth();
  const { handleSubmit, control, setValue, watch } = useForm();

  const onSubmit = async (data) => {
    await UserRegister(data);
    console.log(data);
    navigate("/path to job listing");
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
            className="mb-[4px] text-xs[10px] font-normal tracking-[1.5px]"
          >
            TITLE
            <Controller
              name="title"
              control={control}
              defaultValue=""
              rules={{ required: "Title is required" }}
              render={({ field }) => (
                <input
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
            className="mb-[4px] text-xs[10px] font-normal tracking-[1.5px]"
          >
            PROFESSIONAL EXPERIENCE
            <Controller
              name="jobExp"
              control={control}
              defaultValue=""
              rules={{ required: "Professional experience is required" }}
              render={({ field }) => (
                <input
                  className="flex w-[600px] h-[112px] rounded-md border border-Pink  bg-background p-[8px] text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  id="jobExp"
                  type="text"
                  placeholder="Worked 6 years in a bitcoin farm until I decided to change my life..."
                  {...field}
                />
              )}
            />
          </label>
        </div>
        <p className="mb-[16px] text-[12px] font-normal leading-[16px] tracking-[0.4px]">
          Between 300 and 2000 characters
        </p>

        <div className="education-input">
          <label
            htmlFor="education"
            className="mb-[4px] text-xs[10px] font-normal tracking-[1.5px]"
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
                  id="education"
                  type="text"
                  placeholder="Major in life experiences with a PHD in procrastination"
                  {...field}
                />
              )}
            />
          </label>
        </div>
        <p className="mb-[16px] text-[12px] font-normal leading-[16px] tracking-[0.4px]">
          Between 100 and 2000 characters
        </p>

        <div className="file-upload-container">
          <p className="text-[10px] font-normal leading-normal tracking-[1.5px] uppercase">
            UPLOAD / UPDATE YOUR CV
          </p>
          <input
            className="mt-[4px] text-[14px] font-normal leading-[20px] tracking-[0.25px]"
            type="file"
            accept=".pdf"
            onChange={(e) => {
              if (e.target.files.length > 0) {
                setValue("file", e.target.files[0]);
              }
            }}
          />
        </div>

        <p className="text-[12px] font-normal leading-[16px] tracking-[0.4px] uppercase">
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
          <div className="mr-[16px] w-[106px] h-[40px] px-[16px] py-[8px] bg-Pink rounded-[16px] text-white text-center text-sm tracking-[1.25px]">
            <button onClick={() => navigate("/user/register2")}>
              PREVIOUS
            </button>
          </div>

          <div className="text-[13px] mr-[16px] w-[106px] h-[40px] px-[16px] py-[8px] border-2 border-Pink rounded-[16px] text-black text-center tracking-[1.25px]">
            <button onClick={() => navigate("/path to job listing")}>
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

export default ProfessionalInfo;
