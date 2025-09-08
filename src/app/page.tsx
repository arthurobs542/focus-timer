import Sounds from "./components/Sounds";
import Timer from "./components/Timer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-900">
      <h1 className="text-4xl font-bold mb-6">Focus Timer ⏱️</h1>
      <Timer />
      <Sounds />
    </main>
  );
}
