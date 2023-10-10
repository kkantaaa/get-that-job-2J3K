import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/authentication";
import { useGlobalContext } from "@/contexts/registerContexts";
import { useEffect, useRef, useState } from "react";
import ArrowLeft from "../images/registration-page/arrow-left.svg";
import ArrowRight from "../images/registration-page/arrow-right.svg";
import FileInputIcon from "../images/registration-page/upload-line.svg";
import Modal from 'react-modal';
import ConfirmIcon from "../images/registration-page/confirmicon.png";

function ProfessionalInfo() {
  const navigate = useNavigate();
  const { userData } = useGlobalContext();
  const { UserRegister } = useAuth();
  const { handleSubmit, control, setValue } = useForm();
  const fileInputRef = useRef(null);
  const { upload } = useAuth();
  const [fileName, setFileName] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    console.log("Updated userData:", userData);
  }, [userData]);

  const handlerSkip = async (event) => {
    event.preventDefault();
    try {
      await UserRegister(userData);
      // window.alert("Registration Complete: Your registration has been successful.");
      setIsModalOpen(true);
      // navigate("/user/login");
    } catch (error) {
      console.error("Error during registration", error);
    }
  };

  const onSubmit = async (data) => {
    const cv = {
      fileType: "professional_cv",
      file: data.file,
    };

    let user_cv = await upload(cv);

    if (user_cv === undefined) {
      user_cv = null;
    }

    try {
      const { title, jobexp, education } = data;
      const fetchData = {
        ...userData,
        title,
        jobexp,
        education,
        user_cv: user_cv,
      };

      await UserRegister(fetchData);
      // window.alert("Registration Complete: Your registration has been successful.");
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error during registration", error);
    }
  };

  const handleFileButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFilePreview = (e) => {
    if (e.target.files.length > 0) {
      setValue("file", e.target.files[0]);
      setFileName(e.target.files[0].name);
    }
  };

  // eslint-disable-next-line react/prop-types
  function CustomModal({ isOpen, onRequestClose }) {
    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        contentLabel="Registration Successful"
        className="absolute flex flex-col items-center justify-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg font-Inter"
        overlayClassName="fixed inset-0 bg-black opacity-70"
      >
        <img className="w-8 h-8" src={ConfirmIcon}/>
        <h2 className="text-[24px] font-semibold mb-4 text-Pink">Registration Successful!</h2>
        <p className="text-[12px] font-normal text-Gray">You are all set to connect with various jobs and recruiters</p>
        <button className="mt-[8px] w-[120px] h-[40px] px-[16px] py-[8px] active:bg-DarkPink hover:bg-LightPink bg-Pink rounded-[16px] text-white text-center text-[12px] tracking-[1.25px]" 
        onClick={onRequestClose}>Let's Start!</button>
      </Modal>
    );
  }
  
  const handleCloseModal = ()=>{
    setIsModalOpen(false);
    navigate("/user/login");
  }

  return (
    <form className="font-Inter" onSubmit={handleSubmit(onSubmit)}>
      <div className="input-container">
        <p className="text-[10px] font-normal tracking-[1.5px] uppercase">
          You can complete this information later
        </p>
        <p className="mb-[8px] text-[10px] font-normal tracking-[1.5px] uppercase">
          but we recommend you to do it now
        </p>

        <div className="title-input">
          <label
            htmlFor="title"
            className="mb-[4px] text-[10px] font-normal tracking-[1.5px]"
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
                  className="flex w-[380px] h-[36px] rounded-md border border-Pink 
                  bg-background p-[8px] text-[14px] placeholder-text-muted-foreground 
                  placeholder-top-0"
                  id="title"
                  type="text"
                  placeholder="Example: Mechanical administrator"
                  {...field}
                />
              )}
            />
          </label>
        </div>

        <div className="job-exp-input">
          <label
            htmlFor="jobexp"
            className="mb-[4px] text-[10px] font-normal tracking-[1.5px]"
          >
            PROFESSIONAL EXPERIENCE
            <Controller
              name="jobexp"
              control={control}
              defaultValue=""
              rules={{ required: "Professional experience is required" }}
              render={({ field }) => (
                <textarea
                  maxLength={2000}
                  className="flex w-[600px] h-[76px] rounded-md border border-Pink 
                bg-background p-[8px] text-[14px] placeholder-text-muted-foreground 
                placeholder-top-0 pb-[50px]"
                  name="jobexp"
                  id="jobexp"
                  type="text"
                  placeholder="Worked 6 years in a bitcoin farm until I decided to change my life..."
                  {...field}
                />
              )}
            />
          </label>
        </div>
        <p className="mb-[16px] text-[10px] font-normal leading-[16px] tracking-[0.4px]">
          Between 300 and 2000 characters
        </p>

        <div className="education-input">
          <label
            htmlFor="education"
            className="mb-[4px] text-[10px] font-normal tracking-[1.5px]"
          >
            EDUCATION
            <Controller
              name="education"
              control={control}
              defaultValue=""
              rules={{ required: "Education is required" }}
              render={({ field }) => (
                <textarea
                  maxLength={2000}
                  className="flex w-[600px] h-[76px] rounded-md border border-Pink 
                  bg-background text-lg p-[8px] text-[14px] placeholder-text-muted-foreground 
                  placeholder-top-0 pb-[50px]"
                  name="education"
                  id="education"
                  type="text"
                  placeholder="Major in life experiences with a PHD in procrastination"
                  {...field}
                />
              )}
            />
          </label>
        </div>

        <p className="mb-[16px] text-[10px] font-normal leading-[16px] tracking-[0.4px]">
          Between 100 and 2000 characters
        </p>

        {/* Upload File */}
        <div className="file-upload-container">
          <p className="text-[10px] font-normal leading-normal tracking-[1.5px] uppercase">
            UPLOAD / UPDATE YOUR CV
          </p>

          <div
            onClick={handleFileButtonClick}
            className="p-2 active:bg-DarkPink hover:bg-LightPink flex items-center rounded-[8px] bg-Pink text-white w-[134px] h-[36px] cursor-pointer"
          >
            <img src={FileInputIcon} alt="File Input" />
            <p className="ml-[8px] text-[14px] font-normal leading-normal tracking-[0.25px] cursor-pointer">
              Choose a file
            </p>
            <input
              ref={fileInputRef}
              className="hidden"
              name="havefile"
              type="file"
              id="havefile"
              accept=".pdf"
              onChange={handleFilePreview}
            />
          </div>
        </div>

        <div className="mt-[4px] mr-[4px] text-[14px] font-bold text-Pink tracking-[0.25px]">
          {fileName}
        </div>

        <p className="text-[10px] font-normal text-LightGray leading-[16px] tracking-[0.4px] uppercase">
          Only .PDF Max size 5MB
        </p>

        <div className="mt-[16px] flex flex-row">
          {/* Previous Button */}
          <div className="mr-[16px] w-[140px] h-[40px] px-[16px] py-[8px] active:bg-DarkPink hover:bg-LightPink bg-Pink rounded-[16px] text-white text-center text-sm tracking-[1.25px]">
            <button
              onClick={() => navigate("/user/register2")}
              className="flex flex-row"
              type="button"
            >
              <img src={ArrowLeft} alt="Previous" />
              <div className="ml-[4px]">PREVIOUS</div>
            </button>
          </div>

          {/* Skip Button */}
          <div className="text-[14px] mr-[16px] w-[120px] h-[40px] px-[16px] py-[8px] active:bg-DarkPink border-2 border-Pink rounded-[16px] text-black font-[500px] text-center tracking-[1.25px]">
            <button onClick={handlerSkip} type="button">
              SKIP THIS!
            </button>
            <CustomModal isOpen={isModalOpen} onRequestClose={handleCloseModal}/>
          </div>

          {/* Finish Button */}
          <div className="w-[120px] h-[40px] px-[16px] py-[8px] active:bg-DarkPink hover:bg-LightPink bg-Pink rounded-[16px] text-white text-center text-sm tracking-[1.25px]">
            <button
              className="flex flex-row"
              type="submit"
              onClick={handleSubmit(onSubmit)}
            >
              <div className="ml-[10px]">FINISH</div>
              <img src={ArrowRight} alt="Finish" />
            </button>
            <CustomModal isOpen={isModalOpen} onRequestClose={handleCloseModal}/>
          </div>
        </div>
      </div>
    </form>
  );
}

export default ProfessionalInfo;
