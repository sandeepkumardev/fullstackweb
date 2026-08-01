import { useContext } from "react";
import { userContext } from "../context/user.context";

const useAuth = () => {
  const { token, setToken } = useContext(userContext);

  // server call -> db -> token -> localStorage

  return { token, setToken };
};

export default useAuth;
