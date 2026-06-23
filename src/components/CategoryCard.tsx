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
    <div className="group flex h-8 items-center gap-2 rounded-[9px] border border-white/[0.055] bg-[linear-gradient(180deg,rgba(255,255,255,0.068),rgba(255,255,255,0.025))] px-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.045),0_8px_18px_rgba(0,0,0,0.12)] transition hover:border-gold/25 hover:bg-gold/[0.055]">
      <div className={cn("grid h-6 w-6 place-items-center rounded-md ring-1 ring-white/10", colorClass)}>
        <Icon className="h-[15px] w-[15px]" />
      </div>
      <div className="min-w-0 flex-1 text-[13px] font-black text-white">{category.name}</div>
      <div className="whitespace-nowrap text-[11px] font-medium text-slate-400">
        {formatNumber(category.predictionCount)} Predictions
      </div>
      <ChevronRight className="h-3.5 w-3.5 text-slate-500 transition group-hover:translate-x-0.5 group-hover:text-gold" />
    </div>
  );
}
