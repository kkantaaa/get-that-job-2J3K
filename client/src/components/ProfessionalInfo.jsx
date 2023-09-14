import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/authentication";
import { useGlobalContext } from "@/contexts/registerContexts";
import { useEffect, useRef } from "react";
import { useState } from "react";
import supabaseClient from "../utils/supabaseClient.js";

function ProfessionalInfo() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const { userData, setUserData } = useGlobalContext();
  const { UserRegister } = useAuth();
  const { handleSubmit, control, setValue, watch } = useForm();

  const fileInputRef = useRef(null);

  useEffect(() => {
    console.log("Updated userData:", userData);
  }, [userData]);
  console.log("Updated file:", file);

  const onSubmit = async () => {
    try {
      if (file) {
        const { fileData, error } = await supabaseClient.storage
          .from("testbucket")
          .upload(`${file.name}`, file, {
            cacheControl: "3600",
            upsert: false,
          });

        if (error) {
          throw error;
        }

        setUserData({
          ...userData,
          file: fileData,
        });
      }
    } catch (error) {
      console.error("Error during registration", error);
    }
  };

  const handleFileButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <form className="font-Inter" onSubmit={handleSubmit(onSubmit)}>
      <div className="file-upload-container">
        <p className="text-[10px] font-normal leading-normal tracking-[1.5px] uppercase">
          UPLOAD / UPDATE YOUR CV
        </p>

        <input
          ref={fileInputRef}
          style={{ display: "none" }}
          name="file"
          type="file"
          id="file"
          onChange={(e) => {
            if (e.target.files.length > 0) {
              setFile(e.target.files[0]);
            }
          }}
        />

        <button
          className="mt-[4px] text-[14px] font-normal leading-[20px] tracking-[0.25px]"
          onClick={handleFileButtonClick} 
        >
          Upload File
        </button>
      </div>

      {watch("file") && (
        <div className="file-list-preview-container">
          <div className="file-preview-container">
            <p>{watch("file").name}</p>
            <button
              className="file-remove-button"
              onClick={() => setValue("file", null)}
            >
              x
            </button>
          </div>
        </div>
      )}

      <div className="mt-[16px]">
        <button
          type="submit"
          className="bg-Pink text-white rounded-[16px] px-[16px] py-[8px] text-center text-sm tracking-[1.25px]"
        >
          Submit File
        </button>
      </div>
    </form>
  );
}

export default ProfessionalInfo;
