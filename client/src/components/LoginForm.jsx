import { useForm, Controller } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";

export default function LoginForm() {
<<<<<<< HEAD
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = () => {
    console.log(control._fields.email._f.value); //not yet assign path to next page
  };
=======
  const { register, handleSubmit } = useForm();
  const onSubmit = (event) => {
    event.preventDefault();

  };
  //ยังไม่ได้เขียน function หลัง submit ให้กดแล้วไป fetch data login จากไหน
>>>>>>> b2fe173 (fix: eslint)

  return (
    <>
      <div className="font-Inter flex flex-col justify-between text-left text-[12px] h-2/3">
        <div className="text-[14px] text-LightGray w-fit ">
          <button className="mr-4 underline text-DarkGray decoration-Pink underline-offset-8">
            <Link to="/user/login">PROFESSIONAL</Link>
          </button>

<<<<<<< HEAD
          <button className="mr-4 underline decoration-LightGray underline-offset-8">
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
            <label>
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
                  {...field}
                />
              )}
            />
            <span>{errors.password && errors.password.message}</span>
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
=======
      <div>
        <label htmlFor="email">EMAIL</label>
        <input
          {...register("professional.email")}
          id="email"
          placeholder="some.user@mail.com"
          type="email"
          // eslint-disable-next-line no-undef
          onChange={(event)=> email(event.target.value)}
        />
        <label htmlFor="password">PASSWORD</label>
        <input
          {...register("professtional.password")}
          id="password"
          placeholder="******"
          type="password"
          // eslint-disable-next-line no-undef
          onChange={(event)=> password(event.target.value)}
        />
      </div>
      <input type="submit" />
    </form>
>>>>>>> b2fe173 (fix: eslint)
  );
}
