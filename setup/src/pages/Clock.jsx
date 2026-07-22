import React, { useEffect } from "react";

const Clock = () => {
  const [time, setTime] = React.useState(new Date().toLocaleTimeString());

  useEffect(() => {
    setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
  }, []);
  return <div>{time}</div>;
};

export default Clock;
