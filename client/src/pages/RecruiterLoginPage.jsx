import LoginForm from "../components/LoginForm";

function RecruiterLoginPage() {
  return (
    <div className="loginPage">
      <div className="login-container">
        <div className="nav"></div>
        <div className="loginForm">
          <div className="greeting">Welcome back</div>
          <div>Login to you account as...</div>
          {/* ยังใช้ loginForm ของ user */}
          <LoginForm />
        </div>
      </div>
    </div>
  );
}

export default RecruiterLoginPage;
