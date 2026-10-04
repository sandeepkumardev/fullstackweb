import { createContext, useState } from "react";

const appContext = createContext(null);

const AppContext = ({ children }) => {
  const [toast, setToast] = useState({
    type: "info",
    message: null,
  });

  return <appContext.Provider value={{ toast, setToast }}>{children}</appContext.Provider>;
};

export { appContext, AppContext };
