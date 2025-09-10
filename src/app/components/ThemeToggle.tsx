"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className={`group rounded-lg p-2.5 shadow-sm backdrop-blur-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-400/70 ${
        theme === "dark"
          ? "border border-white/20 bg-white/20 text-white hover:bg-indigo-600/80 hover:scale-105"
          : "border border-gray-300/50 bg-white/80 text-gray-700 hover:bg-indigo-100/80 hover:scale-105"
      }`}
      aria-label={
        theme === "light" ? "Ativar modo escuro" : "Ativar modo claro"
      }
      title={theme === "light" ? "Modo escuro" : "Modo claro"}
    >
      {theme === "light" ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4 transition-transform duration-300 ease-out motion-reduce:transition-none group-hover:rotate-12 group-active:rotate-24"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4 transition-transform duration-300 ease-out motion-reduce:transition-none group-hover:rotate-12 group-active:rotate-24"
        >
          <circle cx="12" cy="12" r="5" />
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        </svg>
      )}
    </button>
  );
}
