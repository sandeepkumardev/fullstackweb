import { useContext, useEffect, useState } from "react";
import "../styles/toast.scss";
import { todosContext } from "../context/todo.context";

const Toast = () => {
  const { toast, setToast } = useContext(todosContext);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!toast.message) return;

    setVisible(true);

    const hideTimer = setTimeout(() => {
      setVisible(false);
    }, 3000);

    const clearTimer = setTimeout(() => {
      setToast({ type: "info", message: "" });
    }, 3500);

    return () => {
      clearTimeout(hideTimer);
      clearTimeout(clearTimer);
    };
  }, [toast, setToast]);

  return <div className={`toast ${toast.type} ${visible ? "show" : ""}`}>{toast.message}</div>;
};

export default Toast;
