import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function PersonalInformation() {
  const navigate = useNavigate();
  const { handleSubmit, control} = useForm();

  const handlerSkip = (event) => {
    event.preventDefault();
    navigate("/path หน้า job listing");
  };

  const onSubmit = (data) => {
    // Handle form submission here
    console.log(data);
    navigate("/user/register3");
  };

  return (
    <form className="personal-info" onSubmit={handleSubmit(onSubmit)}>
      <div className="input-container">
        <div className="name-input">
          <label htmlFor="name">NAME</label>
          <Controller
            name="name"
            control={control}
            defaultValue=""
            rules={{ required: "Name is required" }}
            render={({ field }) => (
              <input
                id="name"
                name="name"
                type="text"
                placeholder="John Doe"
                {...field}
              />
            )}
          />
        </div>

        <div className="phone-input">
          <label htmlFor="phone">PHONE</label>
          <Controller
            name="phoneNumber"
            control={control}
            defaultValue=""
            rules={{ required: "Phone number is required" }}
            render={({ field }) => (
              <input
                id="phone"
                name="phoneNumber"
                type="text"
                placeholder="+XXXXXXXX"
                {...field}
              />
            )}
          />
        </div>

        <div className="birthdate-input">
          <label htmlFor="birthdate">BIRTHDATE</label>
          <Controller
            name="birthdate"
            control={control}
            defaultValue=""
            rules={{ required: "Birthdate is required" }}
            render={({ field }) => (
              <input id="birthdate" name="birthdate" type="date" {...field} />
            )}
          />
        </div>

        <div className="linkedin-input">
          <label htmlFor="linkedin">LINKEDIN URL</label>
          <Controller
            name="linkedInUrl"
            control={control}
            defaultValue=""
            rules={{ required: "LinkedIn URL is required" }}
            render={({ field }) => (
              <input
                id="linkedin"
                name="linkedInUrl"
                type="text"
                placeholder="https://www.linkedin.com/in/username"
                {...field}
              />
            )}
          />
        </div>

        <div className="skip-button">
          <button onClick={handlerSkip}>SKIP THIS!</button>
        </div>
        <div className="next-button">
          <button type="submit">NEXT</button>
        </div>
      </div>
    </form>
  );
}

export default PersonalInformation;
