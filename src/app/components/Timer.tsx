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
          className="px-4 bg-green-500 text-white text-2xl font-bold rounded-xl hover:bg-green-700"
        >
          Start
        </button>
        <button
          onClick={() => setIsRunning(false)}
          className="py-2 bg-yellow-500 text-white text-2xl font-bold rounded-xl hover:bg-yellow-600"
        >
          Pause
        </button>
        <button
          onClick={() => {
            setIsRunning(false);
            setMinutes(25);
            setSeconds(0);
          }}
          className="px-4 bg-red-500 text-white text-2xl font-bold rounded-xl hover:bg-red-600"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
