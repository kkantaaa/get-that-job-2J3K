import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "@/contexts/registerContexts";
import { useEffect } from "react";

function LogInInfo() {
  const { userData, setUserData } = useGlobalContext();
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    // Log the updated userData after the state has been updated
    console.log("Updated userData:", userData);
  }, [userData]);

  const onSubmit = async (data) => {
    console.log({
      email: control._fields.email._f.value,
      password: control._fields.password._f.value,
    });

    if (data.confirmedPassword !== data.password) {
      setError("confirmedPassword", {
        type: "manual",
        message: "The confirmed Password is not matched",
      });
    } else {
      try {
        await setUserData({
          email: control._fields.email._f.value,
          password: control._fields.password._f.value,
        });
        console.log(data);
        navigate("/user/register2");
      } catch (error) {
        console.error("Error during registration", error);
      }
    }
  };

  return (
    <form className="font-Inter text-[10px]" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <div className="email-input">
          <label htmlFor="email">
            <div className="mb-[4px] font-normal tracking-[1.5px]">EMAIL</div>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{ required: "Email is required" }}
              render={({ field }) => (
                <input
                  className="mb-[16px] flex w-[360px] h-[36px] rounded-md border border-Pink bg-background p-[8px] text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  id="email"
                  type="email"
                  placeholder="some.user@mail.com"
                  {...field}
                  aria-describedby="email-error"
                />
              )}
            />
          </label>
          <span id="email-error" className="error-message">
            {errors.email && errors.email.message}
          </span>
        </div>

        <div className="password-input">
          <label htmlFor="password">
            <div className="mb-[4px] font-normal tracking-[1.5px]">
              PASSWORD
            </div>
            <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={{ required: "Password is required" }}
              render={({ field }) => (
                <input
                  className="mb-[16px] flex w-[360px] h-[36px] rounded-md border border-Pink bg-background p-[8px] text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  id="password"
                  type="password"
                  placeholder="******"
                  {...field}
                  aria-describedby="password-error"
                />
              )}
            />
          </label>
          <span id="password-error" className="error-message">
            {errors.password && errors.password.message}
          </span>
        </div>

        <div className="confirmed-password-input">
          <label htmlFor="confirmed-password">
            <div className="mb-[4px] font-normal tracking-[1.5px]">
              PASSWORD CONFIRMATION
            </div>
            <Controller
              name="confirmedPassword"
              control={control}
              defaultValue=""
              rules={{
                required: "Password confirmation is required",
              }}
              render={({ field }) => (
                <input
                  className="mb-[16px] flex w-[360px] h-[36px] rounded-md border border-Pink bg-background p-[8px] text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  id="confirmedpassword"
                  type="password"
                  placeholder="******"
                  {...field}
                  aria-describedby="confirmed-password-error"
                />
              )}
            />
          </label>
          <span id="confirmed-password-error" className="error-message">
            {errors.confirmedPassword && errors.confirmedPassword.message}
          </span>
        </div>
        <div className="ml-[127px] w-[106px] h-[40px] px-[16px] py-[8px] bg-Pink rounded-[16px] text-white leading-[24px] font-[500px] text-[14px] tracking-[1.25px]">
          <button onClick={() => navigate("/user/register2")} className="flex flex-row" type="submit">
            <div className="ml-[10px]">NEXT</div>
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
    </form>
  );
}

export default LogInInfo;
