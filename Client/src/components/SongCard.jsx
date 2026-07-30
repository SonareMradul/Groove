import { Play } from "lucide-react";
import { usePlayer } from "../context/PlayerContext";

export default function SongCard({ song }) {
  const cover = `http://localhost:5000/uploads/covers/${song.coverImage}`;
  const { playSong, addToQueue } = usePlayer();
  

  return (
    <div
    onClick={() => playSong(song)}
      className="
      group
      rounded-3xl
      border
      border-zinc-800
      bg-zinc-900/40
      overflow-hidden
      cursor-pointer
      transition-all
      duration-200
      hover:-translate-y-1
      hover:border-zinc-700
      "
    >
      <div className="overflow-hidden">
        <img
          src={cover}
          alt={song.title}
          className="
            aspect-square
            w-full
            object-cover
            transition-transform
            duration-300
            group-hover:scale-105
          "
        />
      </div>

      <div className="p-5">

        <h3 className="font-semibold text-lg truncate">
          {song.title}
        </h3>

        <p className="text-zinc-500 mt-1">
          {song.artist}
        </p>
        <button
  onClick={(e) => {
    e.stopPropagation();
    addToQueue(song);
  }}
  className="
    mt-2
    w-full
    rounded-xl
    border
    border-zinc-700
    py-3
    hover:bg-zinc-800
    transition
  "
>
  Add to Queue
</button>

       <button
    onClick={(e) => {
    e.stopPropagation();
    playSong(song);
  }}
  className="
    mt-5
    w-full
    rounded-xl
    border
    border-zinc-700
    py-3
    flex
    justify-center
    items-center
    gap-2
    hover:bg-zinc-800
    transition
  "
>
  <Play size={18} />
  Play
</button>

      </div>
    </div>
  );
}