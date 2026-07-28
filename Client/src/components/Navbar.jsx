import { Bell, UserCircle } from "lucide-react";

export default function Navbar() {
  return (
    <header className="h-20 border-b border-zinc-800 flex items-center justify-between px-10">

      <div>
        <h2 className="text-xl font-semibold">
          Discover Music
        </h2>
      </div>

      <div className="flex items-center gap-5">

        <Bell
          className="text-zinc-400"
          size={20}
        />

        <UserCircle
          size={34}
        />

      </div>

    </header>
  );
}