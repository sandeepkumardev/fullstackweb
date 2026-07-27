import { useEffect, useState } from "react";

const Clock = () => {
  const [time, setTime] = useState({
    second: 0,
    minute: 0,
    hour: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => {
        let { second, minute, hour } = prev;

        second++;

        if (second === 60) {
          second = 0;
          minute = minute + 1;
        }

        if (minute === 60) {
          minute = 0;
          hour = hour + 1;
        }

        if (hour === 24) {
          hour = 0;
        }

        return {
          second,
          minute,
          hour,
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const fs = (str: number) => {
    return String(str).padStart(2, "0");
  };

  return (
    <div>
      {fs(time.hour)}:{fs(time.minute)}:{fs(time.second)}
    </div>
  );
};

export default Clock;
