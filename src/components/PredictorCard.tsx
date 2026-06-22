import { Flame, ShoppingBag, Target } from "lucide-react";
import { cn } from "../lib/utils";
import type { UserProfile } from "../types";

export default function PredictorCard({ user }: { user: UserProfile }) {
  const rank = user.rank || 0;
  const rankClass =
    rank === 1
      ? "from-[#fff3a3] to-[#c98718] text-black shadow-[0_0_24px_rgba(245,196,81,0.38)]"
      : rank === 2
        ? "from-slate-100 to-slate-400 text-slate-950"
        : rank === 3
          ? "from-[#ffc27a] to-[#b35a13] text-white"
          : "from-slate-700 to-slate-950 text-slate-100";

  return (
    <article
      className={cn(
        "glass-card relative min-w-[190px] overflow-hidden p-4 text-center transition hover:-translate-y-1 hover:border-gold/40",
        rank <= 3 && rank > 0 ? "border-gold/35 bg-[radial-gradient(circle_at_50%_0%,rgba(245,196,81,0.12),rgba(11,16,24,0.75)_44%)]" : "",
      )}
    >
      {rank > 0 && (
        <div className="absolute left-4 top-4">
          <div
            className={cn(
              "grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br text-sm font-black",
              rankClass,
            )}
          >
            {rank}
          </div>
          {rank <= 3 && <div className="mx-auto h-5 w-4 bg-gradient-to-b from-gold to-gold2 [clip-path:polygon(0_0,100%_0,100%_100%,50%_70%,0_100%)]" />}
        </div>
      )}

      <div className="mx-auto mb-3 grid h-[74px] w-[74px] place-items-center rounded-full border-2 border-gold/55 bg-gradient-to-br from-slate-800 to-slate-950 p-1 shadow-[0_0_24px_rgba(245,196,81,0.18)]">
        {user.photoURL ? (
          <img
            src={user.photoURL}
            alt={user.displayName}
            className="h-full w-full rounded-full object-cover"
            loading="lazy"
          />
        ) : (
          <span className="text-xl font-black text-gold">{user.displayName.slice(0, 1)}</span>
        )}
      </div>
      <div className="mb-1 text-sm font-black text-white">{user.displayName}</div>
      <div className="gold-text text-2xl font-black">{user.futureScore.toLocaleString()}</div>
      <div className="text-xs text-muted">FutureScore</div>
      <div className="mt-4 grid grid-cols-2 divide-x divide-white/10 rounded-xl bg-black/20 p-2 text-xs text-slate-300">
        <span className="flex flex-col items-center gap-1">
          <Target className="h-4 w-4 text-futureRed" />
          <strong className="text-white">{user.accuracy}%</strong>
        </span>
        <span className="flex flex-col items-center gap-1">
          <ShoppingBag className="h-4 w-4 text-gold" />
          <strong className="text-white">{user.credits.toLocaleString()}</strong>
        </span>
      </div>
      <div className="mt-3 flex items-center justify-center gap-1 text-xs text-slate-300">
        <Flame className="h-4 w-4 text-gold" />
        {user.currentStreak} day streak
      </div>
    </article>
  );
}
