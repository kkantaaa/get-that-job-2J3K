import { useAuth } from "@/contexts/authentication";
import { useForm, Controller } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";

export default function RecruiterLoginForm() {
  // const navigate = useNavigate();
  const { RecruiterLogin, errorState } = useAuth();
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
    <>
      <div className="font-Inter flex flex-col justify-between text-left text-[12px] h-2/3">
        <div className="text-[14px] text-LightGray w-fit ">
          <button className="mr-4 underline decoration-LightGray underline-offset-8">
            <Link to="/user/login">PROFESSIONAL</Link>
          </button>

          <button className="mr-4 underline text-DarkGray decoration-Pink underline-offset-8">
            <Link to="/recruiter/login">RECRUITER</Link>
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
                  className="h-[36px] rounded-[8px] text-[14px] pl-[8px] border-solid border-[1px] border-Pink bg-White"
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
                  className="h-[36px] rounded-[8px] text-[14px] pl-[8px] border-solid border-[1px] border-Pink bg-White"
                  id="password"
                  type="password"
                  placeholder="******"
                  {...field}
                />
              )}
            />
            <span>{errors.password && errors.password.message}</span>
            {errorState && (
              <h1 className="text-red-500">Error : {errorState}</h1>
            )}
          </div>
          <div className="text-right">
            <button
              className="w-[80px] h-[40px] px-[16px] py-[8px] bg-Pink rounded-[16px] text-[14px] text-White"
              type="submit"
            >
              LOGIN
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
