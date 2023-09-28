//function, methods and libraries
import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//images
import ChooseAFile from "@/images/ApllicationApplyPage/ChooseAFile.png";
import SendApplicationButton from "@/images/ApllicationApplyPage/SendApplicationButton.png";

//
function ApplicationApplySection(pagedata) {
  //form
  const { control, handleSubmit } = useForm();
  //states
  const [currentCV, setCurrentCV] = useState(null);
  const [showUploadButton, setShowUploadButton] = useState(false);
  const [professionalExperience, setProfessionalExperience] = useState("");
  const [interestedReason, setInterestedReason] = useState("");
  const [radioTicked, setRadioTicked] = useState(false);
  //navigation
  const navigate = useNavigate();
  //data destructuring
  const { userDetail, jobparams, companyname } = pagedata;
  // useeffect
  useEffect(() => {
    setProfessionalExperience(pagedata.userDetail.user_experience);
  }, [pagedata]);

  // event handler 1
  const handleCVChoiceChange = (data) => {
    setShowUploadButton(data === "uploadNew");
    setRadioTicked(true);
  };
  // event handler 2
  const onSubmit = async () => {
    if (!radioTicked) {
      toast.warning("โปรดเลือก CV ด้วยค่ะ");
      return;
    }
    if (!currentCV) {
      toast.error("โปรดตรวสอบ CV ด้วยค่ะ");
      return;
    }
    if (!interestedReason) {
      toast.error("โปรดกรอก interestedReason ด้วยค่ะ");
      return;
    }
    try {
      const user_idt = userDetail.user_id;
      console.log("user_idt", user_idt);
      const job_idt = jobparams;
      console.log("job_idt", job_idt);
      console.log("professionalExperience :", professionalExperience);
      const formData = { currentCV, interestedReason, professionalExperience };
      await axios.post(
        `http://localhost:4000/apply/${user_idt}/job-list/${job_idt}`,
        formData
      );
      console.log("Application sent successfully :", formData);
      setTimeout(() => {
        toast.success("ส่งใบสมัครเรียบร้อยแล้วค่ะ");
        navigate("/user/findthatjob");
      }, 3000);
    } catch (error) {
      console.error("Error sending application:", error);
    }
  };

  // return
  return (
    <>
      <ToastContainer theme="dark" autoClose={3000} limit={3} />
      <div style={{ marginLeft: "10px", marginTop: "20px" }}>
        <h1
          className="ml-5 "
          style={{
            fontSize: "32px",
            color: "#BF5F82",
            fontFamily: "Montserrat, sans-serif",
          }}
        >
          Complete your application
        </h1>
        {
          // CV choice section
        }
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label
              htmlFor="cvChoice"
              style={{ color: "#373737" }}
              className="text-16 ml-5"
            >
              Send your CV Updated
            </label>
            <div className="ml-5 mt-4">
              <label className="mr-10">
                <Controller
                  name="cvChoice"
                  control={control}
                  defaultValue="useCurrent"
                  render={({ field }) => (
                    <input
                      {...field}
                      type="radio"
                      value="useCurrent"
                      id="useCurrent"
                      onChange={() => {
                        handleCVChoiceChange("useCurrent");
                        const fetchCurrentCV = async () => {
                          try {
                            setCurrentCV(pagedata.userDetail.user_cv);
                            console.log(
                              "Current CV fetched and set:",
                              pagedata.userDetail.user_cv
                            );
                          } catch (error) {
                            console.error("Error fetching current CV:", error);
                          }
                        };
                        fetchCurrentCV();
                      }}
                    />
                  )}
                />
                Use Current CV
              </label>
              <label>
                <Controller
                  name="cvChoice"
                  control={control}
                  defaultValue="uploadNew"
                  render={({ field }) => (
                    <input
                      {...field}
                      type="radio"
                      value="uploadNew"
                      id="uploadNew"
                      onChange={() => handleCVChoiceChange("uploadNew")}
                    />
                  )}
                />
                Upload New CV
              </label>
            </div>
          </div>
          {showUploadButton && (
            <div className="mt-3 ml-3" style={{ padding: "10px" }}>
              <button
                htmlFor="fileInput"
                type="button"
                onClick={() => {
                  const fileInput = document.getElementById("fileInput");
                  fileInput.click();
                }}
              >
                <img src={ChooseAFile} alt="Choose a file Button" />
                <input
                  type="file"
                  id="fileInput"
                  accept=".pdf"
                  style={{ display: "none" }}
                  onClick={(e) => {
                    const selectedFile = e.target.files[0];
                    if (selectedFile) {
                      setCurrentCV(selectedFile);
                      console.log("Current CV set:", selectedFile);
                    }
                  }}
                />
              </button>
              <br />
              <span className="text-gray-400">Only PDF. Max size 5 MB</span>
              {currentCV && (
                <div
                  id="selectedFileBox"
                  className="mt-7 px-5 border border-pink-300 p-2 rounded-3xl text-gray-600 w-[150px] bg-pink-100"
                >
                  <span id="selectedFileName">
                    Selected file: {currentCV.name}
                  </span>
                </div>
              )}
            </div>
          )}
          {
            // User Experience section
          }
          <div style={{ padding: "20px" }}>
            <label htmlFor="experience">
              <span
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "17px",
                  color: "#373737",
                }}
              >
                PROFESSIONAL EXPERIENCE
              </span>{" "}
              <span
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "15px",
                  color: "#373737",
                }}
              >
                (TAKEN FROM YOUR PROFILE)
              </span>
            </label>
            <Controller
              name="experience"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Textarea
                  {...field}
                  style={{
                    width: "900px",
                    height: "300px",
                    fontSize: "16px",
                    border: "4px solid pink",
                    borderRadius: "14px",
                  }}
                  type="text"
                  id="experience"
                  value={professionalExperience}
                  onChange={(e) => setProfessionalExperience(e.target.value)}
                />
              )}
            />
          </div>
          {
            // Why are you interested section
          }
          <div style={{ padding: "20px" }}>
            <label htmlFor="interestedReason">
              <span
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "17px",
                  color: "#373737",
                }}
              >
                WHY ARE YOU INTERESTED IN WORKING AT THE
                <span>{companyname}</span>
              </span>
            </label>
            <Controller
              name="interestedReason"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Textarea
                  {...field}
                  style={{
                    width: "900px",
                    height: "300px",
                    fontSize: "16px",
                    border: "4px solid pink",
                    borderRadius: "14px",
                  }}
                  type="text"
                  id="interestedReason"
                  value={interestedReason}
                  onChange={(e) => setInterestedReason(e.target.value)}
                  minLength={50}
                  maxLength={1000}
                />
              )}
            />
            <span className="input-description" style={{ color: "#8E8E8E" }}>
              Between 50 and 1000 characters.
            </span>
          </div>

          <div className="ml-3">
            <button type="submit" id="sendApplicationButton">
              <img src={SendApplicationButton} alt="Send Application Button" />
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
export default ApplicationApplySection;

// /user/jobs/:jobid/apply
