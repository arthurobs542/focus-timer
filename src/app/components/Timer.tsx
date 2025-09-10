"use client";

import { useEffect, useState } from "react";

type Mode = "focus" | "short" | "long";

interface TimerProps {
  currentMode: Mode;
  onModeChange: (mode: Mode) => void;
}

export default function Timer({ currentMode, onModeChange }: TimerProps) {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const SHORT_BREAK = 5;
  const LONG_BREAK = 15;

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

  // Sync timer display when the selected mode changes
  useEffect(() => {
    setIsRunning(false);
    if (currentMode === "focus") {
      setMinutes(25);
      setSeconds(0);
    } else if (currentMode === "short") {
      setMinutes(SHORT_BREAK);
      setSeconds(0);
    } else if (currentMode === "long") {
      setMinutes(LONG_BREAK);
      setSeconds(0);
    }
  }, [currentMode]);

  return (
    <div className="text-center">
      <div className="mt-4 grid grid-cols-3 gap-3 justify-center">
        <button
          onClick={() => onModeChange("focus")}
          className={`py-4 rounded-xl font-bold transition-all duration-300 ${
            currentMode === "focus"
              ? " bg-indigo-600 text-white hover:bg-indigo-700 "
              : "bg-gray-500 text-black hover:bg-gray-900 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
          } `}
        >
          Focus
        </button>
        <button
          onClick={() => onModeChange("short")}
          className={`px-4 rounded-xl font-bold   ${
            currentMode === "short"
              ? " bg-emerald-600 text-white hover:bg-emerald-700 "
              : "bg-gray-500 text-black hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
          } `}
        >
          Short Break
        </button>
        <button
          onClick={() => onModeChange("long")}
          className={`px-4 rounded-xl font-bold   ${
            currentMode === "long"
              ? " bg-amber-600 text-white hover:bg-amber-700 "
              : "bg-gray-500 text-black hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
          } `}
        >
          Long Break
        </button>
      </div>
      <h1 className="text-8xl font-bold">
        {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
      </h1>
      <div className="mt-6">
        <button
          onClick={() => setIsRunning((r) => !r)}
          className={`px-6 py-3 rounded-xl font-bold transition-colors duration-200 ${
            isRunning
              ? " bg-rose-600 text-white hover:bg-rose-700 "
              : " bg-blue-600 text-white hover:bg-blue-700 "
          }`}
        >
          {isRunning ? "Pause" : "Start"}
        </button>
      </div>
    </div>
  );
}
