"use client";

import { useState } from "react";

type SoundOption = "florest" | "rain" | "coffee" | "fire";

const sounds: Record<SoundOption, string> = {
  florest: "/sounds/florest.mp3",
  fire: "/sounds/fire.mp3",
  coffee: "/sounds/coffee.mp3",
  rain: "/sounds/rain.mp3",
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
      <div className="grid grid-cols-2 gap-2 mt-8 w-[250px] max-w-md">
        {Object.keys(sounds).map((key) => {
          const option = key as SoundOption;
          const isPlaying = playing.some((s) => s.option === option);
          const current = playing.find((s) => s.option === option);

          return (
            <div
              key={option}
              className={`
      text-center px-4 py-2 rounded-lg transition
    ${
      isPlaying
        ? "bg-amber-500 text-white hover:bg-amber-600 dark:bg-amber-400 dark:hover:bg-amber-500"
        : "bg-gray-500 text-black hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
    }
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
                  className="mt-1 w-20 accent-white"
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
