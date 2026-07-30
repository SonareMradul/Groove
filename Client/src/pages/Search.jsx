import { useState } from "react";
import axios from "axios";
import SongCard from "../components/SongCard";

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const searchSongs = async (value) => {
    setQuery(value);

    if (!value.trim()) {
      setResults([]);
      return;
    }

    try {
      const res = await axios.get(
  "http://localhost:5000/api/songs/search?q=" + value
);

console.log(res.data);
setResults(res.data);

      // Handle different possible response formats
      if (Array.isArray(res.data)) {
        setResults(res.data);
      } else if (Array.isArray(res.data.songs)) {
        setResults(res.data.songs);
      } else if (Array.isArray(res.data.results)) {
        setResults(res.data.results);
      } else {
        setResults([]);
      }
    } catch (err) {
      console.error(err);
      setResults([]);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl font-bold mb-6">Search</h1>

      <input
        type="text"
        placeholder="Search songs, artists..."
        value={query}
        onChange={(e) => searchSongs(e.target.value)}
        className="w-full p-4 rounded-xl bg-zinc-900 border border-zinc-700 outline-none focus:border-green-500 mb-8"
      />

      {query && results.length === 0 && (
        <p className="text-zinc-400">No songs found.</p>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {results.map((song) => (
          <SongCard key={song._id} song={song} />
        ))}
      </div>
    </div>
  );
}