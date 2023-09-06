import LogInInfo from "../components/LogInInfo.jsx";
// import girl from './src/assets/girl-model.svg';

function UserRegisterPage1() {
  return (
    <>
      <div className="flex flex-row">
      <div className="flex flex-col ml-[220px] mt-[96px] mr-[776px]">
        <h1 className="text-[48px] font-light tracking-tighter leading-normal mb-[16px]"> Good choice!</h1>
        <p className="text-[20px] leading-7 font-medium mb-[32px]" >Create a new account as...</p>
        <div className="flex flex-row">
          <div className="flex flex-col">
          <h2 className="text-[14px] font-medium leading-5 tracking-[1.25px] mr-[12px]">PROFESSIONAL</h2>
          <div className="w-[115px] h-[2px] bg-black mt-[6px]"></div>
          </div>
          <div className="flex flex-col">
          <h2 className="text-[14px] font-normal leading-5 tracking-[1.25px]">RECRUITER</h2>
          <div className="w-[80px] h-[2px] bg-black mt-[6px]"></div>
          </div>
        </div>

        <div className="flex flex-row mb-[32px]">
          <div className="flex flex-col mt-[32px] mr-[16px]">
            <p className="text-[10px] font-normal leading-normal tracking-[1.5px]">IN PROGRESS</p>
            <p className="text-[16px] font-normal tracking[0.5px] leading-[24px]">Login</p>
            <p className="text-[16px] font-normal tracking[0.5px] leading-[24px]">information</p>
          </div>
          <div className="flex flex-col mt-[32px] mr-[16px]">
            <p className="text-[10px] font-normal leading-normal tracking-[1.5px]">PENDING</p>
            <p className="text-[16px] font-normal tracking[0.5px] leading-[24px]">Personal</p>
            <p className="text-[16px] font-normal tracking[0.5px] leading-[24px]">information</p>
          </div>
          <div className="flex flex-col mt-[32px] mr-[16px]">
            <p className="text-[10px] font-normal leading-normal tracking-[1.5px]">PENDING</p>
            <p className="text-[16px] font-normal tracking[0.5px] leading-[24px]">Professional</p>
            <p className="text-[16px] font-normal tracking[0.5px] leading-[24px]">information</p>
          </div>
        </div>
        <LogInInfo />
      </div>
      <img src="client\src\assets\discussing.png" alt="image-of-young-girl"/>
      </div>
    </>
  );
}

export default UserRegisterPage1;
