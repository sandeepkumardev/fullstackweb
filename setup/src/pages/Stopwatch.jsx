import React, { useEffect, useState } from "react";

const Clock = () => {
  // const [second, setSecond] = useState(0);
  // const [minute, setMinute] = useState(0);
  // const [hour, setHour] = useState(0);

  const [stop, setStop] = useState(false);
  const [reset, setReset] = useState(false);

  const [records, setRecords] = useState([]);
  const [time, setTime] = useState({
    second: 0,
    minute: 0,
    hour: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      // setSecond((prev) => {
      //   if (prev === 59) {
      //     setMinute((prev) => {
      //       if (prev === 59) {
      //         setHour((prev) => {
      //           if (prev === 23) {
      //             return 0;
      //           }
      //           return prev + 1;
      //         });
      //         return 0;
      //       }
      //       return prev + 1;
      //     });
      //     return 0;
      //   }
      //   return prev + 1;
      // });

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
    }, 15);

    if (stop) {
      clearInterval(timer);
    }

    if (reset) {
      clearInterval(timer);
      setRecords([...records, `${time.hour}:${time.minute}:${time.second}`]);
      setTime({
        second: 0,
        minute: 0,
        hour: 0,
      });
      setStop(true);
      setReset(false);
    }

    return () => clearInterval(timer);
  }, [stop, reset]);

  const fs = (str) => {
    return String(str).padStart(2, "0");
  };

  return (
    <div>
      <button onClick={() => setReset(true)}>Reset</button>
      <button onClick={() => setStop(!stop)}>{stop ? "Start" : "Stop"}</button>
      {fs(time.hour)}:{fs(time.minute)}:{fs(time.second)}
      <br />
      <ul>
        {records.map((record) => (
          <li>{record}</li>
        ))}
      </ul>
    </div>
  );
};

export default Clock;
