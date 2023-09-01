import axios from "axios";
import React from "react";
// แก้ไข authentication 

// eslint-disable-next-line react-refresh/only-export-components
const AuthContext = React.createContext();

function AuthProvider() {
  const logInInfoRegister = async (data) => {
    try {
        await axios.post("/รอ localhost", data);
    } catch (error) {
    console.log("Error: unable to register the account")
    }
  };
  return (
    <AuthContext.Provider value={{ logInInfoRegister }}></AuthContext.Provider>
  );
}

const useAuth = () => React.useContext(AuthContext);
export {useAuth, AuthProvider};
