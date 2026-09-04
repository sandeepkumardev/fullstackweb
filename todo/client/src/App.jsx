import { useEffect, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import "./App.css";
import { v4 as uuid } from "uuid";

const App = () => {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTodo = { id: uuid(), title: input, completed: false };

    try {
      const response = await fetch("http://localhost:8000/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTodo),
      });
      const data = await response.json();

      if (!data.success) {
        console.error("Error adding todo:", data.message);
        return;
      }

      setTodos([...todos, newTodo]);
    } catch (error) {
      console.error("Error adding todo:", error);
    }

    setInput("");
  };

  const handleCompleted = (id) => {
    // server update call
    const updatedTodos = todos.map((obj) => {
      if (obj.id === id) {
        return { ...obj, completed: !obj.completed };
      }
      return obj;
    });
    setTodos(updatedTodos);
  };

  const handleDelete = (id) => {
    // server delte
    // success - true
    const updatedTodos = todos.filter((obj) => obj.id !== id);
    setTodos(updatedTodos);
  };

  const fetchTodosAPI = async () => {
    try {
      const response = await fetch("http://localhost:8000/todos");
      const data = await response.json();
      console.log(data);
      setTodos(data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  useEffect(() => {
    // api call to fastAPI server
    fetchTodosAPI();

    // const storedTodos = localStorage.getItem("todos");
    // if (storedTodos) {
    //   // eslint-disable-next-line react-hooks/set-state-in-effect
    //   setTodos(JSON.parse(storedTodos));
    // }
  }, []);

  //hook
  // useEffect(() => {
  //   localStorage.setItem("todos", JSON.stringify(todos));
  // }, [todos]);

  return (
    <div className="App">
      <h1 className="heading font">TODO</h1>

      <h6 className="font">Manage your day!</h6>

      <form onSubmit={handleSubmit} className="form">
        <input value={input} onChange={(e) => setInput(e.target.value)} />
        <button type="submit">
          <Plus className="icon" />
        </button>
      </form>

      <div className="todos_container">
        {todos.length === 0 && (
          <div className="tips">
            Add Your First To-Do Item! <br />
            📝 Usage Tips 💡: <br /> ✔️ Press Enter to submit actions. <br /> ✔️ Drag to reorder your to-dos (PC only) <br />{" "}
            ✔️ Double-click to edit slogan and tasks. <br /> ✔️ Access quick actions in the right sidebar. <br /> 🔒 Your
            data is stored locally in your browser. <br /> 📝 Supports data download and import.
          </div>
        )}

        {todos.map((todo, index) => {
          return (
            <div key={index} className="todo_item">
              <input checked={todo.completed} type="radio" onChange={() => handleCompleted(todo.id)} />
              <p>{todo.title}</p>
              <Trash2 onClick={() => handleDelete(todo.id)} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;
