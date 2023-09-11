import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";

export default function ApplicationCompleting() {
  const { control, handleSubmit } = useForm();
  const [currentCV, setCurrentCV] = useState(null);
  const [showUploadButton, setShowUploadButton] = useState(false);

  useEffect(() => {
    const fetchCurrentCV = async () => {
      try {
        //1
        const response = await axios.get("");
        setCurrentCV(response.data);
      } catch (error) {
        console.error("Error fetching current CV:", error);
      }
    };
    fetchCurrentCV();
  }, []);

  const handleCVChoiceChange = (data) => {
    setShowUploadButton(data === "uploadNew");
  };

  const onSubmit = async () => {
    if (currentCV) {
      console.log("Using current CV:", currentCV);
    } else {
      console.error("Current CV data is not available.");
    }
  };

  return (
    <>
      <h1>Complete your application</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Send your CV Updated</label>
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
                    onChange={() => handleCVChoiceChange("useCurrent")}
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
                    onChange={() => handleCVChoiceChange("uploadNew")}
                  />
                )}
              />
              Upload New CV
            </label>
          </div>
        </div>
        {showUploadButton && (
          <div>
            <button type="button">Upload New CV</button>
          </div>
        )}
        <div>
          <button type="submit">Send Applicaiton</button>   
        </div>
      </form>
    </>
  );
}
