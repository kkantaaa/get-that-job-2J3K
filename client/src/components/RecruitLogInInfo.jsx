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
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    console.log("Updated recruiterData:", recruiterData);
  }, [recruiterData]);

  const displayErrorMessage = (fieldName) =>
    errors[fieldName] && (
      <span className="text-red-500">{errors[fieldName].message}</span>
    );

  const onSubmit = (data) => {
    // Check if passwords match
    if (data.confirmedPassword !== data.companyPassword) {
      setError("confirmedPassword", {
        type: "manual",
        message: "The confirmed password does not match",
      });
    } else {
      // Clear the error if passwords match
      clearErrors("confirmedPassword");

      setRecruiterData({
        company_name: data.companyName,
        email: data.companyEmail,
        password: data.companyPassword,
      });

      navigate("/recruiter/register2");
    }
  };

  return (
    <form className="font-Inter text-sm" onSubmit={handleSubmit(onSubmit)}>
      <div className="input-container">
        {/* Company Name */}
        <div className="input-field">
          <label htmlFor="companyName" className="label">
            COMPANY NAME
            <Controller
              name="companyName"
              control={control}
              defaultValue=""
              rules={{ required: "Company name is required" }}
              render={({ field }) => (
                <input
                  className="input"
                  name="companyName"
                  id="companyName"
                  type="text"
                  placeholder="My Company S.A"
                  {...field}
                />
              )}
            />
          </label>
          {displayErrorMessage("companyName")}
        </div>

        {/* Email */}
        <div className="input-field">
          <label htmlFor="companyEmail" className="label">
            EMAIL
            <Controller
              name="companyEmail"
              control={control}
              defaultValue=""
              rules={{ required: "Email is required" }}
              render={({ field }) => (
                <input
                  className="input"
                  id="companyEmail"
                  name="companyEmail"
                  type="email"
                  placeholder="some.user@mail.com"
                  {...field}
                />
              )}
            />
          </label>
          {displayErrorMessage("companyEmail")}
        </div>

        {/* Password */}
        <div className="input-field">
          <label htmlFor="companyPassword" className="label">
            PASSWORD
            <Controller
              name="companyPassword"
              control={control}
              defaultValue=""
              rules={{ required: "Password is required" }}
              render={({ field }) => (
                <input
                  className="input"
                  id="companyPassword"
                  name="companyPassword"
                  type="password"
                  placeholder="******"
                  {...field}
                />
              )}
            />
          </label>
          {displayErrorMessage("companyPassword")}
        </div>

        {/* Confirmed Password */}
        <div className="input-field">
          <label htmlFor="confirmedPassword" className="label">
            PASSWORD CONFIRMATION
            <Controller
              name="confirmedPassword"
              control={control}
              defaultValue=""
              rules={{ required: "Password confirmation is required" }}
              render={({ field }) => (
                <input
                  className="input"
                  id="confirmedPassword"
                  type="password"
                  placeholder="******"
                  {...field}
                />
              )}
            />
          </label>
          {displayErrorMessage("confirmedPassword")}
        </div>

        {/* Submit Button */}
        <div className="submit-button">
          <button className="button" type="submit">
            <div className="button-text">NEXT</div>
            <img src={ArrowRight} alt="Next Arrow" />
          </button>
        </div>
      </div>
    </form>
  );
}

export default RecruitLogInInfo;
