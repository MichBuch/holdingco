import { DevTool } from "@/types";
import { ExternalLink } from "lucide-react";

const COLOR_MAP: Record<string, string> = {
  orange: "bg-orange-500/10 border-orange-500/30 text-orange-400 hover:border-orange-500 hover:bg-orange-500/20",
  blue:   "bg-blue-500/10 border-blue-500/30 text-blue-400 hover:border-blue-500 hover:bg-blue-500/20",
  yellow: "bg-yellow-500/10 border-yellow-500/30 text-yellow-400 hover:border-yellow-500 hover:bg-yellow-500/20",
  red:    "bg-red-500/10 border-red-500/30 text-red-400 hover:border-red-500 hover:bg-red-500/20",
  cyan:   "bg-cyan-500/10 border-cyan-500/30 text-cyan-400 hover:border-cyan-500 hover:bg-cyan-500/20",
  purple: "bg-purple-500/10 border-purple-500/30 text-purple-400 hover:border-purple-500 hover:bg-purple-500/20",
  green:  "bg-green-500/10 border-green-500/30 text-green-400 hover:border-green-500 hover:bg-green-500/20",
  indigo: "bg-indigo-500/10 border-indigo-500/30 text-indigo-400 hover:border-indigo-500 hover:bg-indigo-500/20",
  pink:   "bg-pink-500/10 border-pink-500/30 text-pink-400 hover:border-pink-500 hover:bg-pink-500/20",
};

export default function DevToolTile({ tool }: { tool: DevTool }) {
  const cls = COLOR_MAP[tool.color] ?? COLOR_MAP.cyan;
  return (
    <a
      href={tool.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-center justify-between rounded-xl border p-4 transition-all duration-200 hover:scale-105 ${cls}`}
    >
      <div>
        <p className="font-semibold text-sm">{tool.name}</p>
        <p className="text-xs opacity-60 mt-0.5 capitalize">{tool.category}</p>
      </div>
      <ExternalLink className="w-4 h-4 opacity-60" />
    </a>
  );
}
