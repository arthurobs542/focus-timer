"use client";

import { useEffect, useState } from "react";

export default function Timer() {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning) {
      timer = setInterval(() => {
        if (seconds > 0) {
          setSeconds((s) => s - 1);
        } else if (minutes > 0) {
          setMinutes((m) => m - 1);
          setSeconds(59);
        } else {
          setIsRunning(false);
        }
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, minutes, seconds]);

  return (
    <div className="text-center">
      <h1 className="text-8xl font-black">
        {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
      </h1>
      <div className="mt-4 grid grid-cols-3 gap-3 justify-center">
        <button
          onClick={() => setIsRunning(true)}
          className={`py-4 rounded-xl font-bold transition-all duration-300 ${
            isRunning
              ? " bg-green-600 text-white "
              : "bg-gray-500 text-black hover:bg-gray-900 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
          } `}
        >
          Start
        </button>
        <button
          onClick={() => setIsRunning(false)}
          className={`px-4 rounded-xl font-bold   ${
            isRunning
              ? " bg-amber-500 text-white "
              : "bg-gray-500 text-black hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
          } `}
        >
          Pause
        </button>
        <button
          onClick={() => {
            setIsRunning(false);
            setMinutes(25);
            setSeconds(0);
          }}
          className={`px-4 rounded-xl font-bold  ${
            isRunning
              ? " bg-red-500 text-white "
              : "bg-gray-200 text-black hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
          } `}
        >
          Reset
        </button>
      </div>
    </div>
  );
}
