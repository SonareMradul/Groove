import { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";

const Queue = () => {
  const { queue = [], playSong } = useContext(PlayerContext);

  if (!queue.length) return null;

  return (
    <div className="fixed right-5 bottom-24 w-80 bg-zinc-900 text-white rounded-xl shadow-xl p-4 z-50">
      <h2 className="text-lg font-bold mb-3">Up Next</h2>

      <div className="space-y-2 max-h-64 overflow-y-auto">
        {queue.map((song, index) => (
          <div
            key={song._id || index}
            onClick={() => playSong(song)}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-zinc-800 cursor-pointer"
          >
            <img
              src={`${import.meta.env.VITE_API_URL}/uploads/covers/${song.coverImage}`}
              alt={song.title}
              className="w-12 h-12 rounded object-cover"
            />

            <div>
              <p className="font-medium">{song.title}</p>
              <p className="text-sm text-gray-400">{song.artist}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Queue;