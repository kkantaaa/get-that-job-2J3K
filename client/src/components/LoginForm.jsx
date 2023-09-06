import { useForm, Controller } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";

export default function LoginForm() {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
<<<<<<< HEAD
  const onSubmit = () => {
    console.log(control._fields.email._f.value); //not yet assign path to next page
  };
 
  return (
    <>
    <div className="font-Inter flex flex-col justify-between text-left text-[12px] h-2/3">
      <div className="text-[14px] text-LightGray w-fit ">
        <button className="mr-4 underline text-DarkGray decoration-Pink underline-offset-8">
          <Link to="/user/login">PROFESSIONAL</Link>
        </button>

        <button className="mr-4 underline decoration-LightGray underline-offset-8">
=======

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
>>>>>>> 3919f0f (feat: add recruit regis form layout styling)
          <Link to="/recruiter/login">RECRUITER</Link>

        </button>
      </div>
<<<<<<< HEAD


      <form className="h-5/6 flex flex-col justify-between" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col ">
          <label className="w-fit text-[10px]" htmlFor="email">
            EMAIL
          </label>
          <label>
=======
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="email_input">
          <label htmlFor="email">EMAIL</label>
>>>>>>> 3919f0f (feat: add recruit regis form layout styling)
          <Controller
            name="email"
            control={control}
            defaultValue=""
<<<<<<< HEAD
            rules={{
              required: "The email address you entered isn't connected to an account.",
            }}
            render={({ field }) => (
              <input
                className="h-[36px] rounded-[8px] text-[14px] pl-[8px] border-solid border-[1px] border-Pink bg-White"
                id="email"
                type="email"
                placeholder="some.user@mail.com"
                {...field} />
            )} />
        </label>
        <span>{errors.email && errors.email.message}</span>
      </div>
      <div className="flex flex-col">
        <label className="w-fit text-[10px]" htmlFor="password">
          PASSWORD
        </label>
        <Controller
          name="password"
          control={control}
          defaultValue=""
          rules={{
            required: "The password that you've entered is incorrect.",
          }}
          render={({ field }) => (
            <input
              className="h-[36px] rounded-[8px] text-[14px] pl-[8px] border-solid border-[1px] border-Pink bg-White"
              id="password"
              type="password"
              placeholder="******"
              {...field} />
          )} />
        <span>{errors.password && errors.password.message}</span>
      </div><
        div className="text-right">
        <button className="w-[80px] h-[40px] px-[16px] py-[8px] bg-Pink rounded-[16px] text-[14px] text-White" type="submit">
          LOGIN
        </button>
      </div>
        </form>
    </div>
    </>
=======
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
>>>>>>> 3919f0f (feat: add recruit regis form layout styling)
  );
}
