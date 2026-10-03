import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { UserContext } from "./context/user.context.jsx";
import { TodosContext } from "./context/todo.context.jsx";

createRoot(document.getElementById("root")).render(
  <UserContext>
    <TodosContext>
      <App />
    </TodosContext>
  </UserContext>,
);
