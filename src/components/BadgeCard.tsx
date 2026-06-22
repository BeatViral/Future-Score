import { Award, Crown, Flame, Radar, Sparkles, Target, Trophy } from "lucide-react";
import { cn } from "../lib/utils";
import type { Badge } from "../types";

const iconMap = {
  sparkles: Sparkles,
  flame: Flame,
  radar: Radar,
  users: Award,
  target: Target,
  gauge: Trophy,
  cpu: Sparkles,
  chart: Trophy,
  music: Award,
  trophy: Trophy,
  bitcoin: Award,
  crown: Crown,
};

export default function BadgeCard({ badge }: { badge: Badge }) {
  const Icon = iconMap[badge.icon as keyof typeof iconMap] || Award;
  const unlocked = Boolean(badge.unlockedAt);

  return (
    <div
      className={cn(
        "rounded-2xl border p-4 transition",
        unlocked ? "border-gold/30 bg-gold/10" : "border-border bg-white/[0.035] opacity-70",
      )}
    >
      <div className="mb-3 flex items-center gap-3">
        <div className="grid h-12 w-12 place-items-center rounded-2xl bg-black/30 text-gold">
          <Icon className="h-6 w-6" />
        </div>
        <div>
          <div className="font-black text-white">{badge.name}</div>
          <div className="text-xs uppercase text-gold">{badge.rarity}</div>
        </div>
      </div>
      <p className="text-sm text-muted">{badge.description}</p>
    </div>
  );
}
