import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/authentication";
import { useGlobalContext } from "@/contexts/registerContexts";
import { useEffect } from "react";
<<<<<<< HEAD
import { useAuth } from "@/contexts/authentication";
=======
>>>>>>> a12ecf1 (fix PersonalInformation components)

function ProfessionalInfo() {
  const navigate = useNavigate();
<<<<<<< HEAD
  const { handleSubmit, control } = useForm();
=======
  const { userData, setUserData } = useGlobalContext();
  const {UserRegister} = useAuth();
  const { handleSubmit, control, setValue, watch } = useForm();

  useEffect(() => {
    console.log("Updated userData:", userData);
  }, [userData]);
>>>>>>> a12ecf1 (fix PersonalInformation components)

  const handlerSkip = async (event) => {
    event.preventDefault();
    try {
      await UserRegister(userData);
      navigate("/path to job listing");
    } catch (error){
      console.error("Error during registration", error);
    }
  };

  const onSubmit = async (data) => {
    const { title, jobExp, education, havefile} = data;
    setUserData({
      ...userData,
      title,
      jobExp,
      education,
      havefile,
    });

    try {
<<<<<<< HEAD
      await UserRegister({
        ...userData,
        name,
        phone,
        birthdate,
        linkedin,
      });
      navigate("/user/register3");
    } catch (error) {
      console.error('Error during registration', error);
      // You can provide user feedback here, e.g., show an error message.
=======
      await UserRegister(userData, data);
      navigate("/path to job listing");
    } catch (error){
      console.error("Error during registration", error);
>>>>>>> a12ecf1 (fix PersonalInformation components)
    }
  };

  return (
    <form className="font-Inter" onSubmit={handleSubmit(onSubmit)}>
      <div className="input-container">
        <p className="text-[10px] font-normal tracking-[1.5px] uppercase">
          You can complete this information later
        </p>
        <p className="mb-[8px] text-[10px] font-normal tracking-[1.5px] uppercase">
          but we reccomend you to do it now
        </p>
        <div className="title-input">
          <label
            htmlFor="title"
            className="mb-[4px] text-xs[10px] font-normal tracking-[1.5px]"
          >
            TITLE
            <Controller
              name="title"
              control={control}
              defaultValue=""
              rules={{ required: "Title is required" }}
              render={({ field }) => (
                <input
                  name="title"
                  className="mb-[16px] flex w-[360px] h-[36px] rounded-md border border-Pink  bg-background p-[8px] text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  id="title"
                  type="text"
                  placeholder="Example: Mechanical administrator"
                  {...field}
                />
              )}
            />
          </label>
          <Controller
            name="name"
            control={control}
            defaultValue=""
            rules={{ required: 'Name is required' }}
            render={({ field }) => (
              <input
                {...field}
                className="mb-[16px] flex w-[360px] h-[36px] rounded-md border border-Pink bg-background p-[8px] text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                id="name"
                type="text"
                placeholder="John Doe"
              />
            )}
          />
        </div>

        {/* Add similar sections for other input fields (phone, birthdate, linkedin) here */}
        <div className="flex flex-col">
          {/* Add your other form fields here */}
        </div>

        <div className="file-list-preview-container">
          {watch("file") && (
            <div className="file-preview-container">
              <p>{watch("file").name}</p>
              <button
                className="file-remove-button"
                onClick={() => setValue("file", null)}
              >
                x
              </button>
            </div>
          )}
        </div>
        <div className="mt-[16px] flex flex-row">
          <div className="mr-[16px] w-[106px] h-[40px] px-[16px] py-[8px] bg-Pink rounded-[16px] text-white text-center text-sm tracking-[1.25px]">
            <button onClick={() => navigate("/user/register2")}>
              PREVIOUS
            </button>
          </div>

          <div className="text-[13px] mr-[16px] w-[106px] h-[40px] px-[16px] py-[8px] border-2 border-Pink rounded-[16px] text-black text-center tracking-[1.25px]">
            <button onClick={handlerSkip}>
              SKIP THIS!
            </button>
          </div>

          <div className="w-[106px] h-[40px] px-[16px] py-[8px] bg-Pink rounded-[16px] text-white text-center text-sm tracking-[1.25px]">
            <button type="submit">NEXT</button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default ProfessionalInfo;

