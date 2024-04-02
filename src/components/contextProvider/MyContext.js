import { createContext, useContext, useEffect, useState } from "react";

const MyContext = createContext();
export const MyProvider = ({ children }) => {
  const [sharedMonth, setSharedMonth] = useState([""]);
  const [sharedYear, setSharedYear] = useState([""]);
  const [userRole, setUserRole] = useState({});

  return (
    <MyContext.Provider
      value={{
        sharedMonth,
        setSharedMonth,
        sharedYear,
        setSharedYear,
        userRole,
        setUserRole,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export const useMyContext = () => {
  return useContext(MyContext);
};
