import { ChevronRight } from "lucide-react";
import { categoryIcon, cn, formatNumber } from "../lib/utils";
import type { CategoryStat } from "../types";

export default function CategoryCard({ category }: { category: CategoryStat }) {
  const Icon = categoryIcon(category.name);
  const colorClass = {
    AI: "text-emerald-300 bg-emerald-400/12",
    Tech: "text-sky-300 bg-sky-400/12",
    Markets: "text-green-400 bg-green-400/12",
    Crypto: "text-orange-300 bg-orange-400/12",
    Sports: "text-purple-300 bg-purple-400/12",
    Music: "text-pink-300 bg-pink-400/12",
    Entertainment: "text-futurePurple bg-futurePurple/12",
    Startups: "text-gold bg-gold/12",
    "World Events": "text-futureBlue bg-futureBlue/12",
  }[category.name];

  return (
    <div className="group flex h-[45px] items-center gap-3 rounded-[10px] border border-white/[0.045] bg-[linear-gradient(180deg,rgba(255,255,255,0.055),rgba(255,255,255,0.025))] px-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.035)] transition hover:border-gold/25 hover:bg-gold/[0.055]">
      <div className={cn("grid h-8 w-8 place-items-center rounded-lg", colorClass)}>
        <Icon className="h-5 w-5" />
      </div>
      <div className="min-w-0 flex-1 text-sm font-black text-white">{category.name}</div>
      <div className="whitespace-nowrap text-xs font-medium text-slate-400">
        {formatNumber(category.predictionCount)} Predictions
      </div>
      <ChevronRight className="h-4 w-4 text-slate-500 transition group-hover:translate-x-0.5 group-hover:text-gold" />
    </div>
  );
}
