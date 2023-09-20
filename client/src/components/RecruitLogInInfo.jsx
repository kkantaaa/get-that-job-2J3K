import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "@/contexts/registerContexts";
import { useEffect } from "react";
import ArrowRight from "../images/registration-page/arrow-right.svg";

function RecruitLogInInfo() {
  const navigate = useNavigate();
  const { recruiterData, setRecruiterData } = useGlobalContext();
  const {
    handleSubmit,
    control,
    setError, // <- เพิ่ม function setError from useForm
    formState: { errors },
  } = useForm();

  useEffect(() => {
    console.log("Updated recruiterData:", recruiterData);
  }, [recruiterData]);

  const onSubmit = (data) => {
    // compare password and confirmed password
    console.log(data);
    if (data.companypassword !== data.confirmedPassword) {
    // set an error if they don't match 
    setError("confirmedPassword", {
      type: "manual",
      message: "The confirmed password does not match"
    });
    } else {
    setRecruiterData({
      company_name: data.companyname,
      email: data.companyemail,
      password: data.companypassword,
    });

    navigate("/recruiter/register2");
    }
  }

  return (
    <form className="font-Inter" onSubmit={handleSubmit(onSubmit)}>
      <div className="input-container">
        <div className="company-name-input">
          <label
            htmlFor="company-name"
            className="mb-[4px] text-[10px] font-normal tracking-[1.5px]"
          >
            COMPANY NAME
            <Controller
              name="companyname"
              control={control}
              defaultValue=""
              rules={{ required: "Company name is required" }}
              render={({ field }) => (
                <input
                  className="mb-[16px] flex w-[360px] h-[36px] rounded-md border border-Pink  bg-background p-[8px] text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  name="companyname"
                  id="companyname"
                  type="text"
                  placeholder="My Company S.A"
                  {...field}
                />
              )}
            />
          </label>
          <div className="text-red-500 text-[10px] uppercase">
            {errors.companyname && errors.companyname.message}
          </div>
        </div>

        <div className="email-input">
          <label
            htmlFor="email"
            className="mb-[4px] text-[10px] font-normal tracking-[1.5px]"
          >
            EMAIL
            <Controller
              name="companyemail"
              control={control}
              defaultValue=""
              rules={{ required: "Email is required" }}
              render={({ field }) => (
                <input
                  className="mb-[16px] flex w-[360px] h-[36px] rounded-md border border-Pink  bg-background p-[8px] text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  id="companyemail"
                  name="companyemail"
                  type="email"
                  placeholder="some.user@mail.com"
                  {...field}
                />
              )}
            />
          </label>
          <div className="text-red-500 text-[10px] uppercase">
            {errors.companyemail && errors.companyemail.message}
          </div>
        </div>

        <div className="password-input">
          <label
            htmlFor="password"
            className="mb-[4px] text-[10px] font-normal tracking-[1.5px]"
          >
            PASSWORD
            <Controller
              name="companypassword"
              control={control}
              defaultValue=""
              rules={{ required: "Password is required" }}
              render={({ field }) => (
                <input
                  className="mb-[16px] flex w-[360px] h-[36px] rounded-md border border-Pink  bg-background p-[8px] text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  id="companypassword"
                  name="companypassword"
                  type="password"
                  placeholder="******"
                  {...field}
                />
              )}
            />
          </label>
          <div className="text-red-500 text-[10px] uppercase">
            {errors.companypassword && errors.companypassword.message}
          </div>
        </div>

        <div className="confirmed-password-input">
          <label
            htmlFor="confirmed-password"
            className="mb-[4px] text-[10px] font-normal tracking-[1.5px]"
          >
            PASSWORD CONFIRMATION
            <Controller
              name="confirmedPassword"
              control={control}
              defaultValue=""
              rules={{
                required: "Password confirmation is required",
              }}
              render={({ field }) => (
                <input
                  className="mb-[16px] flex w-[360px] h-[36px] rounded-md border border-Pink  bg-background p-[8px] text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  id="confirmed-password"
                  type="password"
                  placeholder="******"
                  {...field}
                />
              )}
            />
          </label>
          <div className="text-red-500 text-[10px] uppercase">
            {errors.confirmedPassword && errors.confirmedPassword.message}
          </div>
        </div>

        <div className="ml-[127px] w-[106px] h-[40px] px-[16px] py-[8px] active:bg-DarkPink hover:bg-LightPink bg-Pink rounded-[16px] text-white leading-[24px] font-[500px] text-[14px] tracking-[1.25px]">
          <button className="flex flex-row" type="submit">
            <div className="ml-[10px]">NEXT</div>
            <img src={ArrowRight} />
          </button>
        </div>
      </div>
    </form>
  );
}

export default RecruitLogInInfo;
