"use client";

import { useEffect, useState } from "react";
import { useSettings } from "../contexts/SettingsContext";
import { useTheme } from "next-themes";

type Mode = "focus" | "short" | "long";

interface TimerProps {
  currentMode: Mode;
  onModeChange: (mode: Mode) => void;
}

export default function Timer({ currentMode, onModeChange }: TimerProps) {
  const { settings } = useSettings();
  const { theme } = useTheme();
  const [minutes, setMinutes] = useState(settings.pomodoro);
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

  // Sync timer display when the selected mode changes
  useEffect(() => {
    setIsRunning(false);
    if (currentMode === "focus") {
      setMinutes(settings.pomodoro);
      setSeconds(0);
    } else if (currentMode === "short") {
      setMinutes(settings.shortBreak);
      setSeconds(0);
    } else if (currentMode === "long") {
      setMinutes(settings.longBreak);
      setSeconds(0);
    }
  }, [currentMode, settings]);

  return (
    <div className="text-center">
      <div className="grid grid-cols-3 gap-2 sm:gap-3 justify-center mb-6">
        <button
          onClick={() => onModeChange("focus")}
          className={`px-3 py-2.5 sm:px-4 sm:py-3 rounded-lg font-semibold text-sm sm:text-base transition-all duration-300 ${
            currentMode === "focus"
              ? theme === "dark"
                ? "bg-indigo-700 text-white hover:bg-indigo-800"
                : "bg-indigo-600 text-white hover:bg-indigo-700"
              : theme === "dark"
              ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Focus
        </button>
        <button
          onClick={() => onModeChange("short")}
          className={`px-3 py-2.5 sm:px-4 sm:py-3 rounded-lg font-semibold text-sm sm:text-base transition-all duration-300 ${
            currentMode === "short"
              ? theme === "dark"
                ? "bg-emerald-700 text-white hover:bg-emerald-800"
                : "bg-emerald-600 text-white hover:bg-emerald-700"
              : theme === "dark"
              ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          <span className="hidden sm:inline">Short Break</span>
          <span className="sm:hidden">Short</span>
        </button>
        <button
          onClick={() => onModeChange("long")}
          className={`px-3 py-2.5 sm:px-4 sm:py-3 rounded-lg font-semibold text-sm sm:text-base transition-all duration-300 ${
            currentMode === "long"
              ? theme === "dark"
                ? "bg-amber-700 text-white hover:bg-amber-800"
                : "bg-amber-600 text-white hover:bg-amber-700"
              : theme === "dark"
              ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          <span className="hidden sm:inline">Long Break</span>
          <span className="sm:hidden">Long</span>
        </button>
      </div>
      <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold mb-6">
        {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
      </h1>
      <div>
        <button
          onClick={() => setIsRunning((r) => !r)}
          className={`px-6 py-3 rounded-lg font-semibold text-lg transition-all duration-200 hover:scale-105 ${
            isRunning
              ? theme === "dark"
                ? "bg-rose-700 text-white hover:bg-rose-800"
                : "bg-rose-600 text-white hover:bg-rose-700"
              : theme === "dark"
              ? "bg-blue-700 text-white hover:bg-blue-800"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {isRunning ? "Pause" : "Start"}
        </button>
      </div>
    </div>
  );
}
