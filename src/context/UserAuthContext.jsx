import { createContext, useState } from "react";

const UserAuthContext = createContext();

const UserAuthContextProvider = (props) => {
  const [myVar, setMyVar] = useState(10);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <>
      <UserAuthContext.Provider
        value={{ myVar, setMyVar, isLoggedIn, setIsLoggedIn }}
      >
        {props.children}
      </UserAuthContext.Provider>
    </>
  );
};

export { UserAuthContext, UserAuthContextProvider };
