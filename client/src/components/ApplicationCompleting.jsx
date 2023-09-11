import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";

export default function ApplicationCompleting({ companyName }) {
  const { control, handleSubmit } = useForm();
  const [currentCV, setCurrentCV] = useState(null);
  const [showUploadButton, setShowUploadButton] = useState(false);

  useEffect(() => {
    const fetchCurrentCV = async () => {
      try {
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
          <div>
            <button type="button">Upload New CV</button>
            <span>Only PDF. Max size 5 MB</span>
          </div>
        )}

        <div>
          <label htmlFor="experience">
            Professional experience(TAKEN FROM YOUR PROFILE)
          </label>
          <Controller
            name="experience"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <input {...field} type="text" id="experience" />
            )}
          />
        </div>

        <div>
          <label htmlFor="WHY ARE YOU INTERESTED">
            WHY ARE YOU INTERESTED IN WORKING AT THE {companyName}
          </label>
          <Controller
            name="WHY ARE YOU INTERESTED"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <input {...field} type="text" id="WHY ARE YOU INTERESTED" />
            )}
          />
          <span className="input-description">
            Between 50 and 1000 characters.
          </span>
        </div>

        <div>
          <button type="submit">Send Application</button>
        </div>

        <div>
          <label htmlFor="WHY ARE YOU INTERESTED">
            WHY ARE YOU INTERESTED IN WORKING AT THE {companyName}
          </label>
          <Controller
            name="WHY ARE YOU INTERESTED"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <input {...field} type="text" id="WHY ARE YOU INTERESTED" />
            )}
          />
          <span className="input-description">
            Between 50 and 1000 characters.
          </span>
        </div>

        <div>
          <button type="submit">Send Application</button>
          </div>
        )
         )
      </form>
    </>
  );
}
