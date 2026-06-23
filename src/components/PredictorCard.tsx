import { Flame, ShoppingBag, Target } from "lucide-react";
import { cn } from "../lib/utils";
import type { UserProfile } from "../types";

export default function PredictorCard({ user }: { user: UserProfile }) {
  const rank = user.rank || 0;
  const rankClass =
    rank === 1
      ? "from-[#fff0a6] via-[#f5c451] to-[#b97716] text-[#2a1604] shadow-[0_0_22px_rgba(245,196,81,0.45)]"
      : rank === 2
        ? "from-[#f8fafc] via-[#cbd5e1] to-[#728094] text-slate-950 shadow-[0_0_18px_rgba(203,213,225,0.22)]"
        : rank === 3
          ? "from-[#ffc47d] via-[#db8132] to-[#8a3f10] text-white shadow-[0_0_18px_rgba(217,159,43,0.24)]"
          : "from-[#303945] to-[#111827] text-slate-100";

  return (
    <article
      className={cn(
        "relative min-h-[226px] min-w-[148px] overflow-hidden rounded-[14px] border bg-[#101722]/88 px-3 pb-2 pt-4 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_14px_38px_rgba(0,0,0,0.28)] transition hover:-translate-y-1",
        rank > 0 && rank <= 3
          ? "border-gold/35 bg-[radial-gradient(circle_at_50%_0%,rgba(245,196,81,0.16),rgba(16,23,34,0.9)_43%,rgba(8,13,20,0.92)_100%)] hover:border-gold/55"
          : "border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.02))] hover:border-white/20",
      )}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-14 bg-gradient-to-b from-white/[0.055] to-transparent" />
      {rank > 0 && (
        <div className="absolute left-3 top-3 z-20">
          <div
            className={cn(
              "grid h-7 w-7 place-items-center rounded-full bg-gradient-to-br text-xs font-black ring-1 ring-white/25",
              rankClass,
            )}
          >
            {rank}
          </div>
          {rank <= 3 && (
            <div className="mx-auto h-4 w-3.5 bg-gradient-to-b from-gold to-gold2 shadow-[0_6px_12px_rgba(0,0,0,0.28)] [clip-path:polygon(0_0,100%_0,100%_100%,50%_72%,0_100%)]" />
          )}
        </div>
      )}

      <div className="relative z-10 mx-auto mb-2 grid h-[60px] w-[60px] place-items-center rounded-full border border-gold/45 bg-gradient-to-br from-slate-800 to-slate-950 p-[3px] shadow-[0_0_22px_rgba(245,196,81,0.2)]">
        {user.photoURL ? (
          <img
            src={user.photoURL}
            alt={user.displayName}
            className="h-full w-full rounded-full object-cover ring-1 ring-black/50"
            loading="lazy"
          />
        ) : (
          <span className="text-xl font-black text-gold">{user.displayName.slice(0, 1)}</span>
        )}
      </div>
      <div className="relative z-10 mb-1 text-[13px] font-black text-white">{user.displayName}</div>
      <div className="relative z-10 text-[24px] font-black leading-none text-gold drop-shadow-[0_0_14px_rgba(245,196,81,0.18)]">
        {user.futureScore.toLocaleString()}
      </div>
      <div className="relative z-10 mt-1 text-xs text-slate-400">FutureScore</div>

      <div className="relative z-10 mt-3 grid grid-cols-2 divide-x divide-white/10 overflow-hidden rounded-xl border border-white/5 bg-black/22 text-xs text-slate-300">
        <span className="flex min-h-[43px] flex-col items-center justify-center gap-0.5 px-1.5">
          <strong className="text-[15px] leading-none text-white">{user.accuracy}%</strong>
          <span className="flex items-center gap-1 text-[11px] text-slate-400">
            <Target className="h-3 w-3 text-futureRed" />
            Accuracy
          </span>
        </span>
        <span className="flex min-h-[43px] flex-col items-center justify-center gap-0.5 px-1.5">
          <strong className="text-[15px] leading-none text-white">{user.credits.toLocaleString()}</strong>
          <span className="flex items-center gap-1 text-[11px] text-slate-400">
            <ShoppingBag className="h-3 w-3 text-gold" />
            Credits
          </span>
        </span>
      </div>

      <div className="relative z-10 mt-2 flex items-center justify-center gap-1 rounded-b-[10px] border-t border-white/8 pt-2 text-xs text-slate-300">
        <Flame className="h-3.5 w-3.5 text-gold" />
        {user.currentStreak} day streak
      </div>
    </article>
  );
}
