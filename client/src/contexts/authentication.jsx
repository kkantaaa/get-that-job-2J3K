import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jwtDecode from "jwt-decode"; // นำเข้า jwtDecode ที่ใช้ในการถอดรหัส token

const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  const UserLogin = async (data) => {
    try {
      const result = await axios.post(
        "http://localhost:3000/auth/user/login",
        data
      );
      const token = result.data.token;
      const userDataFromToken = jwtDecode(token);
      setUserData(userDataFromToken);
      localStorage.setItem("token", token);
      navigate("/user/findjob");
    } catch (error) {
      console.error("Error: unable to login", error);
    }
  };

  const RecruiterLogin = async (data) => {
    try {
      const result = await axios.post(
        "http://localhost:3000/auth/recruiter/login",
        data
      );
      const token = result.data.token;
      const userDataFromToken = jwtDecode(token);
      setUserData(userDataFromToken);
      localStorage.setItem("token", token);
      navigate("/recruiter/jobpost"); // ควรเปลี่ยนจาก "/recuiter/jobpost" เป็น "/recruiter/jobpost" ในกรณีที่เป็นคำสะกดไม่ถูก
    } catch (error) {
      console.error("Error: unable to login", error);
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
      await axios.post("http://localhost:4000/regist/recruiter", data); 
      console.log("Registration successful");
      setUserData(data);
    } catch (error) {
      console.error("Error: unable to register the account", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUserData(null);
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{ userData, UserLogin, RecruiterLogin, UserRegister, logout, RecruiterRegister }}
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
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
