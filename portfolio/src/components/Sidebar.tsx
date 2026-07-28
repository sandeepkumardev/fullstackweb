import { ChevronRight, X, Clock3, Timer, ListTodo } from "lucide-react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed left-0 top-1/2 z-40 -translate-y-1/2 rounded-r-full bg-cyan-500 p-3 text-white shadow-lg hover:bg-cyan-600"
      >
        <ChevronRight size={22} />
      </button>

      {/* Overlay */}
      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        {/* Sidebar */}
        <div
          onClick={(e) => e.stopPropagation()}
          className={`absolute left-0 top-0 h-screen w-72 max-w-[80%] bg-slate-900 border-r border-white/10 shadow-2xl duration-300 ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 p-5">
            <h2 className="text-xl font-bold text-white">Mini Projects</h2>

            <button
              onClick={() => setIsOpen(false)}
              className="rounded-lg p-2 text-gray-400 transition hover:bg-white/10 hover:text-white"
            >
              <X size={20} />
            </button>
          </div>

          {/* Menu */}
          <div className="space-y-2 p-4">
            <ListItem icon={<Clock3 size={18} />} title="Clock" path="/clock" setIsOpen={setIsOpen} />

            <ListItem icon={<Timer size={18} />} title="Stopwatch" path="/stopwatch" setIsOpen={setIsOpen} />

            <ListItem icon={<ListTodo size={18} />} title="Todo" path="/todo" setIsOpen={setIsOpen} />
          </div>
        </div>
      </div>
    </>
  );
};

const ListItem = ({
  icon,
  title,
  path,
  setIsOpen,
}: {
  icon: React.ReactNode;
  title: string;
  path: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const active = location.pathname === path;

  const handleClick = () => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <button
      onClick={handleClick}
      className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-gray-300 transition ${
        active ? "bg-cyan-500 text-white" : "text-gray-300 hover:bg-cyan-500 hover:text-white"
      }`}
    >
      {icon}
      <span>{title}</span>
    </button>
  );
};

export default Sidebar;
