import { useState } from "react";
import { useAuth } from "../contexts/authentication";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const { login, state } = useAuth();

  const handleSubmit = (event) => {
    event.preventDefault();
    login({
      email,
      password,
    });
  };

  return (
    <>
      <navbar />
      <div className="login-page-container">
        <div className="login-form-container">
          <form className="login-form" onSubmit={handleSubmit}>
            <h1>Welcome back</h1>
            <p>Login to your account as...</p>
            <div className="role-container">
              <button className="user-button">PROFESSIONAL</button>
              <button className="recruiter-button">RECRUITER</button>
            </div>
            <div className="input-container">
              <label>
                EMAIL
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="some.user@mail.com"
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                  value={email}
                />
              </label>
            </div>
            <div className="input-container">
              <label>
                PASSWORD
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="******"
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                  value={password}
                />
              </label>
            </div>
            {/* {state.error && (
              <h1 className="error-message">Error: {state.error}</h1>
            )} */}
            <div className="form-actions">
              <button className="login-button" type="submit">
                LOGIN
              </button>
            </div>
          </form>
        </div>
        {/* <img src=""/> */}
      </div>
    </>
  );
}

export default LoginPage;
