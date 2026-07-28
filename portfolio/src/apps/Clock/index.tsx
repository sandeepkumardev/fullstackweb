import { useEffect, useState } from "react";

const Clock = () => {
  const [time, setTime] = useState({
    second: new Date().getSeconds(),
    minute: new Date().getMinutes(),
    hour: new Date().getHours(),
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => {
        let { second, minute, hour } = prev;

        second++;

        if (second === 60) {
          second = 0;
          minute++;
        }

        if (minute === 60) {
          minute = 0;
          hour++;
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

  const fs = (str: number) => String(str).padStart(2, "0");

  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-slate-900 via-indigo-950 to-black p-4">
      <div className="w-full max-w-5xl rounded-3xl border border-white/10 bg-white/10 p-4 sm:p-6 md:p-10 backdrop-blur-xl shadow-2xl">
        <h2 className="mb-6 text-center text-sm sm:text-base font-semibold uppercase tracking-[0.4em] text-indigo-300">
          Digital Clock
        </h2>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <TimeBox value={fs(time.hour)} label="Hours" />

          <span className="hidden sm:block text-5xl md:text-7xl font-bold text-indigo-400">:</span>

          <TimeBox value={fs(time.minute)} label="Minutes" />

          <span className="hidden sm:block text-5xl md:text-7xl font-bold text-indigo-400">:</span>

          <TimeBox value={fs(time.second)} label="Seconds" />
        </div>
      </div>
    </div>
  );
};

const TimeBox = ({ value, label }: { value: string; label: string }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="flex h-24 w-24 sm:h-28 sm:w-28 md:h-36 md:w-36 items-center justify-center rounded-2xl bg-linear-to-b from-slate-800 to-slate-900 shadow-xl ring-1 ring-white/10">
        <span className="font-mono text-4xl sm:text-5xl md:text-7xl font-bold text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]">
          {value}
        </span>
      </div>

      <span className="mt-3 text-xs uppercase tracking-[0.25em] text-gray-400">{label}</span>
    </div>
  );
};

export default Clock;
