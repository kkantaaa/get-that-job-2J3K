import navLogo1 from "@/images/landing-page/navLogo1.png";
import signupIcon from "@/images/landing-page/signupIcon.png";
import loginIcon from "@/images/landing-page/loginIcon.png";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function NavBar() {
  const navigate = useNavigate();

  const handleHomePage = () => {
    navigate("/");
  };

  return (
    <nav className="bg-White h-[64px] flex justify-center drop-shadow-nav fixed w-full top-0 overflow-hidden">
      <div className="w-full h-full mx-[8.333%] flex flex-row  justify-between items-center ">
        <img
          onClick={handleHomePage}
          src={navLogo1}
          className="w-[136px] h-[40px] cursor-pointer"
        />
        <div className=" w-[257px] h-[40px] flex  flex-row  justify-between">
          <Button variant="secondary" size="secondary" className="w-[129px] ">
            <Link
              to="/user/register1"
              className=" w-full flex flex-row justify-between"
            >
              <img src={signupIcon} className="w-[24px] h-[24px] " />
              <div className="font-Inter text-Button font-medium tracking-[1.25px] ">
                SIGN UP
              </div>
            </Link>
          </Button>
          <Button variant="secondary" size="secondary" className="w-[112px]">
            <div className=" w-full flex flex-row justify-between">
              <Link
                to="/user/login"
                className=" w-full flex flex-row justify-between"
              >
                <img src={loginIcon} className="w-[24px] h-[24px] " />
                <div className="font-Inter text-Button font-medium tracking-[1.25px] ">
                  LOGIN
                </div>
              </Link>
            </div>
          </Button>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
