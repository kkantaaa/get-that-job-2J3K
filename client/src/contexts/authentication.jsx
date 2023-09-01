import axios from 'axios';
import React from 'react';

const AuthContext = React.createContext();


function AuthProvider() {
const logInInfoRegister = async (data) =>{
    await axios.post("/รอ localhost", data);
}
  return (
    <AuthContext.Provider
    value={
        {logInInfoRegister}
    }>
    </AuthContext.Provider>
  )
}

export const useAuth = () => React.useContext(AuthContext);