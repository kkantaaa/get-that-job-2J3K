import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
<<<<<<< HEAD
import { useGlobalContext } from "@/contexts/registerContexts";
import { useEffect } from "react";
=======
// import { useAuth } from "@/contexts/authentication";
>>>>>>> 093724e (feat: commit changes)

function LogInInfo() {
  const { userData, setUserData } = useGlobalContext();
  const navigate = useNavigate();
<<<<<<< HEAD
=======
  // const { UserRegister } = useAuth();
>>>>>>> 093724e (feat: commit changes)

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
    if (data.confirmedPassword !== data.password) {
      setError("confirmedPassword", {
        type: "manual",
        message: "The confirmed Password does not match",
      });
    } else {
      try {
<<<<<<< HEAD
        // Update userData after successful registration
        await setUserData({
          email: data.email,
          password: data.password,
        });

=======
        // await UserRegister(data);
        console.log(data)
>>>>>>> 093724e (feat: commit changes)
        navigate("/user/register2");
      } catch (error) {
        console.error("Error during registration", error);
      }
    }
  };

  return (
    <form className="font-Inter" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <div className="email-input">
          <label htmlFor="email">
            <div className="mb-2 text-xs font-normal tracking-[1.5px]">
              EMAIL
            </div>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{ required: "Email is required" }}
              render={({ field }) => (
                <input
                  className="input-field"
                  id="email"
                  type="email"
                  placeholder="some.user@mail.com"
                  {...field}
                  aria-describedby="email-error"
                />
              )}
            />
          </label>
          <span className="error-message" id="email-error">
            {errors.email && errors.email.message}
          </span>
        </div>

        <div className="password-input">
          <label htmlFor="password">
            <div className="mb-2 text-xs font-normal tracking-[1.5px]">
              PASSWORD
            </div>
            <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={{ required: "Password is required" }}
              render={({ field }) => (
                <input
                  className="input-field"
                  id="password"
                  type="password"
                  placeholder="******"
                  {...field}
                  aria-describedby="password-error"
                />
              )}
            />
          </label>
          <span className="error-message" id="password-error">
            {errors.password && errors.password.message}
          </span>
        </div>

        <div className="confirmed-password-input">
          <label htmlFor="confirmed-password">
            <div className="mb-2 text-xs font-normal tracking-[1.5px]">
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
          <span className="error-message" id="confirmed-password-error">
            {errors.confirmedPassword && errors.confirmedPassword.message}
          </span>
        </div>

        <div className="button-container">
          <button type="submit" className="submit-button">
            NEXT
          </button>
        </div>
      </div>
    </form>
  );
}

export default LogInInfo;


