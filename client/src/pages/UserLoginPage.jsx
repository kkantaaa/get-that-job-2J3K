import LoginForm from "../components/LoginForm";

function UserLoginPage() {
  return (
    <div className="w-screen h-screen bg-red-200">
      <div className="nav"></div>

      <div className="flex justify-evenly">

        <div className="flex flex-col h-[359px] w-[359px] justify-between">
          <h3 className="text-5xl w-fit">Welcome back</h3>
          <h6 className="text-xl w-fit">Login to you account as...</h6>
          <LoginForm />
        </div>

        <div className="w-[560px]">
          <img src="https://i.kym-cdn.com/photos/images/original/000/011/268/560px-No_moar_dog_drawn.jpg" />
        </div>

      </div>
    </div>
  );
}

export default UserLoginPage;
