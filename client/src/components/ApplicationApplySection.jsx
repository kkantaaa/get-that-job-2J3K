import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
//images
import ChooseAFile from "@/images/ApllicationApplyPage/ChooseAFile.png";
import SendApplicationButton from "@/images/ApllicationApplyPage/SendApplicationButton.png";

import axios from "axios";

function ApplicationApplySection({ companyName }) {
  const { control, handleSubmit } = useForm();
  const [currentCV, setCurrentCV] = useState(null);
  const [showUploadButton, setShowUploadButton] = useState(false);
  const [professionalExperience, setProfessionalExperience] = useState("");
  const [interestedReason, setInterestedReason] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user_id = "1";
        const job_id = "4";
        const response = await axios.get(
          `http://localhost:4000/testapply/${user_id}/job-list/${job_id}`
        );
        const data = response.data;

        setCurrentCV(data[0].user_appli_cv);
        setProfessionalExperience(data[0].user_appli_exp);
        console.log(data);
        console.log("Current CV fetched and set:", data[0].user_appli_cv);
        console.log("professionalExperience:", data[0].user_appli_exp);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
    setCurrentCV();
  }, []);

  const handleCVChoiceChange = (data) => {
    setShowUploadButton(data === "uploadNew");
  };

  const onSubmit = async () => {
    if (!currentCV) {
      console.log("Current CV data is not available.");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("currentCV", currentCV);
      formData.append("professionalExperience", professionalExperience);
      formData.append("interestedReason", interestedReason);
      await axios.post("", formData);
      console.log("Application sent successfully");
    } catch (error) {
      console.error("Error sending application:", error);
    }
  };

  return (
    <>
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
                            const user_id = "1";
                            const job_id = "4";
                            const response = await axios.get(
                              `http://localhost:4000/testapply/${user_id}/job-list/${job_id}`
                            );
                            const data = response.data;
                            console.log(data[0].user_appli_cv);
                            setCurrentCV(data[0].user_appli_cv);
                            console.log(
                              "Current CV fetched and set:",
                              data[0].user_appli_cv
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
              <span style={{ color: "#8E8E8E" }}>Only PDF. Max size 5 MB</span>
              {currentCV && (
                <div
                  id="selectedFileBox"
                  style={{
                    marginTop: "10px",
                    border: "1px solid pink",
                    padding: "10px",
                    borderRadius: "4px",
                    color: "#333",
                    width: "120px",
                    backgroundColor: "#FCE4EC",
                  }}
                >
                  <span id="selectedFileName">
                    Selected file: {currentCV.name}
                  </span>
                </div>
              )}
            </div>
          )}
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
          <div style={{ padding: "20px" }}>
            <label htmlFor="interestedReason">
              <span
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "17px",
                  color: "#373737",
                }}
              >
                WHY ARE YOU INTERESTED IN WORKING AT THE {companyName}
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
// /user/application/apply
