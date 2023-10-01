import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "@/contexts/registerContexts";
import { useEffect, useState } from "react";
import ArrowRight from "../images/registration-page/arrow-right.svg";
//
import axios from "axios";
//
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function RecruitLogInInfo() {
  const [emailExists, setEmailExists] = useState(false);
  const navigate = useNavigate();
  const { recruiterData, setRecruiterData } = useGlobalContext();
  const {
    handleSubmit,
    control,
    // setError, // <- เพิ่ม function setError from useForm
    formState: { errors },
  } = useForm();

  useEffect(() => {
    console.log("Updated recruiterData:", recruiterData);
  }, [recruiterData]);

  const onSubmit = async (data) => {
    const { companyname, companyemail, companypassword } = data;
    try {
      if (!companyname || /[^A-Za-z0-9\s\-_.]/.test(companyname)) {
        toast.error(
          "Company name should only contain letters, numbers, hyphens, underscores, periods, and should not be empty."
        );
        return;
      }
      if (
        !/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/.test(companyemail)
      ) {
        toast.error("Invalid email format");
        return;
      }
      if (emailExists === true) {
        toast.error("The email is already taken");
        return;
      }
      if (
        companypassword.length < 8 ||
        !/^[A-Za-z0-9!@#$%^&*()_+{}\[\]:;<>,.?~_-]+$/.test(companypassword)
      ) {
        toast.error(
          "Password must be at least 8 characters long and contain only normal password characters"
        );
        return;
      }
      if (data.confirmedPassword !== companypassword) {
        console.log(data.confirmedPassword);
        console.log(data.password);
        toast.error("Password and password confirmation do not match");
        return;
      }

      await setRecruiterData({
        company_name: data.companyname,
        email: data.companyemail,
        password: data.companypassword,
      });

      navigate("/recruiter/register2");
    } catch (error) {
      console.error("Error during registration", error);
      toast.error("Error during registration");
    }
  };

  const fetchRecruiterEmailFromDatabase = async (enteredEmail) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/regist/checkRecruiterDupEmail",
        { email: enteredEmail }
      );
      setEmailExists(response.data.exists);
    } catch (error) {
      console.error("Error during registration", error);
    }
  };
  return (
    <>
      <ToastContainer
        theme="colored"
        closeOnClick
        autoClose={2500}
        position="bottom-center"
      />
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
                    className="mb-[16px] flex w-[360px] h-[36px] rounded-md border border-Pink  
                  bg-background p-[8px] text-[14px] placeholder:text-muted-foreground"
                  name="companyname"
                  id="companyname"
                  type="text"
                  placeholder="My Company S.A"
                  {...field}
                />
              )}
            />
          </label>
          <div className="text-red-500 text-[10px] uppercase font-bold tracking-[0.25px]">
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
                  className="mb-[16px] flex w-[360px] h-[36px] rounded-md border border-Pink  
                  bg-background p-[8px] text-[14px] placeholder:text-muted-foreground"
                    id="companyemail"
                    name="companyemail"
                    type="email"
                    placeholder="some.user@mail.com"
                    {...field}
                    onChange={(e) => {
                      const enteredEmail = e.target.value;
                      fetchRecruiterEmailFromDatabase(enteredEmail);
                      field.onChange(e);
                    }}
                  />
                )}
              />
            </label>
            <div className="text-red-500 text-[10px] uppercase font-bold tracking-[0.25px]">
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
                  className="mb-[16px] flex w-[360px] h-[36px] rounded-md border border-Pink  
                  bg-background p-[8px] text-[14px] placeholder:text-muted-foreground"
                  id="companypassword"
                  name="companypassword"
                  type="password"
                  placeholder="******"
                  {...field}
                />
              )}
            />
          </label>
          <div className="text-red-500 text-[10px] uppercase font-bold tracking-[0.25px]">
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
                  className="mb-[16px] flex w-[360px] h-[36px] rounded-md border border-Pink  
                  bg-background p-[8px] text-[14px] placeholder:text-muted-foreground"
                  id="confirmed-password"
                  type="password"
                  placeholder="******"
                  {...field}
                />
              )}
            />
          </label>
          <div className="text-red-500 text-[10px] uppercase font-bold tracking-[0.25px]">
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
    </>
  );
}

export default RecruitLogInInfo;
