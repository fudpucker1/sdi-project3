import React, { createContext, useState } from "react";

export const loggedInContext = createContext();


export const LoggedInProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [ userType, setUserType ] = useState(0) //1=Admin, 2=Agent, 3=Supervisors, 4=Project Managers, 5=Auditor
  const [ userId, setUserId ] = useState(0)
  const [ refreshToggle, setRefreshToggle ] = useState(false)
  return (
    <loggedInContext.Provider
      value={{
        loggedIn,
        setLoggedIn,
        userType,
        setUserType,
        userId,
        setUserId,
        refreshToggle,
        setRefreshToggle
      }}
    >
      {children}
    </loggedInContext.Provider>
  );
};

