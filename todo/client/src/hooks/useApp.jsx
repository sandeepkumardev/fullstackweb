import { useContext } from "react";
import { appContext } from "../context/app.context";

export const useApp = () => {
  const { toast, setToast } = useContext(appContext);
  return { toast, setToast };
};
