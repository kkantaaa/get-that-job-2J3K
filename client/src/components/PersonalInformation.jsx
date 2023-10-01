import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "@/contexts/registerContexts";
import { useEffect } from "react";
import { useAuth } from "@/contexts/authentication";
import ArrowRight from "../images/registration-page/arrow-right.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function PersonalInformation() {
  const { userData, setUserData } = useGlobalContext();
  const {UserRegister} = useAuth();
  const navigate = useNavigate();
  const { handleSubmit, control } = useForm();

  useEffect(() => {
    console.log("Updated userData:", userData);
  }, [userData]);

  const handlerSkip = async (event) => {
    event.preventDefault();
    try {
      await UserRegister(userData);
      window.alert("Registration Complete: Your registration has been successful.");
      navigate("/user/login");
    } catch (error) {
      console.error("Error during registration", error);
    }
  };

  const onSubmit = async (data) => {
    const { name, phone, birthdate, linkedin } = data;
    const validations = [];
    //cases
    if (name) {
      const checkNameValid = name;
      validations.push({
        condition: /[^A-Za-z]/.test(checkNameValid),
        errorMessage: "Name contains non-alphabet characters.",
      });
    }
    if (phone) {
      const checkPhoneStartsWithPlus = phone.startsWith("+");
      const checkPhoneStandardLength = /^(\+\d{1,3})?\d{10}$/g.test(phone);
      validations.push(
        {
          condition: !checkPhoneStartsWithPlus,
          errorMessage: "Phone number must start with a plus sign (+).",
        },
        {
          condition: !checkPhoneStandardLength,
          errorMessage:
            "Phone number must have a standard length including the country code.",
        }
      );
    }
    if (linkedin) {
      const checkLinkedinStartsWithUrl = linkedin.startsWith(
        "https://www.linkedin.com/in/"
      );
      validations.push({
        condition: !checkLinkedinStartsWithUrl,
        errorMessage: "LinkedIn must start with the LinkedIn URL.",
      });
    }
    if (birthdate) {
      const birthdateDate = new Date(birthdate);
      const now = new Date();
      if (birthdateDate > now) {
        validations.push({
          condition: true,
          errorMessage: "Birthdate cannot be in the future.",
        });
      }
    }
    //checking
    const hasErrors = validations.some((validation) => validation.condition);
    if (hasErrors) {
      validations
        .filter((validation) => validation.condition)
        .forEach((validation) => {
          toast.error(validation.errorMessage);
        });
    } else {
      setUserData({ ...userData, name, phone, birthdate, linkedin });
      try {
        await setUserData({
          ...userData,
          name,
          phone,
          birthdate,
          linkedin,
        });
        navigate("/user/register3");
      } catch (error) {
        console.error("Error during registration", error);
      }
    }
  };

  return (
    <>
    <ToastContainer />
    <form className="font-Inter" onSubmit={handleSubmit(onSubmit)}>
      <div className="input-container">
        <p className="text-[10px] font-normal tracking-[1.5px] uppercase">
          You can complete this information later
        </p>
        <p className="mb-[8px] text-[10px] font-normal tracking-[1.5px] uppercase">
          but we reccomend you to do it now
        </p>

        {/* Form Part 2 */}
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
            // rules={{ required: "Name is required" }}
            render={({ field }) => (
              <input
                className="mb-[16px] flex w-[360px] h-[36px] 
                rounded-md border border-Pink  bg-background p-[8px] 
                ring-offset-background placeholder:text-muted-foreground"
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
            name="phone"
            control={control}
            defaultValue=""
            // rules={{ required: "Phone number is required" }}
            render={({ field }) => (
              <input
                className="mb-[16px] flex w-[360px] h-[36px] rounded-md 
                border border-Pink bg-background p-[8px] ring-offset-background 
                placeholder:text-muted-foreground"
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
            // rules={{ required: "Birthdate is required" }}
            render={({ field }) => (
              <input
                className="mb-[16px] flex w-[360px] h-[36px] rounded-md border border-Pink  
                bg-background p-[8px] ring-offset-background placeholder:text-muted-foreground"
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
            name="linkedin"
            control={control}
            defaultValue=""
            // rules={{ required: "LinkedIn URL is required" }}
            render={({ field }) => (
              <input
                className="mb-[16px] flex w-[360px] h-[36px] rounded-md border border-Pink  bg-background p-[8px] ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                id="linkedin"
                name="linkedin"
                type="text"
                placeholder="https://www.linkedin.com/in/username"
                {...field}
              />
            )}
          />
        </div>

        <div className="flex flex-row">
          <div className="mr-[16px] w-[106px] h-[40px] px-[14px] py-[8px] border-2 active:bg-DarkPink hover:bg-LightPink border-Pink rounded-[16px] text-black text-center text-[14px] font-[500px] tracking-[1.25px]">
            <button onClick={handlerSkip}>SKIP THIS!</button>
          </div>

          {/* Next Button */}
          <div className="w-[106px] h-[40px] px-[16px] py-[8px] active:bg-DarkPink hover:bg-LightPink bg-Pink rounded-[16px] text-white text-center text-sm tracking-[1.25px]">
          <button className="flex flex-row" type="submit">
            <div className="ml-[10px]">NEXT</div>
            <img src={ArrowRight}/>
          </button>
          </div>
        </div>
      </div>
    </form>
    </>
  );
}

export default PersonalInformation;


