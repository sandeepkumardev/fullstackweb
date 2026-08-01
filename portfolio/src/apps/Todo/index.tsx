import { useEffect, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { v4 as uuid } from "uuid";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

interface ITodo {
  id: string;
  task: string;
  completed: boolean;
}

const Todo = () => {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState<ITodo[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTodo = { id: uuid(), task: input, completed: false };
    setTodos([...todos, newTodo]);
    setInput("");
  };

  const handleCompleted = (id: string) => {
    const updatedTodos = todos.map((obj) => {
      if (obj.id === id) {
        return { ...obj, completed: !obj.completed };
      }
      return obj;
    });
    setTodos(updatedTodos);
  };

  const handleDelete = (id: string) => {
    const updatedTodos = todos.filter((obj) => obj.id !== id);
    setTodos(updatedTodos);
  };

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  //hook
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    if (!token) {
      navigate("/signin");
    }
  }, [token]);

  if (!token) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-900 via-indigo-950 to-black flex justify-center items-center p-4 sm:p-8"></div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-indigo-950 to-black flex justify-center p-4 sm:p-8">
      <div className="w-full max-w-2xl rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl shadow-2xl p-6 sm:p-8">
        <h1 className="text-center text-4xl font-bold text-white">TODO</h1>

        <p className="mt-2 text-center text-gray-400">Manage your day!</p>

        <form onSubmit={handleSubmit} className="mt-8 flex gap-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add a new task..."
            className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-gray-500 outline-none transition focus:border-cyan-400"
          />

          <button
            type="submit"
            className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500 text-white transition hover:bg-cyan-600 active:scale-95"
          >
            <Plus size={22} />
          </button>
        </form>

        <div className="mt-8">
          {todos.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-white/10 bg-black/20 p-6 text-center text-sm leading-7 text-gray-400">
              <p className="mb-4 text-lg font-semibold text-white">Add Your First To-Do Item!</p>

              <p>
                Press <span className="font-semibold text-cyan-400">Enter</span> to add a task.
              </p>
              <p>Click the radio button to mark it complete.</p>
              <p>Use the trash icon to delete a task.</p>
              <p>Your data is stored locally in your browser.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {todos.map((todo) => (
                <div
                  key={todo.id}
                  className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:bg-white/10"
                >
                  <input
                    checked={todo.completed}
                    type="checkbox"
                    onChange={() => handleCompleted(todo.id)}
                    className="h-5 w-5 accent-cyan-500"
                  />

                  <p className={`flex-1 wrap-break-word text-white ${todo.completed ? "text-gray-500 line-through" : ""}`}>
                    {todo.task}
                  </p>

                  <button
                    onClick={() => handleDelete(todo.id)}
                    className="rounded-lg p-2 text-red-400 transition hover:bg-red-500/10 hover:text-red-500"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Todo;
