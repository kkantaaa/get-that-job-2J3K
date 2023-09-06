import PersonalInformation  from '../components/PersonalInformation.jsx';
import happyGirl from "../images/landing-page/discussing.png";


function UserRegisterPage2() {
  return (
    <>
    <div className="bg-Background h-screen">
    <div className="fixed flex flex-col ml-[220px] mt-[96px] mr-[776px]">
      <h1 className="font-Montserrat text-[48px] font-light tracking-tighter leading-normal mb-[16px]"> Good choice!</h1>
      <p className="font-Montserrat text-[20px] leading-7 font-medium mb-[32px]" >Create a new account as...</p>
      <div className="flex flex-row">
        <div className="flex flex-col font-Inter">
        <h2 className="text-[14px] font-medium leading-5 tracking-[1.25px] mr-[12px]">PROFESSIONAL</h2>
        <div className="w-[115px] h-[2px] bg-Pink mt-[6px]"></div>
        </div>
        <div className="flex flex-col font-Inter text-LightGray">
        <h2 className="text-[14px] font-normal leading-5 tracking-[1.25px]">RECRUITER</h2>
        <div className="w-[80px] h-[2px] bg-LightGray mt-[6px]"></div>
        </div>
      </div>

      <div className="flex flex-row mb-[32px] font-Inter">
        <div className="flex flex-col mt-[32px] mr-[16px] text-LightGray">
          <p className="text-[10px] font-normal leading-normal tracking-[1.5px]">DONE!</p>
          <p className="text-[16px] font-normal tracking[0.5px] leading-[24px]">Login</p>
          <p className="text-[16px] font-normal tracking[0.5px] leading-[24px]">information</p>
        </div>
        <div className="flex flex-col mt-[32px] mr-[16px]">
          <p className="text-[10px] font-normal leading-normal tracking-[1.5px]">IN PROCESS</p>
          <p className="text-[16px] font-normal tracking[0.5px] leading-[24px]">Personal</p>
          <p className="text-[16px] font-normal tracking[0.5px] leading-[24px]">information</p>
        </div>
        <div className="flex flex-col mt-[32px] mr-[16px] text-LightGray">
          <p className="text-[10px] font-normal leading-normal tracking-[1.5px]">PENDING</p>
          <p className="text-[16px] font-normal tracking[0.5px] leading-[24px]">Professional</p>
          <p className="text-[16px] font-normal tracking[0.5px] leading-[24px]">information</p>
        </div>
      </div>
      <PersonalInformation />
    </div>
    <img className="fixed bottom-0 right-[120px] object-cover" src={happyGirl} alt="image-of-young-girl"/>
    </div>
  </>
  )
}

export default UserRegisterPage2;