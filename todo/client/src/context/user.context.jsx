import { createContext, useEffect, useState } from "react";

const userContext = createContext(null);

const UserContext = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userLoading, setUserLoading] = useState(true);

  const getUser = async (token) => {
    try {
      const response = await fetch("http://localhost:8000/auth/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();

      if (!data.success) {
        console.error("Error fetching user:", data.message);
        return;
      }

      setUser(data.user);
    } catch (error) {
      console.error("Error fetching user:", error);
    } finally {
      setUserLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      getUser(token);
    } else {
      setUser(null);
      setUserLoading(false);
    }
  }, []);

  return <userContext.Provider value={{ user, userLoading }}>{children}</userContext.Provider>;
};

export { userContext, UserContext };
