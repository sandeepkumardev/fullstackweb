import { createContext, useState } from "react";

const todosContext = createContext(null);

const TodosContext = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [todosLoading, setTodosLoading] = useState(false);

  return (
    <todosContext.Provider value={{ todos, setTodos, todosLoading, setTodosLoading }}>{children}</todosContext.Provider>
  );
};

export { todosContext, TodosContext };
