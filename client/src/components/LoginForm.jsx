import { useForm, Controller } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";

export default function LoginForm() {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // Handle form submission here, e.g., make an API call
    console.log(data); // Replace with your API call logic
    navigate("/"); // Redirect after successful login
  };

  return (
    <div className="login_box">
      <div className="role">
        <button value="professional">
          <Link to="/user/login">PROFESSIONAL</Link>
        </button>
        <button value="recruiter">
          <Link to="/recruiter/login">RECRUITER</Link>
        </button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="email_input">
          <label htmlFor="email">EMAIL</label>
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
          <span>{errors.email && errors.email.message}</span>
        </div>

        <div className="password_input">
          <label htmlFor="password">PASSWORD</label>
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
          <span>{errors.password && errors.password.message}</span>
        </div>

        <input type="submit" value="Login" />
      </form>
    </div>
  );
}
