import React, { createContext, useState } from "react";

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
