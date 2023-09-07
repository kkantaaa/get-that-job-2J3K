import { createContext, useContext, useState } from "react";

const UserContext = createContext();

const ContextProvider = ({ children }) => {
  const [userData, setUserData] = useState({});

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};

const useGlobalContext = () => useContext(UserContext);

export { ContextProvider, useGlobalContext };
