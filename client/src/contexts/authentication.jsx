import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode"; // นำเข้า jwtDecode ที่ใช้ในการถอดรหัส token
import { createClient } from "@supabase/supabase-js";

const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [errorState, setErrorState] = useState(null);
  const [userData, setUserData] = useState(null);

  const UserLogin = async (data) => {
    try {
      setErrorState(null);
      const result = await axios.post(
        "http://localhost:4000/auth/user/login",
        data
      );

      // validation login (Email & password)
      if (!result.data.token) {
        throw new Error("Email is not found or password is invalid");
      }
      if (result.data.token) {
        const token = result.data.token;
        localStorage.setItem("token", token);
        const userDataFromToken = jwtDecode(token);
        console.log(`this is token : ${token}`);
        setUserData({ ...userData, user: userDataFromToken });
        navigate("/user/findthatjob");
      }
      // validation login (Email || password)
      // if (result.data.message) {
      //   setErrorState(result.data.message);
      // }
    } catch (error) {
      setErrorState(error.message);
      // console.error("Error: unable to login the account", error);
    }
  };

  const RecruiterLogin = async (data) => {
    try {
      setErrorState(null);
      const result = await axios.post(
        "http://localhost:4000/auth/recruiter/login",
        data
      );

      //validation login (temporary)
      if (!result) {
        throw new Error("Email is not found or password is invalid");
      }

      const token = result.data.token;
      localStorage.setItem("token", token);
      const userDataFromToken = jwtDecode(token);
      // console.log(`this is token : ${token}`);
      setUserData({ ...userData, user: userDataFromToken });
      navigate("/recruiter/jobpostings");
    } catch (error) {
      // console.error("Error: unable to login the account", error);
      // setErrorState(error.response.data.message);
      setErrorState(error.message);
    }
  };

  const UserRegister = async (data) => {
    try {
      await axios.post("http://localhost:4000/regist/professional", data);
      console.log("Registration successful");
      setUserData(data);
    } catch (error) {
      console.error("Error: unable to register the account", error);
    }
  };

  const RecruiterRegister = async (data) => {
    try {
      console.log(data);
      await axios.post("http://localhost:4000/regist/recruiter", data);
      console.log("Registration successful");
      // setUserData(data);
    } catch (error) {
      console.error("Error: unable to register the account", error);
      // setErrorState(error.response.data.message);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUserData(null);
    setErrorState(null);
    navigate("/");
  };

  const upload = async (data) => {
    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
      const supabase = createClient(supabaseUrl, supabaseAnonKey);
      console.log(data);
      const { result, error } = await supabase.storage
        .from("testbucket")
        .upload(`${data.fileType}/${data.file.name}`, data.file, {
          cacheControl: "3600",
          upsert: false,
        });
      const url = supabase.storage
        .from("testbucket")
        .getPublicUrl(`${data.fileType}/${data.file.name}`);
      console.log({ uploadResult: url.data.publicUrl });
      if (data.fileType === "companyLogo") {
        return url.data.publicUrl;
      } else {
        return `${data.fileType}/${data.file.name}`;
      }
    } catch (error) {
      console.error("Error: unable to upload", error);
    }
  };

  useEffect(() => {
    console.log("Updated userData:", userData);
  }, [userData]);

  return (
    <AuthContext.Provider
      value={{
        userData,
        UserLogin,
        RecruiterLogin,
        UserRegister,
        logout,
        upload,
        RecruiterRegister,
        errorState,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// ปรับปรุง useAuth ให้เป็น arrow function
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
