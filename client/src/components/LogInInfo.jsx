import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/authentication";

function LogInInfo() {
  const navigate = useNavigate();
  const { UserRegister } = useAuth();

  const {
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (data.confirmedPassword !== data.password) {
      setError("confirmedPassword", {
        type: "manual",
        message: "The confirmed Password is not matched",
      });
    } else {
      try {
        await UserRegister(data);
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
            <div className="mb-[4px] text-xs font-normal tracking-[1.5px]">
              EMAIL
            </div>
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
            <div className="mb-[4px] text-xs font-normal tracking-[1.5px]">
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
            <div className="mb-[4px] text-xs font-normal tracking-[1.5px]">
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
                  id="confirmed-password"
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
        <div className="ml-[127px] w-[106px] h-[40px] px-[16px] py-[8px] bg-Pink rounded-[16px] text-white text-center text-sm tracking-[1.25px]">
          <button type="submit">NEXT</button>
        </div>
      </div>
    </form>
  );
}

export default LogInInfo;
