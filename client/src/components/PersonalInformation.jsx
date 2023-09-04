import { useState } from "react";
<<<<<<< HEAD
import { useNavigate } from "react-router-dom";

function PersonalInformation() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [linkedInUrl, setLinkedInUrl] = useState("");

  const handlerSkip = (event) =>{
    event.preventDefault();
    navigate("/path หน้า job listing")
  };
  
  const handlerSubmit = (event) => {
    event.preventDefault();
    const data = {
      name,
      phoneNumber,
      birthdate,
      linkedInUrl,
    };
    navigate("/user/register3");
  };

  return (
    <>
      <form className="personal-info">
        <div className="input-container">
          <div className="name-input">
            <label htmlFor="name">
              NAME
              <input
                id="name"
                name="name"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
              />
            </label>
          </div>
          <div className="phone-input">
            <label>
              PHONE
              <input
                id="phone"
                name="phone"
                type="text"
                placeholder="+XXXXXXXX"
                value={phoneNumber}
                onChange={(event) => setPhoneNumber(event.target.value)}
                required
              />
            </label>
          </div>
          <div className="birthdate-input">
            <label>
              BIRTHDATE
              <input
                id="birthdate"
                name="birthdate"
                type="date"
                placeholder="pick a date"
                value={birthdate}
                onChange={(event) => setBirthdate(event.target.value)}
                required
              />
            </label>
          </div>
          <div className="linkedin-input">
            <label>
              LINKEDIN URL
              <input
                id="linkedin"
                name="linkedin"
                type="text"
                placeholder="https://www.linkedin.com/in/username"
                value={linkedInUrl}
                onChange={(event) => setLinkedInUrl(event.target.value)}
                required
              />
            </label>
          </div>
          <div className="skip-button">
            <button onClick={handlerSkip}>SKIP THIS!</button>
          </div>
          <div className="next-button">
            <button onClick={handlerSubmit}>NEXT</button>
          </div>
        </div>
      </form>
    </>
  );
}

export default PersonalInformation;
=======


export function PersonalInformation() {
  return (
    <div>PersonalInformation</div>
  )
};
>>>>>>> sub-main
