import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
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
      const result = await axios.post(
        "http://localhost:4000/auth/user/login",
        data
      );
      const token = result.data.token;
      localStorage.setItem("token", token);
      const userDataFromToken = jwtDecode(token);
      console.log(`this is token : ${token}`);
      setUserData({ userDataFromToken });
      navigate("/user/findthatjob");
    } catch (error) {
      // console.error("Error: unable to login the account", error);
      setErrorState(error.response.data.message);
    }
  };

  const RecruiterLogin = async (data) => {
    try {
      const result = await axios.post(
        "http://localhost:4000/auth/recruiter/login",
        data
      );
      const token = result.data.token;
      localStorage.setItem("token", token);
      const userDataFromToken = jwtDecode(token);
      // console.log(`this is token : ${token}`);
      setUserData({ ...userData, user: userDataFromToken });
      navigate("/recruiter/jobpostings");
    } catch (error) {
      // console.error("Error: unable to login the account", error);
      setErrorState(error.response.data.message);
    }
  };

  const UserRegister = async (data) => {
    try {
      await axios.post("http://localhost:4000/regist/professional", data);
      console.log("Registration successful");
      setUserData(data);
    } catch (error) {
      console.error("Error: unable to register the account 9", error);
    }
  };

  const RecruiterRegister = async (data) => {
    try {
      await axios.post("http://localhost:4000/regist/recruiter", data);
      console.log("Registration successful");
      // setUserData(data);
    } catch (error) {
      console.error("Error: unable to register the account", error);
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
      await axios.post("http://localhost:4000/upload", data, {
        headers: { "Content-Type": "multipart/form-data" },
        
      });
      console.log("upload successful");
      
    } catch (error) {
      console.error("Error: unable to upload", error);
    }


    // try {
    //   const supabaseUrl = 'https://vzijxarmxcbeahvervum.supabase.co/';
    //   const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ6aWp4YXJteGNiZWFodmVydnVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTM1NTAzOTIsImV4cCI6MjAwOTEyNjM5Mn0.hLQCgbzqQMLMd9wxmLBeNmSUOfKQt8Ar27OjW5Sb5HM';
    //   const supabase = createClient(supabaseUrl, supabaseAnonKey);
    //   const { result, error } = await supabase.storage
    //       .from("testbucket")
    //       .upload(`companyLogo/${data.name}`, data, {
    //         cacheControl: "3600",
    //         upsert: false,
    //       });
    //   return result
    // } catch (error) {
     
    //   console.error("Error: unable to upload", error);
    // }
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
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
