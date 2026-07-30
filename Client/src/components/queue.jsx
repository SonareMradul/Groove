import { usePlayer } from "../context/PlayerContext";
import { X } from "lucide-react";

export default function Queue() {
  const { queue, setQueue, playSong } = usePlayer();

  const removeSong = (id) => {
    setQueue((prev) => prev.filter((song) => song._id !== id));
  };

  const clearQueue = () => {
    setQueue([]);
  };
const playQueuedSong = (song) => {
  console.log("playQueuedSong called");

  playSong(song);

  setQueue((prev) => {
    console.log("Before:", prev);

    const updated = prev.filter((s) => s._id !== song._id);

    console.log("After:", updated);

    return updated;
  });
};

  return (
    <div className="w-80 bg-zinc-900 border-l border-zinc-800 h-full p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-lg">Queue</h2>

        <button
          onClick={clearQueue}
          className="text-sm text-red-400 hover:text-red-300"
        >
          Clear
        </button>
      </div>

      {queue.length === 0 ? (
        <p className="text-zinc-500 text-sm">Queue is empty</p>
      ) : (
        <div className="space-y-2">
          {queue.map((song) => (
            <div
              key={song._id}
              className="flex items-center justify-between bg-zinc-800 rounded-lg p-2"
            >
              <div
  className="cursor-pointer "
  onClick={() => {
   
    playQueuedSong(song);
  }}
>
                <p className="text-sm font-medium">{song.title}</p>
                <p className="text-xs text-zinc-500">{song.artist}</p>
              </div>

              <X
                size={16}
                className="cursor-pointer hover:text-red-400"
                onClick={() => removeSong(song._id)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}