import LogInInfo from "../components/LogInInfo.jsx";

function UserRegisterPage1() {
  return (
    <>
      <body className="bg-[#F5F5F6] h-screen w-screen">
      <div className="inut-container">
        <h1 className="text-8xl font-light tracking-tighter leading-normal"> Good choice!</h1>
        <p>Create a new account as...</p>
        <div className="user-type-container">
          <h2>PROFESSIONAL</h2>
          <h2>RECRUITER</h2>
        </div>
        <div className="steps-container">
          <div className="login-information">
            <p>IN PROGRESS</p>
            <p>Login</p>
            <p>information</p>
          </div>
          <div className="personal-information">
            <p>PENDING</p>
            <p>Personal</p>
            <p>information</p>
          </div>
          <div className="professional-information">
            <p>PENDING</p>
            <p>Professional</p>
            <p>information</p>
          </div>
        </div>
        <LogInInfo />
      </div>
      </body>
    </>
  );
}

export default UserRegisterPage1;
