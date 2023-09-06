import { createContext, useContext, useState } from "react";
import axios from "axios";
import React from "react";
// import jwtDecode from "jwt-decode";
// แก้ไข authentication

const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext);
}

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  // const userlogin = async (data) => {
  //   const result = await axios.post("http://localhost:3000/auth/login", data);
  //   const token = result.data.token;
  //   const userDataFromToken = jwtDecode(token);
  //   setState({ ...state, user: userDataFromToken });
  // };

  const RecruiterLogin = async (data) => {
    console.log(data); //อัพเดท http ของ db ก่อน
    // const result = await axios.post(
    //   "http://localhost:3000/auth/recruiter/login",
    //   data
    // );
    // const token = result.data.token;
    // localStorage.setItem("token", token);
    // const userDataFromToken = jwtDecode(token);
    // setState({ ...state, user: userDataFromToken });
    // navigate("/recuiter/jobpost");
  };

  const UserRegister = async (data) => {
    try {
      await axios.post("http://localhost:your-port/register", data);
      console.log("Registration successful");

      setUserData(data);
    } catch (error) {
      console.error("Error: unable to register the account", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setState({ ...state, user: null, error: null });
  };

  return (
    <AuthContext.Provider
      value={{ userData, RecruiterLogin, UserRegister, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
