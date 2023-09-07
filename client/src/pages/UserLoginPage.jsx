import LoginForm from "../components/LoginForm";
import loginPhoto from "../images/login-page/loginphoto.png";
function UserLoginPage() {
  return (
    <div className="w-screen h-screen ">
      <div className="nav"></div>

      <div className="font-Montserrat text-DarkGray h-4/5 flex flex-row justify-evenly content-center">
        <div className="flex flex-col h-[359px] w-[359px] justify-between">
          <h3 className="text-Headline3 w-fit">Welcome back</h3>
          <h6 className="text-Headline6 w-fit">Login to you account as...</h6>
          <LoginForm />
        </div>

        <div className="w-[560px] h-[567px]">
          <img src={loginPhoto} />
        </div>
      </div>
    </div>
  );
}

export default UserLoginPage;
