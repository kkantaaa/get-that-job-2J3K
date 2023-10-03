import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useGlobalContext } from "@/contexts/registerContexts";
import { useAuth } from "@/contexts/authentication";
import ArrowLeft from "../images/registration-page/arrow-left.svg";
import ArrowRight from "../images/registration-page/arrow-right.svg";
import FileInputIcon from "../images/registration-page/upload-line.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from 'react-modal';
import ConfirmIcon from "../images/registration-page/confirmicon.png";

function RecruitCompanyInfo() {
  const navigate = useNavigate();
  const { recruiterData } = useGlobalContext();
  const { handleSubmit, control, setValue } = useForm();
  const { RecruiterRegister } = useAuth();
  const { upload } = useAuth();
  const fileInputRef = useRef(null);
  const [file, setFile] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // console.log("Updated RecruiterData:", recruiterData);
  }, []);

  const handlerSkip = async (event) => {
    event.preventDefault();
    try {
      await RecruiterRegister(recruiterData);
      // window.alert("Registration Complete: Your registration has been successful.");
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error during registration", error);
    }
  };

  //useeffect
  //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  //onsubmit
  const onSubmit = async (data) => {
    const img = {
      fileType: "companyLogo",
      file: data.file,
    };
    let company_logo = await upload(img);

    if (company_logo === undefined) {
      company_logo = null;
    }
    const companyWebsite = data.company_website.trim();
    if (!isValidWebsite(companyWebsite)) {
      toast.error("Invalid website format");
      return;
    }
    try {
      const fetchData = {
        ...recruiterData,
        company_website: data.company_website,
        about_company: data.about_company,
        company_logo: company_logo,
      };

      await RecruiterRegister(fetchData);
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
      const fileURL = URL.createObjectURL(e.target.files[0]);
      setFile(fileURL);
    }
  };

  //validation
  const isValidWebsite = (website) => {
    const websitePattern =
      /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-zA-Z0-9]+([-.][a-zA-Z0-9]+)*\.[a-zA-Z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
    // const thaiEnglishPattern = /^[a-zA-Z0-9ก-๏\s]+$/;
    const isWebsiteValid = websitePattern.test(website);
    // const isThaiEnglishValid = thaiEnglishPattern.test(website);
    return isWebsiteValid  
  };

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
        <p className="text-[12px] font-normal text-Gray">You are all set to connect with various potential talents.</p>
        <button className="mt-[8px] w-[120px] h-[40px] px-[16px] py-[8px] active:bg-DarkPink hover:bg-LightPink bg-Pink rounded-[16px] text-white text-center text-[12px] tracking-[1.25px]" 
        onClick={onRequestClose}>Let's Start!</button>
      </Modal>
    );
  }
  
  const handleCloseModal = ()=>{
    setIsModalOpen(false);
    navigate("/recruiter/login");
  }

  return (
    <>
      <ToastContainer
        theme="colored"
        closeOnClick
        autoClose={2500}
        position="bottom-center"
      />
      <form className="font-Inter" onSubmit={handleSubmit(onSubmit)}>
        <div className="input-container">
          <p className="text-[10px] font-normal tracking-[1.5px] uppercase">
            You can complete this information later
          </p>
          <p className="mb-[8px] text-[10px] font-normal tracking-[1.5px] uppercase">
            but we recommend you to do it now
          </p>
          <div className="company-website-input">
            <label
              htmlFor="company-website"
              className="mb-[4px] text-[10px] font-normal tracking-[1.5px]"
            >
              COMPANY WEBSITE
              <Controller
                name="company_website"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <input
                    maxLength={2000}
                    className="mb-[16px] flex w-[360px] h-[36px] rounded-md border 
                  border-Pink bg-background p-[8px] text-[14px]
                  placeholder:text-muted-foreground"
                  id="company_website"
                  name="company_website"
                  type="text"
                  placeholder="http://www.mycompany.sa"
                  {...field}
                />
              )}
            />
          </label>
        </div>

        <div className="about-company-input">
          <label
            htmlFor="about_company"
            className="mb-[4px] text-[10px] font-normal tracking-[1.5px]"
          >
            ABOUT COMPANY
            <Controller
              name="about_company"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <textarea
                  maxLength={2000}
                  className="flex w-[600px] h-[76px] rounded-md border border-Pink bg-background p-[8px] 
                  text-[14px] placeholder:text-muted-foreground pb-[50px]"
                  id="about_company"
                  name="about_company"
                  type="text"
                  placeholder="My Company SA has the vision to change the way how..."
                  {...field}
                />
              )}
            />
          </label>
        </div>
        <p className="text-[10px] font-normal leading-[16px] tracking-[0.4px]">
          Between 100 and 2000 characters
        </p>

        <p className="mt-[8px] uppercase text-DarkGray text-[10px] leading-normal tracking-[1.5px]">
          Upload the company logo
        </p>

        {/* button */}
        <div
          onClick={handleFileButtonClick}
          className="mt-[4px] p-2 active:bg-DarkPink hover:bg-LightPink flex items-center rounded-[8px] bg-Pink text-white w-[134px] h-[36px] cursor-pointer"
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
            accept=".jpg, .png, .jpeg, .gif"
            onChange={handleFilePreview}
          />
        </div>

        <div className="mt-[4px]">
          {file && (
            <img
              src={file}
              alt="Preview"
              className="mb-4"
              style={{ maxWidth: "200px" }}
            />
          )}
        </div>

        <p className="text-[10px] font-normal text-LightGray leading-[16px] tracking-[0.4px] uppercase">
          Only .jpg, .png, .jpeg, .gif Max size 5MB
        </p>

        <div className="mt-[16px] flex flex-row">
          <div className="mr-[16px] w-[140px] h-[40px] px-[16px] py-[8px] bg-Pink rounded-[16px] text-white text-center text-sm tracking-[1.25px]">
            <button
              onClick={() => navigate("/recruiter/register1")}
              className="flex flex-row"
              type="submit"
            >
              <img src={ArrowLeft} alt="Previous" />
              <div className="ml-[4px]">PREVIOUS</div>
            </button>
          </div>

          <div className="text-[14px] mr-[16px] w-[120px] h-[40px] px-[16px] py-[8px] border-2 active:bg-DarkPink hover:bg-LightPink border-Pink rounded-[16px] text-black font-[500px] text-center tracking-[1.25px]">
            <button onClick={handlerSkip}>SKIP THIS!</button>
            <CustomModal isOpen={isModalOpen} onRequestClose={handleCloseModal}/>
          </div>

            <div className="w-[120px] h-[40px] px-[16px] py-[8px] active:bg-DarkPink hover:bg-LightPink bg-Pink rounded-[16px] text-white text-center text-sm tracking-[1.25px]">
              <button
                className="flex flex-row"
                type="submit"
                onClick={handleSubmit}
              >
                <div className="ml-[10px]">FINISH</div>
                <img src={ArrowRight} alt="Next" />
              </button>
              <CustomModal isOpen={isModalOpen} onRequestClose={handleCloseModal}/>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default RecruitCompanyInfo;
