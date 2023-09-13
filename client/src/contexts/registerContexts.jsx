import { createContext, useContext, useState } from "react";

const UserContext = createContext();

// eslint-disable-next-line react/prop-types
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

// eslint-disable-next-line react-refresh/only-export-components
export { ContextProvider, useGlobalContext };
