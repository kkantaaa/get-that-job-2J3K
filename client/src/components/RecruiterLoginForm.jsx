import { useAuth } from "@/contexts/authentication";
import { useForm, Controller } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";

export default function RecruiterLoginForm() {
  // const navigate = useNavigate();
  const { RecruiterLogin } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log("from login form");
    console.log(data);
    await RecruiterLogin(data);
    // navigate("/");
  };

  return (
    <div className="login_box">
      <div className="role">
        <button value="professional">
          <Link to="/user/login">PROFESSIONAL</Link>
        </button>
        <button value="recuiter">
          <Link to="/recruiter/login">RECRUITER</Link>
        </button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="email_input">
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

        <div className="password_input">
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

        <input type="submit" />
      </form>
    </div>
  );
}
