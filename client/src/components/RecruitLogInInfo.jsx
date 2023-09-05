import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function RecruitLogInInfo() {
  const navigate = useNavigate();
  const { handleSubmit, control, setError, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    if (data.confirmedPassword !== data.password) {
      setError("confirmedPassword", { type: "manual", message: "The confirmed Password is not matched" });
    } else {
      navigate("/รอใส่ path");
    }
  };

  return (
    <form className="login-info" onSubmit={handleSubmit(onSubmit)}>
      <div className="input-container">
      <div className="company-name-input">
          <label htmlFor="company-name">
            COMPANY NAME
            <Controller
              name="companyname"
              control={control}
              defaultValue=""
              rules={{ required: "Company name is required" }}
              render={({ field }) => (
                <input
                  id="companyname"
                  type="text"
                  placeholder="My Company S.A"
                  {...field}
                />
              )}
            />
          </label>
          <span>{errors.companyname && errors.companyname.message}</span>
        </div>

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

export default RecruitLogInInfo;
