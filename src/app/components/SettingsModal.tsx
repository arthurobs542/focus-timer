"use client";

import { Dialog } from "@headlessui/react";
import { useState } from "react";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const [pomodoro, setPomodoro] = useState(25);
  const [shortBreak, setShortBreak] = useState(5);
  const [longBreak, setLongBreak] = useState(15);
  const [autoBreaks, setAutoBreaks] = useState(true);
  const [autoPomodoro, setAutoPomodoro] = useState(true);
  const [longBreakInterval, setLongBreakInterval] = useState(4);

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/40" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md rounded-2xl bg-white dark:bg-gray-900 p-6 shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <Dialog.Title className="text-xl font-bold text-gray-800 dark:text-gray-200">
              Configurações
            </Dialog.Title>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-800 dark:hover:text-gray-100"
            >
              ✕
            </button>
          </div>

          {/* Campos de tempo */}
          <h3 className="text-md font-semibold text-gray-700 dark:text-gray-300 mb-3">
            Tempo (minutos)
          </h3>
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="flex flex-col">
              <label className="text-sm mb-1">Pomodoro</label>
              <input
                type="number"
                value={pomodoro}
                onChange={(e) => setPomodoro(Number(e.target.value))}
                className="border rounded-md p-2 dark:bg-gray-800 dark:border-gray-600"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm mb-1">Pausa Curta</label>
              <input
                type="number"
                value={shortBreak}
                onChange={(e) => setShortBreak(Number(e.target.value))}
                className="border rounded-md p-2 dark:bg-gray-800 dark:border-gray-600"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm mb-1">Pausa Longa</label>
              <input
                type="number"
                value={longBreak}
                onChange={(e) => setLongBreak(Number(e.target.value))}
                className="border rounded-md p-2 dark:bg-gray-800 dark:border-gray-600"
              />
            </div>
          </div>

          {/* Toggles */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-gray-700 dark:text-gray-300">
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
            <span className="text-sm text-gray-700 dark:text-gray-300">
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
            <label className="text-sm mb-1">Intervalo para Pausa Longa</label>
            <input
              type="number"
              value={longBreakInterval}
              onChange={(e) => setLongBreakInterval(Number(e.target.value))}
              className="border rounded-md p-2 dark:bg-gray-800 dark:border-gray-600"
            />
          </div>

          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              Cancelar
            </button>
            <button
              onClick={() => {
                // Aqui você pode salvar as configs no contexto ou localStorage
                console.log({
                  pomodoro,
                  shortBreak,
                  longBreak,
                  autoBreaks,
                  autoPomodoro,
                  longBreakInterval,
                });
                onClose();
              }}
              className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
            >
              Salvar
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
