import {
  House,
  Search,
  Library,
  Heart,
  Plus,
} from "lucide-react";

const menu = [
  { icon: House, label: "Home" },
  { icon: Search, label: "Search" },
  { icon: Library, label: "Library" },
  { icon: Heart, label: "Liked Songs" },
];

export default function Sidebar() {
  return (
    <aside className="w-[280px] border-r border-zinc-800 bg-[#0A0A0A] flex flex-col px-6 py-8">

      <div className="mb-14">
  <h1 className="text-4xl font-semibold tracking-tight">
    Groove
  </h1>

  <p className="mt-2 text-sm text-zinc-500">
    Feel Every Beat
  </p>
</div>

      <nav className="space-y-2">

        {menu.map(({ icon: Icon, label }) => (
          <button
            key={label}
            className="flex items-center gap-4 w-full rounded-xl px-4 py-3 text-zinc-400 hover:text-white hover:bg-zinc-900 transition-all"
          >
            <Icon size={20}/>
            {label}
          </button>
        ))}

      </nav>

      <div className="mt-auto">

        <button className="flex items-center gap-3 text-zinc-400 hover:text-white transition-all">

          <Plus size={18}/>

          New Playlist

        </button>

      </div>

    </aside>
  );
}