import React, { useState } from "react";
import Navigation from "../components/Navigation";

const Counter = () => {
  const [count, setCount] = React.useState(0);

  const [input, setInput] = useState("");
  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const add = () => {
    setCount((prev) => prev + 1);
  };

  const sub = () => {
    if (count <= 0) return;
    setCount(count - 1);
  };

  return (
    <div>
      <input value={input} onChange={handleInput} />
      <br />

      {count}
      <button onClick={add}>+</button>
      <button onClick={sub}>-</button>
    </div>
  );
};

export default Counter;
