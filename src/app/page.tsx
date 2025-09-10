import Sounds from "./components/Sounds";
import ThemeToggle from "./components/ThemeToggle";
import Timer from "./components/Timer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-6">Time to Focus ⏱️</h1>
      <Timer />
      <Sounds />
      <ThemeToggle />
    </main>
  );
}
