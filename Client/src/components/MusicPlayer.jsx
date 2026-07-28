import { Play, Pause } from "lucide-react";
import { usePlayer } from "../context/PlayerContext";

export default function MusicPlayer() {
  const { currentSong, isPlaying, togglePlayPause } = usePlayer();

  if (!currentSong) {
    return (
      <footer className="h-24 border-t border-zinc-800 bg-zinc-900 flex items-center justify-center text-zinc-500">
        No song selected
      </footer>
    );
  }

  const cover = `http://localhost:5000/uploads/covers/${currentSong.coverImage}`;

  return (
    <footer className="h-24 border-t border-zinc-800 bg-zinc-900 px-6 flex items-center justify-between">

      {/* Left */}
      <div className="flex items-center gap-4">
        <img
          src={cover}
          alt={currentSong.title}
          className="w-14 h-14 rounded-lg object-cover"
        />

        <div>
          <h3 className="font-semibold">{currentSong.title}</h3>
          <p className="text-sm text-zinc-500">
            {currentSong.artist}
          </p>
        </div>
      </div>

      {/* Center */}
      <button
        onClick={togglePlayPause}
        className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition"
      >
        {isPlaying ? <Pause size={20} /> : <Play size={20} />}
      </button>

      {/* Right */}
      <div className="text-sm text-zinc-500">
        Groove
      </div>

    </footer>
  );
}