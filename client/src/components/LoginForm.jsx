import { useForm, Controller } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";

export default function LoginForm() {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = () => {
    navigate("/"); //user go to /user/findjob recruiter go to /recruiter/jobpost
  };
  const { register, handleSubmit } = useForm();
  const onSubmit = (event) => {
    event.preventDefault();

  };
  //ยังไม่ได้เขียน function หลัง submit ให้กดแล้วไป fetch data login จากไหน

  return (
    <><div className="login_box">
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
                  {...field} />
              )} />
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
                  {...field} />
              )} />
          </label>
          <span>{errors.password && errors.password.message}</span>
        </div>

        <input type="submit" />
      </form>
    </div><div>
        <label htmlFor="email">EMAIL</label>
        <input
          {...register("professional.email")}
          id="email"
          placeholder="some.user@mail.com"
          type="email"
          // eslint-disable-next-line no-undef
          onChange={(event) => email(event.target.value)} />
        <label htmlFor="password">PASSWORD</label>
        <input
          {...register("professtional.password")}
          id="password"
          placeholder="******"
          type="password"
          // eslint-disable-next-line no-undef
          onChange={(event) => password(event.target.value)} />
      </div><input type="submit" /></>
    </form>
  );
}
