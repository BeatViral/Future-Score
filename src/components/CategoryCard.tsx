import { ChevronRight } from "lucide-react";
import { categoryIcon, formatNumber } from "../lib/utils";
import type { CategoryStat } from "../types";

export default function CategoryCard({ category }: { category: CategoryStat }) {
  const Icon = categoryIcon(category.name);
  return (
    <div className="flex items-center gap-3 rounded-xl border border-border bg-white/[0.035] px-3 py-3 transition hover:border-gold/30 hover:bg-gold/10">
      <div className="grid h-9 w-9 place-items-center rounded-lg bg-white/5 text-gold">
        <Icon className="h-5 w-5" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="font-bold text-white">{category.name}</div>
        <div className="text-xs text-muted">{formatNumber(category.predictionCount)} Predictions</div>
      </div>
      <ChevronRight className="h-4 w-4 text-muted" />
    </div>
  );
}
