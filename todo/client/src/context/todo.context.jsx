import { createContext, useState } from "react";

const todosContext = createContext(null);

const TodosContext = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [todosLoading, setTodosLoading] = useState(false);

  const [toast, setToast] = useState({
    type: "info",
    message: null,
  });

  return (
    <todosContext.Provider value={{ todos, setTodos, todosLoading, setTodosLoading, toast, setToast }}>
      {children}
    </todosContext.Provider>
  );
};

export { todosContext, TodosContext };
