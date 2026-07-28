import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import MusicPlayer from "../components/MusicPlayer";

export default function MainLayout({ children }) {
  return (
    <div className="h-screen bg-[#090909] text-white flex overflow-hidden">

      <Sidebar />

      <div className="flex flex-col flex-1">

        <Navbar />

        <main className="flex-1 overflow-y-auto px-12 py-10">
          {children}
        </main>

        <MusicPlayer />

      </div>

    </div>
  );
}