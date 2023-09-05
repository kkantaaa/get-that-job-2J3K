import { useForm } from "react-hook-form";

export default function LoginForm() {
  const { register, handleSubmit } = useForm();
  const onSubmit = (event) => {
    event.preventDefault();

  };
  //ยังไม่ได้เขียน function หลัง submit ให้กดแล้วไป fetch data login จากไหน

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <button value="professional">PROFESSIONAL</button>
        <button value="recuiter">RECRUITER</button>
      </div>

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
  );
}
