import { ChevronRight, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed -left-7 top-1/2 rounded-full cursor-pointer bg-amber-500/50 hover:bg-amber-500 w-12 flex justify-end"
      >
        <ChevronRight className="" />
      </button>
      <div className={`${isOpen ? "block" : "hidden"} fixed top-0 left-0 bg-gray-800/50 h-screen w-screen`}>
        <div className="absolute w-75 bg-white h-screen">
          <button className="cursor-pointer absolute top-2 right-2" onClick={() => setIsOpen(false)}>
            <X />
          </button>

          <div className="flex flex-col gap-2 p-4 pt-10">
            <ListItem title="Clock" path="/clock" setIsOpen={setIsOpen} />
            <ListItem title="StopWatch" path="/stopwatch" setIsOpen={setIsOpen} />
          </div>
        </div>
      </div>
    </div>
  );
};

const ListItem = ({
  title,
  path,
  setIsOpen,
}: {
  title: string;
  path: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(path);
    setIsOpen(false);
  };
  return (
    <button onClick={handleClick} className="bg-amber-200 rounded px-2 text-left cursor-pointer">
      {title}
    </button>
  );
};

export default Sidebar;
