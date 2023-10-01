import RecruitCompanyInfo from "@/components/RecruitCompanyInfo.jsx"
import happyGirl from "../images/landing-page/discussing.png";
import NavBar from "@/components/NavBar";
import StepOne from "../images/registration-page/step-one-dark.svg";
import StepTwo from "../images/registration-page/step-two-pink.svg";
import { useNavigate } from "react-router-dom";


function RecruitRegisterPage2() {
  const navigate = useNavigate();
  const handleProfessionalClick = ()=>{
    navigate("/user/register1");
  }
  return (
    <>
      <div className="bg-Background min-h-screen flex flex-col">
        <NavBar />
        <div className="flex flex-col ml-[220px] mt-[100px] mr-[776px]">
          <h1 className="font-Montserrat text-[48px] font-light tracking-tighter leading-normal mb-[16px]">
            Good choice!
          </h1>
          <p className="font-Montserrat text-[20px] leading-7 font-medium mb-[32px]">
            Create a new account as...
          </p>
          <div className="flex flex-row">
            <div className="flex flex-col font-Inter text-light-gray">
              <h2 className="text-[14px] font-medium leading-5 tracking-[1.25px] mr-[12px]"
              onClick={handleProfessionalClick}
              style={{cursor: "pointer"}}>
                PROFESSIONAL
              </h2>
              <div className="w-[115px] h-[2px] bg-LightGray mt-[6px]"></div>
            </div>
            <div className="flex flex-col font-Inter">
              <h2 className="text-[14px] font-normal leading-5 tracking-[1.25px]">
                RECRUITER
              </h2>
              <div className="w-[80px] h-[2px] bg-Pink mt-[6px]"></div>
            </div>
          </div>

          {/* Registration Steps Part 2 */}
          <div className="flex flex-row mb-[32px] font-Inter">
            {/* Step 1 */}
            <div className="flex flex-row mt-[32px] mr-[16px] items-center">
              <img className="w-[32px] h-[32px]" src={StepOne} alt="Step One" />
              <div className="flex flex-col ml-[8px]">
                <p className="text-[10px] font-normal leading-normal tracking-[1.5px]">
                  DONE!
                </p>
                <p className="text-[16px] font-normal tracking-[0.5px] leading-[24px]">
                  Login
                </p>
                <p className="text-[16px] font-normal tracking-[0.5px] leading-[24px]">
                  information
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex flex-row mt-[32px] mr-[16px] items-center">
              <img className="w-[32px] h-[32px]" src={StepTwo} alt="Step Two" />
              <div className="flex flex-col ml-[8px]">
                <p className="text-[10px] font-normal leading-normal tracking-[1.5px]">
                  IN PROGRESS
                </p>
                <p className="text-[16px] font-normal tracking-[0.5px] leading-[24px]">
                  Company
                </p>
                <p className="text-[16px] font-normal tracking-[0.5px] leading-[24px]">
                  information
                </p>
              </div>
            </div>
          </div>

          <RecruitCompanyInfo />
        </div>
        <img
          className="fixed bottom-0 right-[120px] object-cover"
          src={happyGirl}
          alt="image-of-young-girl"
        />
      </div>
    </>
  );
}

export default RecruitRegisterPage2;