import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const StopWatch = () => {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [stop, setStop] = useState(true);
  const [records, setRecords] = useState<string[]>([]);
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

  const formatTimeString = (time: { hour: number; minute: number; second: number; ms: number }) => {
    const fs = (str: number) => String(str).padStart(2, "0");
    return `${fs(time.hour)}:${fs(time.minute)}:${fs(time.second)}.${fs(time.ms)}`;
  };

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
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-indigo-950 to-black flex items-center justify-center p-4">
      <div className="w-full max-w-xl rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl shadow-2xl p-6 sm:p-8">
        <h1 className="text-center text-2xl sm:text-3xl font-bold text-white">Stopwatch</h1>

        <p className="mt-2 text-center text-gray-400">Measure your time precisely</p>

        <div className="mt-8 text-center">
          <span
            className="
              block
              w-full
              text-center
              font-mono
              font-bold
              tracking-wider
              text-cyan-400
              text-3xl
              sm:text-5xl
              md:text-6xl
              lg:text-7xl
              drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]
              break-all
            "
          >
            {formatTimeString(time)}
          </span>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <button
            onClick={handleReset}
            className="flex-1 rounded-xl bg-red-500 py-3 text-white font-semibold transition hover:bg-red-600 active:scale-95"
          >
            Reset
          </button>

          <button
            onClick={stop ? handleStart : handleStop}
            className={`flex-1 rounded-xl py-3 font-semibold text-white transition active:scale-95 ${
              stop ? "bg-emerald-500 hover:bg-emerald-600" : "bg-yellow-500 hover:bg-yellow-600"
            }`}
          >
            {stop ? "Start" : "Stop"}
          </button>
        </div>

        <div className="mt-10">
          <h2 className="mb-4 text-lg font-semibold text-white">Records</h2>

          <div className="max-h-72 overflow-y-auto rounded-xl bg-black/20 p-3">
            {records.length === 0 ? (
              <p className="text-center text-gray-500">No records yet</p>
            ) : (
              <ul className="space-y-3">
                {records.map((record, index) => (
                  <li
                    className="
                      flex
                      flex-col
                      sm:flex-row
                      items-center
                      justify-between
                      gap-2
                      rounded-lg
                      bg-white/5
                      px-3
                      py-3
                    "
                    key={index}
                  >
                    <span className="text-gray-400">Lap #{index + 1}</span>
                    <span className="font-mono text-lg sm:text-xl text-cyan-400 break-all">{record}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StopWatch;
