import React, { useEffect, useState } from "react";

const Clock = () => {
  // const [second, setSecond] = useState(0);
  // const [minute, setMinute] = useState(0);
  // const [hour, setHour] = useState(0);

  const [time, setTime] = useState({
    second: 57,
    minute: 58,
    hour: 23,
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
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const fs = (str) => {
    return String(str).padStart(2, "0");
  };

  return (
    <div>
      {fs(time.hour)}:{fs(time.minute)}:{fs(time.second)}
    </div>
  );
};

export default Clock;
