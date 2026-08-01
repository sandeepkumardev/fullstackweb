// context api
// store -> data -> state
// provider -> App.tsx

import { createContext, useState } from "react";

interface IUserContext {
  token: string | null;
  setToken: (token: string | null) => void;
}

export const userContext = createContext({} as IUserContext);

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);

  return <userContext.Provider value={{ token, setToken }}>{children}</userContext.Provider>;
};

export default UserProvider;

// props drilling
// context api
// custom hook

// HOC
