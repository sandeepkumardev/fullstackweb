import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { UserContext } from "./context/user.context.jsx";
import { TodosContext } from "./context/todo.context.jsx";
import { AppContext } from "./context/app.context.jsx";

createRoot(document.getElementById("root")).render(
  <AppContext>
    <UserContext>
      <TodosContext>
        <App />
      </TodosContext>
    </UserContext>
  </AppContext>,
);
