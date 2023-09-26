//import tools, packages, and functions
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProfessionalSidebar from "@/components/ProfessionalSideBar";
import { Textarea } from "@/components/ui/textarea";
//import images
import ChooseAFile from "@/images/ApllicationApplyPage/ChooseAFile.png";

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>compo declaration<<<<<<<<<<<<<<<<<<<<<<
function ProfessionalProfile() {
  // initial form
  const initialFormData = {
    newCv: null,
    user_cv: null,
    selectedNewCv: null,
    email: "",
    user_name: "",
    user_phone: "",
    user_birthdate: "",
    user_linkedin: "",
    user_title: "",
    user_experience: "",
    user_education: "",
  };
  // states
  const [formData, setFormData] = useState(initialFormData);
  const [fileSelected, setFileSelected] = useState(false);
  //
  // Function to format the date as year-month-day or else it won't work kub
  const formatDate = (inputDate) => {
    const date = new Date(inputDate);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };
  const user_birthdate = formData.user_birthdate;
  const formattedBirthdate = formatDate(user_birthdate);
  //init
  const { control } = useForm();
  //fetch data from database ka
  const getdatafromdatabase = async () => {
    const response = await axios.get(`http://localhost:4000/profile/propro`);
    const fetcheddata = response.data;
    console.log(fetcheddata);
    setFormData({ ...initialFormData, ...fetcheddata });
    console.log(formData);
  };
  //useEffect - don't add anthing in that [] na ka
  useEffect(() => {
    getdatafromdatabase();
    console.log(formData);
  }, []);
  //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>handlers
  //1. handleFileInputChange
  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type === "application/pdf" && file.size <= 5 * 1024 * 1024) {
        setFormData((prevState) => ({
          ...prevState,
          newCv: file,
          selectedNewFileName: file.name,
        }));
        setFileSelected(true);
      } else {
        setFormData((prevState) => ({
          ...prevState,
          newCv: null,
          selectedNewFileName: null,
        }));
        setFileSelected(false);
      }
    } else {
      setFormData((prevState) => ({
        ...prevState,
        newCv: null,
        selectedNewFileName: null,
      }));
      setFileSelected(false);
    }
  };
  //2. handleSaveChanges
  const handleSaveChanges = async () => {
    try {
      if (formData.newCv) {
        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
        const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
        const supabase = createClient(supabaseUrl, supabaseAnonKey);

        const { data, error: professionalError } = await supabase.storage
          .from("files")
          .upload(
            `professionalcv/${Date.now()}${formData.newCv.name}`,
            formData.newCv,
            {
              cacheControl: "3600",
              upsert: false,
            }
          );

        if (professionalError) {
          throw professionalError;
        }

        setFormData((prevState) => ({
          ...prevState,
          user_cv: data.path,
        }));
      }

      const updatedProfileData = {
        email: formData.email,
        user_name: formData.user_name,
        user_phone: formData.user_phone,
        user_birthdate: formData.user_birthdate,
        user_linkedin: formData.user_linkedin,
        user_title: formData.user_title,
        user_experience: formData.user_experience,
        user_education: formData.user_education,
        user_cv: formData.user_cv,
      };
      console.log("updatedProfileData:", updatedProfileData);
      await axios.put(
        `http://localhost:4000/profile/propro`,
        updatedProfileData
      );
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };
  //3.handle inputs change>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  const handleEmailChange = (e) => {
    setFormData({ ...formData, email: e.target.value });
  }; // email
  const handleNameChange = (e) => {
    setFormData({ ...formData, user_name: e.target.value });
  }; // name
  const handlePhoneChange = (e) => {
    let inputValue = e.target.value;
    const filteredlewkubPhoneNumber = inputValue.replace(/\D/g, "");
    if (filteredlewkubPhoneNumber.length > 0) {
      inputValue = `+${filteredlewkubPhoneNumber.slice(0, 11)}`;
    }
    setFormData({ ...formData, user_phone: inputValue });
  }; // phone
  const handleBirthdateChange = (e) => {
    setFormData({ ...formData, user_birthdate: e.target.value });
  }; // birthdate
  const handleLinkedInChange = (e) => {
    setFormData({ ...formData, user_linkedin: e.target.value });
  }; // linkedin
  const handleTitleChange = (e) => {
    setFormData({ ...formData, user_title: e.target.value });
  }; // title
  const handleExperienceChange = (e) => {
    setFormData({ ...formData, user_experience: e.target.value });
  }; // experience
  const handleEducationChange = (e) => {
    setFormData({ ...formData, user_education: e.target.value });
  }; // education
  //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  // return
  return (
    <>
      <ToastContainer theme="dark" autoClose={3000} limit={3} />
      <ProfessionalSidebar />
      <div style={{ marginLeft: "250px" }}>
        {/* Header -- Profile*/}
        {/* Header -- Profile*/}
        <h1
          className="ml-2 "
          style={{
            fontSize: "32px",
            color: "#BF5F82",
            fontFamily: "Montserrat, sans-serif",
          }}
        >
          Profile
        </h1>
        <div>
          {/* SubHeader -- Personal information*/}
          {/* SubHeader -- Personal information*/}
          <h1
            className="ml-3 mb-1 "
            style={{ fontSize: "16px", fontWeight: "bolder" }}
          >
            Personal information{" "}
          </h1>
          <div className="mt-8" style={{ marginLeft: "10px" }}>
            <form>
              {/* 1 of 5/Part 1 / Email*/}
              {/* 1 of 5/Part 1 / Email*/}
              <div>
                <label
                  htmlFor="email"
                  style={{ fontSize: "16px", fontWeight: "bold" }}
                >
                  Email
                </label>
                <br />
                <Controller
                  name="email"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Textarea
                      {...field}
                      className="w-[380px] h-[44px] font-[16px] border-[4px] border-solid border-[pink] rounded-[14px] justify-start items-center gap-2 inline-flex"
                      type="email"
                      value={formData.email}
                      onChange={handleEmailChange}
                    />
                  )}
                />
              </div>
              {/* 2 of 5/Part 1 / Name*/}
              {/* 2 of 5/Part 1 / Name*/}
              <div>
                <label
                  htmlFor="name"
                  style={{ fontSize: "16px", fontWeight: "bold" }}
                >
                  Name
                </label>
                <br />
                <Controller
                  name="name"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Textarea
                      {...field}
                      className="w-[380px] h-[44px] font-[16px] border-[4px] border-solid border-[pink] rounded-[14px] justify-start items-center gap-2 inline-flex"
                      type="text"
                      value={formData.user_name}
                      onChange={handleNameChange}
                    />
                  )}
                />
              </div>
              {/* 3 of 5/Part 1 / Phone*/}
              {/* 3 of 5/Part 1 / Phone*/}
              <div>
                <label
                  htmlFor="phone"
                  style={{ fontSize: "16px", fontWeight: "bold" }}
                >
                  Phone
                </label>
                <br />
                <Controller
                  name="phone"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Textarea
                      {...field}
                      className="w-[380px] h-[44px] font-[16px] border-[4px] border-solid border-[pink] rounded-[14px] justify-start items-center gap-2 inline-flex"
                      type="tel"
                      value={formData.user_phone}
                      onChange={handlePhoneChange}
                      required
                    />
                  )}
                />
              </div>
              <div className="text-neutral-400 text-xs font-normal font-['Inter'] leading-none tracking-wide">
                +[country code][number]
              </div>
              {/* 4 of 5/Part 1 / Birthdate*/}
              {/* 4 of 5/Part 1 / Birthdate*/}
              <div className="mt-3">
                <label
                  htmlFor="birthdate"
                  style={{ fontSize: "16px", fontWeight: "bold" }}
                >
                  Birthdate (MM/DD/YYYY)
                </label>
                <br />
                <Controller
                  name="birthdate"
                  control={control}
                  defaultValue={""}
                  render={({ field }) => (
                    <input
                      {...field}
                      className="px-2 w-[380px] h-[44px] font-[16px] border-[4px] border-solid border-[pink] rounded-[14px] justify-start items-center gap-2 inline-flex"
                      type="date"
                      onChange={handleBirthdateChange}
                      value={formattedBirthdate}
                      placeholder="YYYY-MM-DD"
                    />
                  )}
                />
              </div>
              {/* 5 of 5/Part 1 / Linkin URL*/}
              {/* 5 of 5/Part 1 / Linkin URL*/}
              <div className="mt-3 ">
                <label
                  htmlFor="linkedinUrl"
                  style={{ fontSize: "16px", fontWeight: "bold" }}
                >
                  Linkin URL{" "}
                </label>
                <br />
                <Controller
                  name="linkedinUrl"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Textarea
                      {...field}
                      className="w-[380px] h-[44px] font-[16px] border-[4px] border-solid border-[pink] rounded-[14px] justify-start items-center gap-2 inline-flex"
                      type="text"
                      value={formData.user_linkedin}
                      onChange={handleLinkedInChange}
                    />
                  )}
                />
              </div>
              {/* 2nd section : Professional Profile */}
              {/* 2nd section : Professional Profile */}
              {/* 2nd section : Professional Profile */}
              {/* Professional Profile Header */}
              {/* Professional Profile Header */}
              <div className="mt-7">
                <h1
                  style={{
                    fontSize: "32px",
                    color: "#BF5F82",
                    fontFamily: "Montserrat, sans-serif",
                  }}
                >
                  Professional Profile{" "}
                </h1>
                {/* Sub Professional Profile Header - Disclaimer */}
                {/* Sub Professional Profile Header - Disclaimer */}
                <span style={{ fontSize: "16px", fontWeight: "bold" }}>
                  changes made here will be reflected on your future
                  applications
                </span>
              </div>
              {/* 1 of 3/Part 2 /Tile*/}
              {/* 1 of 3/Part 2 /Tile*/}
              <div className="mt-3">
                <label
                  htmlFor="title"
                  style={{ fontSize: "16px", fontWeight: "bold" }}
                >
                  Title{" "}
                </label>
                <br />
                <Controller
                  name="title"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Textarea
                      {...field}
                      className="w-[380px] h-[44px] font-[16px] border-[4px] border-solid border-[pink] rounded-[14px] justify-start items-center gap-2 inline-flex"
                      type="text"
                      value={formData.user_title}
                      onChangeCapture={handleTitleChange}
                    />
                  )}
                />
              </div>
              {/* 2 of 3/Part 2 /Professional experience*/}
              {/* 2 of 3/Part 2 /Professional experience*/}
              <div>
                <label
                  htmlFor="Professional experience"
                  style={{ fontSize: "16px", fontWeight: "bold" }}
                >
                  Professional experience{" "}
                </label>
                <br />
                <Controller
                  name="Professional experience"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Textarea
                      {...field}
                      style={{
                        width: "760px",
                        height: "256px",
                        fontSize: "16px",
                        border: "4px solid pink",
                        borderRadius: "14px",
                      }}
                      type="text"
                      value={formData.user_experience}
                      onChange={handleExperienceChange}
                    />
                  )}
                />
              </div>
              {/*3 of 3/Part 2 /Professional Education*/}
              {/*3 of 3/Part 2 /Professional Education*/}
              <div>
                <label
                  htmlFor="Education"
                  style={{ fontSize: "16px", fontWeight: "bold" }}
                >
                  Education{" "}
                </label>
                <br />
                <Controller
                  name="Education"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Textarea
                      {...field}
                      style={{
                        width: "760px",
                        height: "132px",
                        fontSize: "16px",
                        border: "4px solid pink",
                        borderRadius: "14px",
                      }}
                      type="text"
                      value={formData.user_education}
                      onChange={handleEducationChange}
                    />
                  )}
                />
              </div>
              {/*UPLOAD / UPDATE YOUR CV */}
              {/*UPLOAD / UPDATE YOUR CV */}
              {/* UPLOAD / UPDATE YOUR CV */}
              <div className="mt-2 mr-2">
                <h1 style={{ fontSize: "16px", fontWeight: "bold" }}>
                  UPLOAD / UPDATE YOUR CV
                </h1>
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
                        console.log("Current CV set:", selectedFile);
                        // Display the selected file name
                        document.getElementById(
                          "selectedFileName"
                        ).textContent = `Selected file: ${selectedFile.name}`;
                      }
                    }}
                    onChange={handleFileInputChange}
                  />
                </button>
                <br />
                <span style={{ color: "#8E8E8E" }}>
                  Only PDF. Max size 5 MB
                </span>
                {fileSelected && (
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
                    <span id="selectedFileName">Selected file:</span>
                  </div>
                )}
                {/* SAVE CHANGES button */}
                {/* SAVE CHANGES button */}
                {/*  SAVE CHANGES button */}
                <br />
                <button
                  type="submit"
                  onClick={handleSaveChanges}
                  className="mt-5 bg-pink-300 text-white px-4 py-2 rounded cursor-pointer"
                >
                  SAVE CHANGES
                </button>
                {/*   */}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfessionalProfile;
