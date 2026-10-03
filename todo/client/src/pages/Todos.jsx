import { useContext, useEffect, useRef, useState } from "react";
import { Loader, Loader2, PenSquare, Plus, PlusCircle, Trash2 } from "lucide-react";
import "../styles/todos.scss";
import withAuth from "../components/withAuth";
import { useAuth } from "../hooks/useAuth";
import { todosContext } from "../context/todo.context";

const Todos = () => {
  const inputRef = useRef(null);
  const { user } = useAuth();
  const [input, setInput] = useState("");
  const { todos, todosLoading, setTodos, setTodosLoading } = useContext(todosContext);
  // const [todos, setTodos] = useState([]);
  // const [todosLoading, setTodosLoading] = useState(false);
  const [addingTodo, setAddingTodo] = useState(false);
  const [updateStatus, setUpdateStatus] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);
  const [deletingTodo, setDeletingTodo] = useState(null);
  const [duplicateTodo, setDuplicateTodo] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setAddingTodo(true);
    try {
      const response = await fetch("http://localhost:8000/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ title: input, user_id: user.id }),
      });
      const data = await response.json();

      if (!data.success) {
        console.error("Error adding todo:", data.message);
        return;
      }

      setTodos([...todos, data.todo]);
    } catch (error) {
      console.error("Error adding todo:", error);
    } finally {
      setAddingTodo(false);
      setInput("");
    }
  };

  const handleDuplicate = async ({ id, title }) => {
    setDuplicateTodo(id);
    try {
      const response = await fetch("http://localhost:8000/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ title: title, user_id: user.id }),
      });
      const data = await response.json();

      if (!data.success) {
        console.error("Error adding todo:", data.message);
        return;
      }

      setTodos([...todos, data.todo]);
    } catch (error) {
      console.error("Error adding todo:", error);
    } finally {
      setDuplicateTodo(null);
    }
  };

  const handleCompleted = async (id) => {
    setUpdateStatus(id);
    try {
      // find current todo status
      const status = todos.find((obj) => obj.id === id).completed;

      const response = await fetch(`http://localhost:8000/todos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ completed: !status }),
      });

      const data = await response.json();

      if (!data.success) {
        console.error("Error updating todo:", data.message);
        return;
      }

      const updatedTodos = todos.map((obj) => {
        if (obj.id === id) {
          return { ...obj, completed: !obj.completed };
        }
        return obj;
      });
      setTodos(updatedTodos);
    } catch (error) {
      console.error("Error updating todo:", error);
    } finally {
      setUpdateStatus(null);
    }
  };

  const handleDelete = async (id) => {
    setDeletingTodo(id);
    try {
      const todo = todos.find((obj) => obj.id === id);

      const updatedTodos = todos.filter((obj) => obj.id !== id);
      setTodos(updatedTodos);

      const response = await fetch(`http://localhost:8000/todos/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await response.json();

      if (!data.success) {
        console.error("Error deleting todo:", data.message);
        setTodos([...updatedTodos, todo]);
        return;
      }

      console.log("deleted");
    } catch (error) {
      console.error("Error deleting todo:", error);
    } finally {
      setDeletingTodo(null);
    }
  };

  const fetchTodosAPI = async () => {
    setTodosLoading(true);
    try {
      const response = await fetch("http://localhost:8000/todos", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      setTodos(data.todos);
    } catch (error) {
      console.error("Error fetching todos:", error);
    } finally {
      setTodosLoading(false);
    }
  };

  useEffect(() => {
    if (!todos.length) fetchTodosAPI();
  }, []);

  useEffect(() => {
    inputRef.current.focus();
  }, [todos]);

  return (
    <div className="todos-container">
      <h1 className="heading">To-Do</h1>

      <h6 className="font">Manage your day!</h6>

      <form onSubmit={handleSubmit} className={`form ${addingTodo ? "disabled" : ""}`}>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => !addingTodo && setInput(e.target.value)}
          disabled={addingTodo}
        />
        <button type="submit">{addingTodo ? <Loader className="spin" /> : <Plus className="icon" />}</button>
      </form>

      <div className="todos_container">
        {todos.length === 0 && !todosLoading && (
          <div className="tips">
            Add Your First To-Do Item! <br />
            📝 Usage Tips 💡: <br /> ✔️ Press Enter to submit actions. <br /> ✔️ Drag to reorder your to-dos (PC only) <br />{" "}
            ✔️ Double-click to edit slogan and tasks. <br /> ✔️ Access quick actions in the right sidebar. <br /> 🔒 Your
            data is stored locally in your browser. <br /> 📝 Supports data download and import.
          </div>
        )}

        {todosLoading && <div className="todos-loading">Loading...</div>}

        {todos.map((todo, index) => {
          return (
            <div key={index} className="todo_item">
              {updateStatus === todo.id ? (
                <Loader2 className="spin" />
              ) : (
                <input checked={todo.completed} type="checkbox" onChange={() => handleCompleted(todo.id)} />
              )}
              <p>{todo.title}</p>
              {deletingTodo === todo.id ? (
                <Loader2 className="spin trash" />
              ) : (
                <Trash2 className="trash" onClick={() => handleDelete(todo.id)} />
              )}

              {duplicateTodo ? (
                <Loader2 className="spin duplicate" />
              ) : (
                <PlusCircle className="duplicate" onClick={() => handleDuplicate(todo)} />
              )}

              <PenSquare className="edit" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default withAuth(Todos);
