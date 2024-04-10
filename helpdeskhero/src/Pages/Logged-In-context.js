import React, { createContext, useState } from "react";
import Login from './Login'
export const loggedInContext = createContext();

export const LoggedInProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <loggedInContext.Provider
      value={{
        loggedIn,
        setLoggedIn,
      }}
    >
      {children}
    </loggedInContext.Provider>
  );
};

