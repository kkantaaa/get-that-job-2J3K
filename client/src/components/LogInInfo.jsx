import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/authentication.jsx";

function LogInInfo() {
  const navigate = useNavigate();
  const { handleSubmit, control, setError, formState: { errors } } = useForm();
  const {userRegister} = useAuth();

  const onSubmit = async (data) => {
    if (data.confirmedPassword !== data.password) {
      setError("confirmedPassword", { type: "manual", message: "The confirmed Password is not matched" });
    } else {
      try {
        await userRegister(data);
        navigate("/user/register2");
      } catch (error) {
        console.error("Error during registration", error)
      }
    }
  };

  return (
    <form className="login-info" onSubmit={handleSubmit(onSubmit)}>
      <div className="input-container">
        <div className="email-input">
          <label htmlFor="email">
            EMAIL
            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{ required: "Email is required" }}
              render={({ field }) => (
                <input
                  id="email"
                  type="email"
                  placeholder="some.user@mail.com"
                  {...field}
                />
              )}
            />
          </label>
          <span>{errors.email && errors.email.message}</span>
        </div>

        <div className="password-input">
          <label htmlFor="password">
            PASSWORD
            <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={{ required: "Password is required" }}
              render={({ field }) => (
                <input
                  id="password"
                  type="password"
                  placeholder="******"
                  {...field}
                />
              )}
            />
          </label>
          <span>{errors.password && errors.password.message}</span>
        </div>

        <div className="confirmed-password-input">
          <label htmlFor="confirmed-password">
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
                  id="confirmed-password"
                  type="password"
                  placeholder="******"
                  {...field}
                />
              )}
            />
          </label>
          <span>{errors.confirmedPassword && errors.confirmedPassword.message}</span>
        </div>

        <div className="next-button">
          <button type="submit">NEXT</button>
        </div>
      </div>
    </form>
  );
}

export default LogInInfo;

