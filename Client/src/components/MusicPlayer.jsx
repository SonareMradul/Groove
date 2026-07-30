import { Play, Pause,SkipBack,SkipForward, Volume2, VolumeX,Shuffle} from "lucide-react";
import { Repeat, Repeat1 } from "lucide-react";
import { usePlayer} from "../context/PlayerContext";


export default function MusicPlayer() {
  const {
  currentSong,
  isPlaying,
  togglePlayPause,
  currentTime,
  duration,
  seekSong,
  playNext,
  playPrevious,
  volume,
  changeVolume,
  toggleMute,
  isShuffle,
  setIsShuffle,
  repeatMode,
  setRepeatMode,
} = usePlayer();

  if (!currentSong) {
    return (
      <footer className="h-24 border-t border-zinc-800 bg-zinc-900 flex items-center justify-center text-zinc-500">
        No song selected
      </footer>
    );
  }

  const cover = `http://localhost:5000/uploads/covers/${currentSong.coverImage}`;

  const formatTime = (time) => {
    if (!time) return "0:00";
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };
    const toggleRepeat = () => {
  if (repeatMode === "off") {
    setRepeatMode("all");
  } else if (repeatMode === "all") {
    setRepeatMode("one");
  } else {
    setRepeatMode("off");
  }
};

  return (
    <footer className="h-24 border-t border-zinc-800 bg-zinc-900 px-6 flex items-center justify-between">

      {/* Left */}
      <div className="flex items-center gap-4 w-64">
        <img
          src={cover}
          alt={currentSong.title}
          className="w-14 h-14 rounded-lg object-cover"
        />

        <div>
          <h3 className="font-medium">{currentSong.title}</h3>
          <p className="text-sm text-zinc-500">
            {currentSong.artist}
          </p>
        </div>
      </div>

      {/* Center */}
<div className="flex flex-col items-center flex-1 max-w-xl">
<div className="flex items-center gap-5 mb-2">

  <Shuffle
    size={18}
    onClick={() => setIsShuffle(!isShuffle)}
    className={`cursor-pointer transition ${
      isShuffle
        ? "text-green-500"
        : "text-zinc-400 hover:text-white"
    }`}
  />

  {/* Repeat Button */}
  <div onClick={toggleRepeat} className="cursor-pointer">
    {repeatMode === "one" ? (
      <Repeat1 className="text-green-500" size={18} />
    ) : (
      <Repeat
        size={18}
        className={
          repeatMode === "all"
            ? "text-green-500"
            : "text-zinc-400 hover:text-white"
        }
      />
    )}
  </div>

  <button onClick={playPrevious}>
    <SkipBack size={20} />
  </button>

  <button
    onClick={togglePlayPause}
    className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center"
  >
    {isPlaying ? <Pause size={18} /> : <Play size={18} />}
  </button>

  <button onClick={playNext}>
    <SkipForward size={20} />
  </button>

</div>

  <div className="flex items-center gap-3 w-full">
    <span className="text-xs text-zinc-500 w-10">
      {formatTime(currentTime)}
    </span>

    <input
      type="range"
      min="0"
      max={duration || 0}
      value={currentTime}
      onChange={(e) => seekSong(Number(e.target.value))}
      className="flex-1 cursor-pointer"
    />

    <span className="text-xs text-zinc-500 w-10">
      {formatTime(duration)}
    </span>
  </div>

</div>

      {/* Right */}
      {/* Right */}
<div className="w-64 flex justify-end items-center gap-3">

  {volume === 0 ? (
  <VolumeX
    size={18}
    className="text-zinc-400 cursor-pointer hover:text-white transition"
    onClick={toggleMute}
  />
) : (
  <Volume2
    size={18}
    className="text-zinc-400 cursor-pointer hover:text-white transition"
    onClick={toggleMute}
  />
)}

  <input
    type="range"
    min="0"
    max="1"
    step="0.01"
    value={volume}
    onChange={(e) => changeVolume(Number(e.target.value))}
    className="w-28 accent-white cursor-pointer"
  />

</div>


      

    </footer>
  );
}