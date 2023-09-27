//import tools, packages, css, and functions
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Textarea } from "@/components/ui/textarea";
//components
import ProfessionalSidebar from "@/components/ProfessionalSideBar";
//import images
import ChooseAFile from "@/images/ApllicationApplyPage/ChooseAFile.png";
import SaveChanges from "@/images/ProfesionalProfile/Save Changes.png";
//phonejson
import phonedatajson from "@/assets/country_dial_info.json";
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
  const [selectedCountry, setSelectedCountry] = useState(phonedatajson[0]);
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
  // var today for limiting the date
  const today = new Date().toISOString().split("T")[0];
  //init useForm
  const { control } = useForm();
  //fetch data from database ka
  const getdatafromdatabase = async () => {
    const response = await axios.get(`http://localhost:4000/profile/propro`);
    const fetcheddata = response.data;
    // console.log(fetcheddata); เหลืออันนี้ไว้ check
    setFormData({ ...initialFormData, ...fetcheddata });
  };
  //useEffect - don't add anthing in that [] na ka
  useEffect(() => {
    getdatafromdatabase();
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
          .from("professionalprofile")
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
      } else {
        setFormData((prevState) => ({
          ...prevState,
          user_cv: null,
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
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error("Error updating profile");
    }
  };
  //3.handle inputs change>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  const handleEmailChange = (e) => {
    const inputValue = e.target.value;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (emailRegex.test(inputValue)) {
      setFormData({ ...formData, email: inputValue });
    }
  }; // email
  const handleNameChange = (e) => {
    const inputValue = e.target.value;
    const alphabetRegex = /^[A-Za-zก-๏\s]+$/;
    if (inputValue.match(alphabetRegex) || inputValue === "") {
      const nameParts = inputValue
        .split(/\s+/)
        .filter((part) => /^[A-Za-zก-๏]+$/.test(part));
      if (nameParts.length <= 2) {
        setFormData({ ...formData, user_name: inputValue });
      }
    }
  };
  // name
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
        <h1 className="ml-2 py-3 text-neutral-700 text-[34px] font-normal font-['Montserrat'] tracking-tight">
          Profile
        </h1>
        <div>
          {/* SubHeader -- Personal information*/}
          {/* SubHeader -- Personal information*/}
          <h1 className=" ml-3 w-[944px] text-neutral-900 text-[30px] font-normal font-['Montserrat']">
            Personal information{" "}
          </h1>
          <div className="ml-4">
            <form>
              {/* 1 of 5/Part 1 / Email*/}
              {/* 1 of 5/Part 1 / Email*/}
              <div>
                <label
                  htmlFor="email"
                  className="text-neutral-1000 text-[12px] font-normal font-['Inter'] uppercase tracking-wider"
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
                  className="text-neutral-1000 text-[12px] font-normal font-['Inter'] uppercase tracking-wider"
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
                  className="text-neutral-1000 text-[12px] font-normal font-['Inter'] uppercase tracking-wider"
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
                  className="text-neutral-1000 text-[12px] font-normal font-['Inter'] uppercase tracking-wider"
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
                      min="1923-01-01"
                      max={today}
                    />
                  )}
                />
              </div>
              {/* 5 of 5/Part 1 / Linkin URL*/}
              {/* 5 of 5/Part 1 / Linkin URL*/}
              <div className="mt-3 ">
                <label
                  htmlFor="linkedinUrl"
                  className="text-neutral-1000 text-[12px] font-normal font-['Inter'] uppercase tracking-wider"
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
              <div className="mt-4">
                <h1 className="w-[944px] text-neutral-900 text-[30px] font-normal font-['Montserrat']">
                  Professional information{" "}
                </h1>
                {/* Sub Professional Profile Header - Disclaimer */}
                {/* Sub Professional Profile Header - Disclaimer */}
                <span className="text-zinc-700 text-[14px] font-normal font-['Inter'] leading-none tracking-wide">
                  changes made here will be reflected on your future
                  applications
                </span>
              </div>
              {/* 1 of 3/Part 2 /Tile*/}
              {/* 1 of 3/Part 2 /Tile*/}
              <div className="mt-3">
                <label
                  htmlFor="title"
                  className="text-neutral-1000 text-[12px] font-normal font-['Inter'] uppercase tracking-wider"
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
                      maxLength={45}
                    />
                  )}
                />
              </div>
              {/* 2 of 3/Part 2 /Professional experience*/}
              {/* 2 of 3/Part 2 /Professional experience*/}
              <div>
                <label
                  htmlFor="Professional experience"
                  className="text-neutral-1000 text-[12px] font-normal font-['Inter'] uppercase tracking-wider"
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
                      maxLength={750}
                    />
                  )}
                />
              </div>
              {/*3 of 3/Part 2 /Professional Education*/}
              {/*3 of 3/Part 2 /Professional Education*/}
              <div className="mt-1">
                <label
                  htmlFor="Education"
                  className="text-neutral-1000 text-[12px] font-normal font-['Inter'] uppercase tracking-wider"
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
                      maxLength={450}
                    />
                  )}
                />
              </div>
              {/*UPLOAD / UPDATE YOUR CV */}
              {/*UPLOAD / UPDATE YOUR CV */}
              {/* UPLOAD / UPDATE YOUR CV */}
              {/* UPLOAD / UPDATE YOUR CV */}
              <div className="mt-2 mr-2">
                <h1 className="text-neutral-900 text-[12px] font-normal font-['Inter'] uppercase tracking-wider">
                  UPLOAD / UPDATE YOUR CV
                </h1>
                <label htmlFor="fileInput" className="cursor-pointer">
                  <input
                    type="file"
                    id="fileInput"
                    accept=".pdf"
                    onChange={handleFileInputChange}
                    style={{ display: "none" }}
                  />
                  <img src={ChooseAFile} alt="Choose a file Button" />
                </label>
                <span style={{ color: "#8E8E8E" }}>
                  Only PDF. Max size 5 MB
                </span>
                {fileSelected && (
                  <div
                    id="selectedFileBox"
                    className="mt-3 border border-pink-700 p-2 px-1 rounded-3xl text-gray-900 w-[118px] bg-pink-100"
                  >
                    <span id="selectedFileName">
                      Selected file: {formData.selectedNewFileName}
                    </span>
                  </div>
                )}
                {/* SAVE CHANGES button */}
                <br />
                <button
                  type="button"
                  onClick={handleSaveChanges}
                  className="mt-6 "
                >
                  <img src={SaveChanges} alt="SaveChanges button" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfessionalProfile;
