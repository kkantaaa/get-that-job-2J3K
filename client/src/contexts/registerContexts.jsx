import { createContext, useContext, useState } from "react";

const UserContext = createContext();

const ContextProvider = ({ children }) => {
  const [userData, setUserData] = useState({});
  const [recruiterData, setRecruiterData] = useState({});

  return (
    <UserContext.Provider value={{ userData, setUserData, recruiterData, setRecruiterData }}>
      {children}
    </UserContext.Provider>
  );
};

const useGlobalContext = () => useContext(UserContext);

export { ContextProvider, useGlobalContext };
