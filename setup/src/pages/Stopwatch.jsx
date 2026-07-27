import React, { useEffect, useState } from "react";

const StopWatch = () => {
  const [stop, setStop] = useState(false);
  const [records, setRecords] = useState([]);
  const [time, setTime] = useState({
    ms: 0,
    second: 0,
    minute: 0,
    hour: 0,
  });

  useEffect(() => {
    if (stop) return;

    const timer = setInterval(() => {
      setTime((prev) => {
        let { ms, second, minute, hour } = prev;

        ms++;

        if (ms === 100) {
          ms = 0;
          second = second + 1;
        }

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
          ms,
          second,
          minute,
          hour,
        };
      });
    }, 10);

    return () => clearInterval(timer);
  }, [stop]);

  const handleStop = () => {
    setStop(true);
    setRecords([...records, formatTimeString(time)]);
  };

  const handleStart = () => {
    setStop(false);
  };

  const handleReset = () => {
    setTime({
      ms: 0,
      second: 0,
      minute: 0,
      hour: 0,
    });
    setStop(true);
    setRecords([]);
  };

  const formatTimeString = (time) => {
    const fs = (str) => String(str).padStart(2, "0");
    return `${fs(time.hour)}:${fs(time.minute)}:${fs(time.second)}:${fs(time.ms)}`;
  };

  return (
    <div>
      <button onClick={handleReset}>Reset</button>
      <button onClick={stop ? handleStart : handleStop}>{stop ? "Start" : "Stop"}</button>
      {formatTimeString(time)}
      <br />
      <ul>
        {records.map((record) => (
          <li>{record}</li>
        ))}
      </ul>
    </div>
  );
};

export default StopWatch;
