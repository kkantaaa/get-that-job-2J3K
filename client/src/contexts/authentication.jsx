import { createContext, useContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext);
}

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  const UserRegister = async (data) => {
    try {
      await axios.post("http://localhost:your-port/register", data);
      console.log("Registration successful");

      setUserData(data);
    } catch (error) {
      console.error("Error: unable to register the account", error);
    }
  };

  return (
    <AuthContext.Provider value={{ userData, UserRegister }}>
      {children}
    </AuthContext.Provider>
  );
};
