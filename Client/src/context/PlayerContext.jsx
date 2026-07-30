import {
  createContext,
  useContext,
  useRef,
  useState,
  useEffect,
  useCallback,

} from "react";


export const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
  const audioRef = useRef(new Audio());

  const [songs, setSongs] = useState([]);
  const [volume, setVolume] = useState(1);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const previousVolume = useRef(1);
  const [duration, setDuration] = useState(0);
  const [isShuffle, setIsShuffle] = useState(false);
  const [repeatMode, setRepeatMode] = useState("off");
  const [queue, setQueue] = useState([]);


  // Play a song
  const playSong = useCallback((song) => {
    if (!song) return;

    const audio = audioRef.current;
    const audioUrl = `http://localhost:5000/uploads/songs/${song.audioUrl}`;

    if (audio.src !== audioUrl) {
      audio.src = audioUrl;
    }

    audio.play();
    setCurrentSong(song);
    setIsPlaying(true);
  }, []);
  const addToQueue = useCallback((song) => {
  if (!song) return;

  setQueue((prev) => [...prev, song]);
}, []);
  // Pause
  const pauseSong = useCallback(() => {
      audioRef.current.pause();
      setIsPlaying(false);
  }, []);

  // Toggle
  const togglePlayPause = useCallback(() => {
    if (!currentSong) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, [currentSong, isPlaying]);

  // Seek
  const seekSong = useCallback((time) => {
    audioRef.current.currentTime = time;
    setCurrentTime(time);
}, []);
const changeVolume = (value) => {
  audioRef.current.volume = value;
  setVolume(value);

  if (value > 0) {
    previousVolume.current = value;
  }
};
const toggleMute = () => {
  if (volume === 0) {
    audioRef.current.volume = previousVolume.current;
    setVolume(previousVolume.current);
  } else {
    previousVolume.current = volume;
    audioRef.current.volume = 0;
    setVolume(0);
  }
};

  // Next
  const playNext = useCallback(() => {
  if (!currentSong || songs.length === 0) return;
  // Play queued songs first
if (queue.length > 0) {
  playSong(queue[0]);
  setQueue((prev) => prev.slice(1));
  return;
}

  // Shuffle mode
  if (isShuffle) {
    if (songs.length === 1) {
      playSong(songs[0]);
      return;
    }

    let randomIndex;

    do {
      randomIndex = Math.floor(Math.random() * songs.length);
    } while (songs[randomIndex]._id === currentSong._id);

    playSong(songs[randomIndex]);
    return;
  }

  // Normal mode
  const index = songs.findIndex(
    (song) => song._id === currentSong._id
  );

  if (index === -1) return;

  const isLastSong = index === songs.length - 1;

if (isLastSong) {
  if (repeatMode === "all") {
    playSong(songs[0]);
  } else {
    pauseSong();
    audioRef.current.currentTime = 0;
  }
  return;
}

playSong(songs[index + 1]);
}, [currentSong, songs, playSong, isShuffle,repeatMode,
pauseSong,queue,
setQueue,]);

  // Previous
  const playPrevious = useCallback(() => {
    if (!currentSong || songs.length === 0) return;

    const index = songs.findIndex(
      (song) => song._id === currentSong._id
    );

    if (index === -1) return;

    const previousSong =
      songs[(index - 1 + songs.length) % songs.length];

    playSong(previousSong);
  }, [currentSong, songs, playSong]);

  // Audio events
  useEffect(() => {
    const audio = audioRef.current;

    const updateTime = () => {
      setCurrentTime(audio.currentTime);
      setDuration(audio.duration || 0);
    };

   const handleEnded = () => {
  if (repeatMode === "one") {
    audioRef.current.currentTime = 0;
    audioRef.current.play();
    return;
  }

  playNext();
};

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateTime);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateTime);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [playNext,repeatMode]);

  return (
    <PlayerContext.Provider
      value={{
        songs,
        setSongs,
        currentSong,
        isPlaying,
        currentTime,
        duration,
        playSong,
        pauseSong,
        togglePlayPause,
        seekSong,
        playNext,
        playPrevious,
        audioRef,
        volume,changeVolume,toggleMute,isShuffle,
setIsShuffle,repeatMode,
setRepeatMode,
queue,
setQueue,
addToQueue,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => useContext(PlayerContext);