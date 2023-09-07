import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
// import { useAuth } from "@/contexts/authentication";

function PersonalInformation() {
  const navigate = useNavigate();
  // const {UserRegister} = useAuth();
  const { handleSubmit, control } = useForm();

  const handlerSkip = (event) => {
    event.preventDefault();
    navigate("/path หน้า job listing");
  };

  const onSubmit = async (data) => {
    // await UserRegister(data);
    console.log(data);
    navigate("/user/register3");
  };

  return (
    <form className="font-Inter" onSubmit={handleSubmit(onSubmit)}>
      <div className="input-container">
        <p className="text-[10px] font-normal tracking-[1.5px] uppercase">You can complete this information later</p>        
        <p className="mb-[8px] text-[10px] font-normal tracking-[1.5px] uppercase">but we reccomend you to do it now</p>
        <div className="flex flex-col">
          <label
            htmlFor="name"
            className="mb-[4px] text-[10px] font-normal tracking-[1.5px]"
          >
            NAME
          </label>
          <Controller
            name="name"
            control={control}
            defaultValue=""
            rules={{ required: "Name is required" }}
            render={({ field }) => (
              <input
                className="mb-[16px] flex w-[360px] h-[36px] rounded-md border border-Pink  bg-background p-[8px] text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                id="name"
                name="name"
                type="text"
                placeholder="John Doe"
                {...field}
              />
            )}
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="phone"
            className="mb-[4px] text-[10px] font-normal tracking-[1.5px]"
          >
            PHONE
          </label>
          <Controller
            name="phoneNumber"
            control={control}
            defaultValue=""
            rules={{ required: "Phone number is required" }}
            render={({ field }) => (
              <input
                className="mb-[16px] flex w-[360px] h-[36px] rounded-md border border-Pink bg-background p-[8px] text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                id="phone"
                name="phoneNumber"
                type="text"
                placeholder="+XXXXXXXX"
                {...field}
              />
            )}
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="birthdate"
            className="mb-[4px] text-[10px] font-normal tracking-[1.5px]"
          >
            BIRTHDATE
          </label>
          <Controller
            name="birthdate"
            control={control}
            defaultValue=""
            rules={{ required: "Birthdate is required" }}
            render={({ field }) => (
              <input
                className="mb-[16px] flex w-[360px] h-[36px] rounded-md border border-Pink  bg-background p-[8px] text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                id="birthdate"
                name="birthdate"
                type="date"
                {...field}
              />
            )}
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="linkedin"
            className="mb-[4px] text-[10px] font-normal tracking-[1.5px]"
          >
            LINKEDIN URL
          </label>
          <Controller
            name="linkedInUrl"
            control={control}
            defaultValue=""
            rules={{ required: "LinkedIn URL is required" }}
            render={({ field }) => (
              <input
                className="mb-[16px] flex w-[360px] h-[36px] rounded-md border border-Pink  bg-background p-[8px] text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                id="linkedin"
                name="linkedInUrl"
                type="text"
                placeholder="https://www.linkedin.com/in/username"
                {...field}
              />
            )}
          />
        </div>

        <div className="flex flex-row">
        <div className="mr-[16px] w-[106px] h-[40px] px-[14px] py-[8px] border-2 border-Pink rounded-[16px] text-black text-center text-[14px] tracking-[1.25px]">
          <button onClick={handlerSkip}>SKIP THIS!</button>
        </div>
        <div className="w-[106px] h-[40px] px-[16px] py-[8px] bg-Pink rounded-[16px] text-white text-center text-sm tracking-[1.25px]">
          <button type="submit">NEXT</button>
        </div>
        </div>
      </div>
    </form>
  );
}

export default PersonalInformation;
