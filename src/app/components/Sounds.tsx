"use client";

import { useState } from "react";

type SoundOption = "florest" | "rain" | "coffee" | "fire" | "relax";

const sounds: Record<SoundOption, string> = {
  florest: "/sounds/florest.mp3",
  fire: "/sounds/fire.mp3",
  coffee: "/sounds/coffee.mp3",
  rain: "/sounds/rain.mp3",
  relax: "/sounds/relax.mp3",
};

interface PlayingSound {
  option: SoundOption;
  audio: HTMLAudioElement;
  volume: number;
}

export default function Sounds() {
  const [playing, setPlaying] = useState<PlayingSound[]>([]);

  function toggleSound(option: SoundOption) {
    const existing = playing.find((s) => s.option === option);

    if (existing) {
      existing.audio.pause();
      setPlaying((prev) => prev.filter((s) => s.option !== option));
      return;
    }

    const audio = new Audio(sounds[option]);
    audio.loop = true;
    audio.volume = 0.5;
    audio.play();

    setPlaying((prev) => [...prev, { option, audio, volume: 0.5 }]);
  }

  function changeVolume(option: SoundOption, volume: number) {
    setPlaying((prev) =>
      prev.map((s) => {
        if (s.option === option) {
          s.audio.volume = volume; // aplica no player real
          return { ...s, volume };
        }
        return s;
      })
    );
  }

  function stopAllSounds() {
    playing.forEach((s) => s.audio.pause());
    setPlaying([]);
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-4 mt-8 w-full max-w-md">
        {Object.keys(sounds).map((key) => {
          const option = key as SoundOption;
          const isPlaying = playing.some((s) => s.option === option);
          const current = playing.find((s) => s.option === option);

          return (
            <div
              key={option}
              className={`p-4 rounded-xl shadow flex flex-col items-center
                ${isPlaying ? "bg-white text-black" : "bg-gray-600"}
              `}
            >
              <button
                onClick={() => toggleSound(option)}
                className="text-lg font-semibold"
              >
                {option === "florest" && "Florest"}
                {option === "fire" && "Fire"}
                {option === "coffee" && "Coffee"}
                {option === "rain" && "Rain"}
                {option === "relax" && "Relax"}
              </button>
              {isPlaying && (
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={current?.volume ?? 0.5}
                  onChange={(e) =>
                    changeVolume(option, parseFloat(e.target.value))
                  }
                  className="mt-1 w-24 accent-yellow-500"
                />
              )}
            </div>
          );
        })}
      </div>

      {playing.length > 0 && (
        <button
          onClick={stopAllSounds}
          className="px-6 py-4 my-6 bg-red-500 text-white rounded-xl shadow hover:bg-red-600 transition"
        >
          Stop All Sounds
        </button>
      )}
    </>
  );
}
