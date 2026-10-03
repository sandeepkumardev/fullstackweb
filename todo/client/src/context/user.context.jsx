import { createContext, useState } from "react";

const userContext = createContext(null);

const UserContext = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userLoading, setUserLoading] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <userContext.Provider value={{ user, setUser, userLoading, setUserLoading, logout }}>{children}</userContext.Provider>
  );
};

export { userContext, UserContext };
