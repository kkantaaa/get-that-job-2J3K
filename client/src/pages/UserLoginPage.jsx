import LoginForm from "../components/LoginForm";
import loginPhoto from "../images/login-page/loginphoto.png";
import NavBar from "@/components/NavBar";
function UserLoginPage() {
  return (
    <div className="w-screen h-screen bg-background">
      <NavBar />
      <div className="flex flex-row justify-center content-center">
      <div className="font-Montserrat text-DarkGray h-fit w-fit mt-[150px] flex flex-row space-x-[100px]">
        <div className="flex flex-col h-[359px] w-fit justify-between">
          <h3 className="text-Headline3 w-fit">Welcome back</h3>
          <h6 className="text-Headline6 w-fit">Login to you account as...</h6>
          <LoginForm />
        </div>

        <div className="w-[560px] h-[567px] ">
          <img src={loginPhoto} />
        </div>
      </div>
      </div>
      
    </div>
  );
}

export default UserLoginPage;
