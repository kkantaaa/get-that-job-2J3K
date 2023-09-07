import RecruiterLoginForm from "@/components/RecruiterLoginForm";

function RecruiterLoginPage() {
  return (
    <div className="loginPage">
      <div className="login-container">
        <div className="nav"></div>
        <div className="loginForm">
          <div className="greeting">Welcome back</div>
          <div>Login to you account as...</div>
          <RecruiterLoginForm />
        </div>
      </div>
    </div>
  );
}

export default RecruiterLoginPage;
