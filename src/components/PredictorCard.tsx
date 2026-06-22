import { Flame, ShoppingBag, Target } from "lucide-react";
import type { UserProfile } from "../types";

export default function PredictorCard({ user }: { user: UserProfile }) {
  return (
    <article className="glass-card min-w-[190px] p-4 text-center transition hover:-translate-y-1 hover:border-gold/40">
      <div className="mx-auto mb-3 grid h-16 w-16 place-items-center rounded-full border border-gold/40 bg-gradient-to-br from-slate-800 to-slate-950 text-xl font-black text-gold">
        {user.displayName.slice(0, 1)}
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
