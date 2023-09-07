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
    // Remove unnecessary console.log
    if (data.confirmedPassword !== data.password) {
      setError("confirmedPassword", {
        type: "manual",
        message: "The confirmed Password does not match",
      });
    } else {
      try {
        // Call UserRegister function (assuming it's defined elsewhere)
        await UserRegister(data);

        // Update userData after successful registration
        await setUserData({
          email: data.email,
          password: data.password,
        });

        // Remove duplicate console.log
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
                  className="input-field"
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

