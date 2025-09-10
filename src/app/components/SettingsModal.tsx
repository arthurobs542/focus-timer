"use client";

import { Dialog } from "@headlessui/react";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { useSettings } from "../contexts/SettingsContext";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const { theme } = useTheme();
  const { settings, updateSettings } = useSettings();
  const [pomodoro, setPomodoro] = useState(settings.pomodoro);
  const [shortBreak, setShortBreak] = useState(settings.shortBreak);
  const [longBreak, setLongBreak] = useState(settings.longBreak);
  const [autoBreaks, setAutoBreaks] = useState(settings.autoBreaks);
  const [autoPomodoro, setAutoPomodoro] = useState(settings.autoPomodoro);
  const [longBreakInterval, setLongBreakInterval] = useState(
    settings.longBreakInterval
  );

  // Update local state when settings change
  useEffect(() => {
    setPomodoro(settings.pomodoro);
    setShortBreak(settings.shortBreak);
    setLongBreak(settings.longBreak);
    setAutoBreaks(settings.autoBreaks);
    setAutoPomodoro(settings.autoPomodoro);
    setLongBreakInterval(settings.longBreakInterval);
  }, [settings]);

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div
        className={`fixed inset-0 ${
          theme === "dark" ? "bg-black/40" : "bg-black/20"
        }`}
        aria-hidden="true"
      />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel
          className={`w-full max-w-md rounded-2xl p-4 sm:p-6 shadow-lg ${
            theme === "dark"
              ? "bg-gray-900 border border-gray-700"
              : "bg-white border border-gray-200"
          }`}
        >
          <div className="flex justify-between items-center mb-6">
            <Dialog.Title
              className={`text-xl font-bold ${
                theme === "dark" ? "text-gray-200" : "text-gray-800"
              }`}
            >
              Configurações
            </Dialog.Title>
            <button
              onClick={onClose}
              className={`transition-colors ${
                theme === "dark"
                  ? "text-gray-400 hover:text-gray-100"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              ✕
            </button>
          </div>

          {/* Campos de tempo */}
          <h3
            className={`text-md font-semibold mb-3 ${
              theme === "dark" ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Tempo (minutos)
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
            <div className="flex flex-col">
              <label
                className={`text-sm mb-1 ${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Pomodoro
              </label>
              <input
                type="number"
                value={pomodoro}
                onChange={(e) => setPomodoro(Number(e.target.value))}
                className={`border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  theme === "dark"
                    ? "bg-gray-800 border-gray-600 text-white"
                    : "bg-white border-gray-300 text-gray-900"
                }`}
              />
            </div>
            <div className="flex flex-col">
              <label
                className={`text-sm mb-1 ${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Pausa Curta
              </label>
              <input
                type="number"
                value={shortBreak}
                onChange={(e) => setShortBreak(Number(e.target.value))}
                className={`border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  theme === "dark"
                    ? "bg-gray-800 border-gray-600 text-white"
                    : "bg-white border-gray-300 text-gray-900"
                }`}
              />
            </div>
            <div className="flex flex-col">
              <label
                className={`text-sm mb-1 ${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Pausa Longa
              </label>
              <input
                type="number"
                value={longBreak}
                onChange={(e) => setLongBreak(Number(e.target.value))}
                className={`border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  theme === "dark"
                    ? "bg-gray-800 border-gray-600 text-white"
                    : "bg-white border-gray-300 text-gray-900"
                }`}
              />
            </div>
          </div>

          {/* Toggles */}
          <div className="flex items-center justify-between mb-4">
            <span
              className={`text-sm ${
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Iniciar Automaticamente as Pausas?
            </span>
            <input
              type="checkbox"
              checked={autoBreaks}
              onChange={() => setAutoBreaks(!autoBreaks)}
              className="w-5 h-5 accent-blue-500"
            />
          </div>

          <div className="flex items-center justify-between mb-6">
            <span
              className={`text-sm ${
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Iniciar Automaticamente o Timer?
            </span>
            <input
              type="checkbox"
              checked={autoPomodoro}
              onChange={() => setAutoPomodoro(!autoPomodoro)}
              className="w-5 h-5 accent-blue-500"
            />
          </div>

          <div className="flex flex-col mb-6">
            <label
              className={`text-sm mb-1 ${
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Intervalo para Pausa Longa
            </label>
            <input
              type="number"
              value={longBreakInterval}
              onChange={(e) => setLongBreakInterval(Number(e.target.value))}
              className={`border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                theme === "dark"
                  ? "bg-gray-800 border-gray-600 text-white"
                  : "bg-white border-gray-300 text-gray-900"
              }`}
            />
          </div>

          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className={`px-4 py-2 rounded-lg transition-colors ${
                theme === "dark"
                  ? "bg-gray-700 text-gray-100 hover:bg-gray-600"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              Cancelar
            </button>
            <button
              onClick={() => {
                updateSettings({
                  pomodoro,
                  shortBreak,
                  longBreak,
                  autoBreaks,
                  autoPomodoro,
                  longBreakInterval,
                });
                onClose();
              }}
              className={`px-4 py-2 rounded-lg text-white transition-colors ${
                theme === "dark"
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              Salvar
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
