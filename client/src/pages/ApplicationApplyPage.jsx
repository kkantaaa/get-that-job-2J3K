import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import axios from "axios";
import FindThatJobPage from "./FindThatJobPage";

function ApplicationApplyPage({ companyName }) {
  const { control, handleSubmit } = useForm();
  const [currentCV, setCurrentCV] = useState(null);
  const [showUploadButton, setShowUploadButton] = useState(false);
  const [professionalExperience, setProfessionalExperience] = useState("");
  const [interestedReason, setInterestedReason] = useState("");

  useEffect(() => {
    const fetchCurrentCV = async () => {
      const response = await axios.get("");
      try {
        await setCurrentCV(response.data);
      } catch (error) {
        console.error("Error fetching current CV:", error);
      }
    };
    const fetchProfessionalExperience = async () => {
      const response = await axios.get(" ");
      try {
        await setProfessionalExperience(response.data);
      } catch (error) {
        console.error("Error fetching professional experience:", error);
      }
    };
    fetchCurrentCV();
    fetchProfessionalExperience();
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
      <FindThatJobPage />
      <div style={{ marginLeft: "300px" }}>
        <h1 style={{ fontSize: "32px", color: "pink" }}>
          Complete your application
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="cvChoice">Send your CV Updated</label>
            <div>
              <label>
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
                            const response = await axios.get(""); 
                            setCurrentCV(response.data);
                            console.log(
                              "Current CV fetched and set:",
                              response.data
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
            <div style={{ padding: "10px" }}>
              <Button
                htmlFor="fileInput"
                type="button"
                onClick={() => {
                  const fileInput = document.getElementById("fileInput");
                  fileInput.click();
                }}
              >
                <input
                  type="file"
                  id="fileInput"
                  accept=".pdf"
                  style={{ display: "none" }}
                  onChange={(e) => {
                    const selectedFile = e.target.files[0];
                    if (selectedFile) {
                      setCurrentCV(selectedFile);
                      const selectedFileNameDiv =
                        document.getElementById("selectedFileName");
                      selectedFileNameDiv.innerText = `Selected file: ${selectedFile.name}`;
                      console.log("Selected file:", selectedFile);
                    }
                  }}
                />
                &#xf093; Upload New CV
              </Button>
              <br />
              <span>Only PDF. Max size 5 MB</span>
              <h1 id="selectedFileName" style={{ marginTop: "10px" }}></h1>
            </div>
          )}

          <div style={{ padding: "20px" }}>
            <label htmlFor="experience">
              Professional experience(TAKEN FROM YOUR PROFILE)
            </label>
            <Controller
              name="experience"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Input
                  {...field}
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
              WHY ARE YOU INTERESTED IN WORKING AT THE {companyName}
            </label>
            <Controller
              name="interestedReason"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Input
                  {...field}
                  type="text"
                  id="interestedReason"
                  value={interestedReason}
                  onChange={(e) => setInterestedReason(e.target.value)}
                />
              )}
            />
            <span className="input-description">
              Between 50 and 1000 characters.
            </span>
          </div>

          <div>
            <Button type="submit">Send Application</Button>
          </div>
        </form>
      </div>
    </>
  );
}
export default ApplicationApplyPage;
// /user/application/apply
