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
    console.log(control._fields.email._f.value); //not yet assign path to next page
  };

  return (
    <div className="flex flex-col justify-between text-left text-[12px] h-2/3">
      <div className="text-[14px] w-fit ">
        <button className="mr-4 underline decoration-sky-500 underline-offset-8">
          <Link to="/user/login">PROFESSIONAL</Link>
        </button>
        <button className="mr-4 underline decoration-sky-500 underline-offset-8">
          <Link to="/recuiter/login">RECRUITER</Link>
        </button>
      </div>

      <form
        className="h-5/6 flex flex-col justify-between"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col ">
          <label className="w-fit text-[10px]" htmlFor="email">
            EMAIL
          </label>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            rules={{
              required:
                "The email address you entered isn't connected to an account.",
            }}
            render={({ field }) => (
              <input
                className="h-[36px] rounded-[8px] text-[14px] pl-[8px] border-solid border-[1px] border-sky-500"
                id="email"
                type="email"
                placeholder="some.user@mail.com"
                {...field}
              />
            )}
          />
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
                className="h-[36px] rounded-[8px] text-[14px] pl-[8px] border-solid border-[1px] border-sky-500"
                id="password"
                type="password"
                placeholder="******"
                {...field}
              />
            )}
          />
          <span>{errors.password && errors.password.message}</span>
        </div>
        <div className="text-right">
          <button
            className="w-[80px] h-[40px] px-[16px] py-[8px] bg-slate-50 rounded-[16px] text-[14px]"
            type="submit"
          >
            LOGIN
          </button>
        </div>
      </form>
    </div>
  );
}
