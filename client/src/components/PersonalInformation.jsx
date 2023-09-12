import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "@/contexts/registerContexts";
import { useEffect } from "react";
import { useAuth } from "@/contexts/authentication";

function PersonalInformation() {
  const { userData, setUserData } = useGlobalContext();
  const { UserRegister } = useAuth();
  const navigate = useNavigate();
  const { handleSubmit, control } = useForm();

  useEffect(() => {
    console.log("Updated userData:", userData);
  }, [userData]);

  const handlerSkip = async (event) => {
    event.preventDefault();
    try {
      await UserRegister(userData);
      navigate("/path to job listing");
    } catch (error) {
      console.error("Error during registration", error);
    }
  };

  const onSubmit = async (data) => {
    const { name, phone, birthdate, linkedin } = data;
    setUserData({
      ...userData,
      name,
      phone,
      birthdate,
      linkedin,
    });

    try {
      await UserRegister({
        ...userData,
        name,
        phone,
        birthdate,
        linkedin,
      });
      navigate("/user/register3");
    } catch (error) {
      console.error("Error during registration", error);
    }
  };

  return (
    <form className="font-Inter" onSubmit={handleSubmit(onSubmit)}>
      <div className="input-container">
        <p className="text-[10px] font-normal tracking-[1.5px] uppercase">
          You can complete this information later
        </p>
        <p className="mb-[8px] text-[10px] font-normal tracking-[1.5px] uppercase">
          but we recommend you to do it now
        </p>
        <div className="flex flex-col">
          <label
            htmlFor="name"
            className="mb-[4px] text-[10px] font-normal tracking-[1.5px]"
          >
            NAME
          </label>
          <Controller
            name="name"
            control={control}
            defaultValue=""
            rules={{ required: "Name is required" }}
            render={({ field }) => (
              <input
                className="mb-[16px] flex w-[360px] h-[36px] rounded-md border border-Pink bg-background p-[8px] text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                id="name"
                name="name"
                type="text"
                placeholder="John Doe"
                {...field}
              />
            )}
          />
        </div>

        {/* Add your other form fields here */}
        
        <div className="flex flex-row">
          <div className="mr-[16px] w-[106px] h-[40px] px-[14px] py-[8px] border-2 border-Pink rounded-[16px] text-black text-center text-[14px] tracking-[1.25px]">
            <button onClick={handlerSkip}>SKIP THIS!</button>
          </div>
          <div className="w-[106px] h-[40px] px-[16px] py-[8px] bg-Pink rounded-[16px] text-white text-center text-sm tracking-[1.25px]">
            <button type="submit">NEXT</button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default PersonalInformation;

