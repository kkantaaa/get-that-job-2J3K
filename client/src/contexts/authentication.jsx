import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jwtDecode from "jwt-decode";
// แก้ไข authentication
import jwtDecode from "jwt-decode"; // นำเข้า jwtDecode ที่ใช้ในการถอดรหัส token

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  try {
    const UserLogin = async (data) => {
      console.log("from authentication");
      console.log(data);
      const result = await axios.post(
        "http://localhost:4000/auth/user/login",
        data
      );
      const token = result.data.token;
      localStorage.setItem("token", token);
      const userDataFromToken = jwtDecode(token);
      console.log("this is token");
      console.log(token);
      setUserData({ userDataFromToken });
      console.log("this is userData");
      console.log(userData);
      navigate("/");
    };
  } catch (error) {
    console.error("Error: unable to login", error);
  }

  try {
    const RecruiterLogin = async (data) => {
      console.log("from authentication");
      console.log(data);
      const result = await axios.post(
        "http://localhost:4000/auth/recruiter/login",
        data
      );
      const token = result.data.token;
      localStorage.setItem("token", token);
      const userDataFromToken = jwtDecode(token);
      console.log("this is token");
      console.log(token);
      setUserData({ userDataFromToken });
      console.log("this is userData");
      console.log(userData);
      navigate("/");
    };
  } catch (error) {
    console.error("Error: unable to login", error);
  }

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
      await axios.post("http://localhost:your-port/register", data); // ควรเปลี่ยนจาก "http://localhost:your-port/register" เป็น URL ที่ถูกต้อง
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
      value={{ userData, UserLogin, RecruiterLogin, UserRegister, logout }}
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
