import { useContext } from "react";
import { userContext } from "../context/user.context";

export const useAuth = () => {
  const { user, setUser, userLoading, setUserLoading, logout } = useContext(userContext);
  return { user, setUser, userLoading, setUserLoading, logout };
};
