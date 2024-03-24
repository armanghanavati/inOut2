// MyContext.js
import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';

const MyContext = createContext();

export const MyProvider = ({ children }) => {
  const [sharedMonth, setSharedMonth] = useState(['']);
  const [sharedYear, setSharedYear] = useState(['']);
  useEffect(()=>{
    
  },[])
  return (
    <MyContext.Provider value={{ sharedMonth, setSharedMonth,sharedYear, setSharedYear}}>
      {children}
    </MyContext.Provider>
  );
};

export const useMyContext = () => {
  return useContext(MyContext);
};
