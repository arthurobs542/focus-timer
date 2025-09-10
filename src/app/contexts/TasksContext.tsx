"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

export interface Task {
  id: string;
  title: string;
  description?: string;
  createdAt: Date;
  completedAt?: Date;
  isCompleted: boolean;
  pomodorosUsed: number;
  estimatedPomodoros: number;
}

interface TasksContextType {
  tasks: Task[];
  completedTasks: Task[];
  addTask: (
    title: string,
    description?: string,
    estimatedPomodoros?: number
  ) => void;
  completeTask: (taskId: string) => void;
  deleteTask: (taskId: string) => void;
  updateTask: (taskId: string, updates: Partial<Task>) => void;
  addPomodoroToTask: (taskId: string) => void;
}

const TasksContext = createContext<TasksContextType | undefined>(undefined);

export function TasksProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [completedTasks, setCompletedTasks] = useState<Task[]>([]);

  // Load tasks from localStorage on mount
  useEffect(() => {
    const savedTasks = localStorage.getItem("focus-timer-tasks");
    const savedCompletedTasks = localStorage.getItem(
      "focus-timer-completed-tasks"
    );

    if (savedTasks) {
      try {
        const parsed = JSON.parse(savedTasks);
        const tasksWithDates = parsed.map((task: any) => ({
          ...task,
          createdAt: new Date(task.createdAt),
          completedAt: task.completedAt
            ? new Date(task.completedAt)
            : undefined,
        }));
        setTasks(tasksWithDates);
      } catch (error) {
        console.error("Error loading tasks:", error);
      }
    }

    if (savedCompletedTasks) {
      try {
        const parsed = JSON.parse(savedCompletedTasks);
        const completedWithDates = parsed.map((task: any) => ({
          ...task,
          createdAt: new Date(task.createdAt),
          completedAt: task.completedAt
            ? new Date(task.completedAt)
            : undefined,
        }));
        setCompletedTasks(completedWithDates);
      } catch (error) {
        console.error("Error loading completed tasks:", error);
      }
    }
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("focus-timer-tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem(
      "focus-timer-completed-tasks",
      JSON.stringify(completedTasks)
    );
  }, [completedTasks]);

  const addTask = (
    title: string,
    description?: string,
    estimatedPomodoros = 1
  ) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      description,
      createdAt: new Date(),
      isCompleted: false,
      pomodorosUsed: 0,
      estimatedPomodoros,
    };
    setTasks((prev) => [...prev, newTask]);
  };

  const completeTask = (taskId: string) => {
    const task = tasks.find((t) => t.id === taskId);
    if (task) {
      const completedTask = {
        ...task,
        isCompleted: true,
        completedAt: new Date(),
      };
      setCompletedTasks((prev) => [...prev, completedTask]);
      setTasks((prev) => prev.filter((t) => t.id !== taskId));
    }
  };

  const deleteTask = (taskId: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
  };

  const updateTask = (taskId: string, updates: Partial<Task>) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === taskId ? { ...task, ...updates } : task))
    );
  };

  const addPomodoroToTask = (taskId: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? { ...task, pomodorosUsed: task.pomodorosUsed + 1 }
          : task
      )
    );
  };

  return (
    <TasksContext.Provider
      value={{
        tasks,
        completedTasks,
        addTask,
        completeTask,
        deleteTask,
        updateTask,
        addPomodoroToTask,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TasksContext);
  if (context === undefined) {
    throw new Error("useTasks must be used within a TasksProvider");
  }
  return context;
}
