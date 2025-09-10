"use client";

import { useState } from "react";
import { useTheme } from "next-themes";
import { useTasks, Task } from "../contexts/TasksContext";

export default function TasksManager() {
  const { theme } = useTheme();
  const {
    tasks,
    completedTasks,
    addTask,
    completeTask,
    deleteTask,
    addPomodoroToTask,
  } = useTasks();
  const [showCompleted, setShowCompleted] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [newTaskEstimated, setNewTaskEstimated] = useState(1);
  const [isAddingTask, setIsAddingTask] = useState(false);

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTaskTitle.trim()) {
      addTask(
        newTaskTitle.trim(),
        newTaskDescription.trim() || undefined,
        newTaskEstimated
      );
      setNewTaskTitle("");
      setNewTaskDescription("");
      setNewTaskEstimated(1);
      setIsAddingTask(false);
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const getProgressPercentage = (task: Task) => {
    if (task.estimatedPomodoros === 0) return 0;
    return Math.min((task.pomodorosUsed / task.estimatedPomodoros) * 100, 100);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6">
      <div
        className={`backdrop-blur-md rounded-2xl p-4 sm:p-6 ${
          theme === "dark"
            ? "bg-white/10 border border-white/20"
            : "bg-white/30 border border-gray-300/30"
        }`}
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h2
            className={`text-xl sm:text-2xl font-bold ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            📋 Gerenciador de Tarefas
          </h2>
          <div className="flex gap-2 w-full sm:w-auto">
            <button
              onClick={() => setShowCompleted(!showCompleted)}
              className={`px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors flex-1 sm:flex-none ${
                showCompleted
                  ? "bg-green-600 text-white"
                  : theme === "dark"
                  ? "bg-white/20 text-white hover:bg-white/30"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              <span className="hidden sm:inline">
                {showCompleted ? "Ocultar Concluídas" : "Ver Concluídas"} (
                {completedTasks.length})
              </span>
              <span className="sm:hidden">
                {showCompleted ? "Ocultar" : "Ver"} ({completedTasks.length})
              </span>
            </button>
            <button
              onClick={() => setIsAddingTask(!isAddingTask)}
              className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-xs sm:text-sm font-medium flex-1 sm:flex-none"
            >
              {isAddingTask ? "Cancelar" : "+ Nova Tarefa"}
            </button>
          </div>
        </div>

        {/* Formulário de nova tarefa */}
        {isAddingTask && (
          <form
            onSubmit={handleAddTask}
            className={`mb-6 p-4 rounded-lg ${
              theme === "dark"
                ? "bg-white/5 border border-white/10"
                : "bg-white/20 border border-gray-300/20"
            }`}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    theme === "dark" ? "text-white" : "text-gray-700"
                  }`}
                >
                  Título da Tarefa *
                </label>
                <input
                  type="text"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  placeholder="Ex: Estudar React"
                  className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    theme === "dark"
                      ? "bg-white/10 border-white/20 text-white placeholder-white/60"
                      : "bg-white/30 border-gray-300/30 text-gray-900 placeholder-gray-500"
                  }`}
                  required
                />
              </div>
              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    theme === "dark" ? "text-white" : "text-gray-700"
                  }`}
                >
                  Pomodoros Estimados
                </label>
                <input
                  type="number"
                  min="1"
                  max="20"
                  value={newTaskEstimated}
                  onChange={(e) => setNewTaskEstimated(Number(e.target.value))}
                  className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    theme === "dark"
                      ? "bg-white/10 border-white/20 text-white"
                      : "bg-white/30 border-gray-300/30 text-gray-900"
                  }`}
                />
              </div>
            </div>
            <div className="mt-4">
              <label
                className={`block text-sm font-medium mb-2 ${
                  theme === "dark" ? "text-white" : "text-gray-700"
                }`}
              >
                Descrição (opcional)
              </label>
              <textarea
                value={newTaskDescription}
                onChange={(e) => setNewTaskDescription(e.target.value)}
                placeholder="Descreva os detalhes da tarefa..."
                rows={3}
                className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${
                  theme === "dark"
                    ? "bg-white/10 border-white/20 text-white placeholder-white/60"
                    : "bg-white/30 border-gray-300/30 text-gray-900 placeholder-gray-500"
                }`}
              />
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button
                type="button"
                onClick={() => setIsAddingTask(false)}
                className={`px-4 py-2 transition-colors ${
                  theme === "dark"
                    ? "text-white/80 hover:text-white"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Adicionar Tarefa
              </button>
            </div>
          </form>
        )}

        {/* Lista de tarefas ativas */}
        {!showCompleted && (
          <div className="space-y-3">
            <h3
              className={`text-lg font-semibold mb-4 ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              Tarefas Ativas ({tasks.length})
            </h3>
            {tasks.length === 0 ? (
              <div
                className={`text-center py-8 ${
                  theme === "dark" ? "text-white/60" : "text-gray-600"
                }`}
              >
                <p className="text-lg">Nenhuma tarefa ativa</p>
                <p className="text-sm">
                  Clique em &quot;Nova Tarefa&quot; para começar
                </p>
              </div>
            ) : (
              tasks.map((task) => (
                <div
                  key={task.id}
                  className={`rounded-lg p-4 border transition-colors ${
                    theme === "dark"
                      ? "bg-white/5 border-white/10 hover:bg-white/10"
                      : "bg-white/20 border-gray-300/20 hover:bg-white/30"
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <h4
                        className={`font-semibold ${
                          theme === "dark" ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {task.title}
                      </h4>
                      {task.description && (
                        <p
                          className={`text-sm mt-1 ${
                            theme === "dark" ? "text-white/70" : "text-gray-600"
                          }`}
                        >
                          {task.description}
                        </p>
                      )}
                    </div>
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => addPomodoroToTask(task.id)}
                        className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
                        title="Adicionar Pomodoro"
                      >
                        +1 🍅
                      </button>
                      <button
                        onClick={() => completeTask(task.id)}
                        className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors"
                        title="Marcar como Concluída"
                      >
                        ✓
                      </button>
                      <button
                        onClick={() => deleteTask(task.id)}
                        className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors"
                        title="Excluir"
                      >
                        ✕
                      </button>
                    </div>
                  </div>

                  <div
                    className={`flex items-center justify-between text-sm ${
                      theme === "dark" ? "text-white/60" : "text-gray-500"
                    }`}
                  >
                    <span>
                      Pomodoros: {task.pomodorosUsed}/{task.estimatedPomodoros}
                    </span>
                    <span>Criada em: {formatDate(task.createdAt)}</span>
                  </div>

                  <div className="mt-2">
                    <div
                      className={`w-full rounded-full h-2 ${
                        theme === "dark" ? "bg-white/20" : "bg-gray-300"
                      }`}
                    >
                      <div
                        className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${getProgressPercentage(task)}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Lista de tarefas concluídas */}
        {showCompleted && (
          <div className="space-y-3">
            <h3
              className={`text-lg font-semibold mb-4 ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              Tarefas Concluídas ({completedTasks.length})
            </h3>
            {completedTasks.length === 0 ? (
              <div
                className={`text-center py-8 ${
                  theme === "dark" ? "text-white/60" : "text-gray-600"
                }`}
              >
                <p className="text-lg">Nenhuma tarefa concluída ainda</p>
                <p className="text-sm">
                  Complete algumas tarefas para ver o histórico aqui
                </p>
              </div>
            ) : (
              completedTasks
                .sort(
                  (a, b) =>
                    (b.completedAt?.getTime() || 0) -
                    (a.completedAt?.getTime() || 0)
                )
                .map((task) => (
                  <div
                    key={task.id}
                    className={`rounded-lg p-4 border ${
                      theme === "dark"
                        ? "bg-green-500/10 border-green-500/20"
                        : "bg-green-100/50 border-green-300/30"
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <h4
                          className={`font-semibold line-through ${
                            theme === "dark" ? "text-white" : "text-gray-900"
                          }`}
                        >
                          {task.title}
                        </h4>
                        {task.description && (
                          <p
                            className={`text-sm mt-1 ${
                              theme === "dark"
                                ? "text-white/70"
                                : "text-gray-600"
                            }`}
                          >
                            {task.description}
                          </p>
                        )}
                      </div>
                      <div
                        className={`text-sm font-medium ${
                          theme === "dark" ? "text-green-400" : "text-green-600"
                        }`}
                      >
                        ✓ Concluída
                      </div>
                    </div>

                    <div
                      className={`flex items-center justify-between text-sm ${
                        theme === "dark" ? "text-white/60" : "text-gray-500"
                      }`}
                    >
                      <span>
                        Pomodoros usados: {task.pomodorosUsed}/
                        {task.estimatedPomodoros}
                      </span>
                      <span>
                        Concluída em:{" "}
                        {task.completedAt
                          ? formatDate(task.completedAt)
                          : "N/A"}
                      </span>
                    </div>
                  </div>
                ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
