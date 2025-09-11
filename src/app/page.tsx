"use client";
import { useState } from "react";
import { useTheme } from "next-themes";
import Sounds from "./components/Sounds";
import Timer from "./components/Timer";
import SettingsModal from "./components/SettingsModal";
import TasksManager from "./components/TasksManager";
import ThemeToggle from "./components/ThemeToggle";
import FeedbackButton from "./components/Feedbacks";

export default function Home() {
  const [isOpen, setISOpen] = useState(false);
  const [mode, setMode] = useState<"focus" | "short" | "long">("focus");
  const { theme } = useTheme();

  return (
    <main
      className={`relative flex min-h-screen w-full flex-col items-center justify-start pt-8 pb-8 px-4 transition-colors duration-500 ${
        theme === "dark"
          ? mode === "focus"
            ? "bg-indigo-950 text-white"
            : mode === "short"
            ? "bg-emerald-950 text-white"
            : "bg-amber-900 text-white"
          : mode === "focus"
          ? "bg-indigo-50 text-gray-900"
          : mode === "short"
          ? "bg-emerald-50 text-gray-900"
          : "bg-amber-50 text-gray-900"
      }`}
    >
      <button
        onClick={() => setISOpen(true)}
        className={`group absolute right-3 top-3 z-10 rounded-lg p-2.5 shadow-sm backdrop-blur-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-400/70 ${
          theme === "dark"
            ? "border border-white/20 bg-white/20 text-white hover:bg-indigo-600/80 hover:scale-105"
            : "border border-gray-300/50 bg-white/80 text-gray-700 hover:bg-indigo-100/80 hover:scale-105"
        }`}
        aria-label="Abrir configurações"
        title="Configurações"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4 transition-transform duration-300 ease-out motion-reduce:transition-none group-hover:rotate-90 group-active:rotate-180"
        >
          <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.61-.927 3.43.893 2.503 2.503a1.724 1.724 0 0 0 1.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 0 0-1.066 2.573c.927 1.61-.893 3.43-2.503 2.503a1.724 1.724 0 0 0-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 0 0-2.573-1.066c-1.61.927-3.43-.893-2.503-2.503a1.724 1.724 0 0 0-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35.73-.177 1.28-.746 1.066-2.573-.927-1.61.893-3.43 2.503-2.503.966.556 2.147.23 2.573-1.066Z" />
          <path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        </svg>
      </button>
      <ThemeToggle />
      <SettingsModal isOpen={isOpen} onClose={() => setISOpen(false)} />

      <div className="w-full max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8">
          Time to Focus ⏱️
        </h1>

        <Timer currentMode={mode} onModeChange={setMode} />

        <div className="flex justify-center">
          <Sounds />
        </div>

        <TasksManager />
        <FeedbackButton />
      </div>
    </main>
  );
}
