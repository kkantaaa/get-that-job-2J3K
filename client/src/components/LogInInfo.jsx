import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LogInInfo() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");

  const register = async (data) => {
    await axios.post("ใส่ localhost ยังไม่ได้เซต", data)
  }

  const handlerSubmit = (event) => {
    event.preventDefault();
    register();
    //navigate("/ชื่อรูท")
  };

  return (
    <>
      <form className="login-info">
        <div className="input-container">
          <div className="email-input">
            <label>
              EMAIL
              <input
                id="email"
                name="email"
                type="email"
                placeholder="some.user@mail.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </label>
          </div>
          <div className="password-input">
            <label>
              PASSWORD
              <input
                id="password"
                name="password"
                type="password"
                placeholder="******"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </label>
          </div>
          <div className="confirmed-password-input">
            <label>
              PASSWORD CONFIRMATION
              <input
                id="confirmed-password"
                name="confirmed-password"
                type="password"
                placeholder="******"
                value={confirmedPassword}
                onChange={(event) => setConfirmedPassword(event.target.value)}
                required
              />
            </label>
          </div>
          <div className="next-button">
            <button onSubmit={handlerSubmit}>NEXT</button>
          </div>
        </div>
      </form>
    </>
  );
}

export default LogInInfo;
