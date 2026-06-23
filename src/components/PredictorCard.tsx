import { Flame, ShoppingBag, Target } from "lucide-react";
import { cn } from "../lib/utils";
import type { UserProfile } from "../types";

export default function PredictorCard({ user }: { user: UserProfile }) {
  const rank = user.rank || 0;
  const rankClass =
    rank === 1
      ? "from-[#fff5bd] via-[#f5c451] to-[#a96812] text-[#211103] shadow-[0_0_28px_rgba(245,196,81,0.62)]"
      : rank === 2
        ? "from-[#ffffff] via-[#cbd5e1] to-[#657386] text-slate-950 shadow-[0_0_20px_rgba(203,213,225,0.3)]"
        : rank === 3
          ? "from-[#ffd29a] via-[#db8132] to-[#7a350c] text-white shadow-[0_0_22px_rgba(217,159,43,0.36)]"
          : "from-[#303945] to-[#111827] text-slate-100";

  return (
    <article
      className={cn(
        "relative min-h-[226px] min-w-[148px] overflow-hidden rounded-[14px] border bg-[#101722]/88 px-3 pb-2 pt-4 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_16px_44px_rgba(0,0,0,0.32)] transition hover:-translate-y-1",
        rank > 0 && rank <= 3
          ? "border-gold/45 bg-[radial-gradient(circle_at_50%_-8%,rgba(245,196,81,0.24),rgba(16,23,34,0.92)_43%,rgba(8,13,20,0.94)_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_0_0_1px_rgba(245,196,81,0.08),0_18px_48px_rgba(0,0,0,0.34)] hover:border-gold/65"
          : "border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.052),rgba(255,255,255,0.018))] hover:border-white/20",
      )}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white/[0.07] to-transparent" />
      {rank > 0 && rank <= 3 && (
        <div className="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-gold/80 to-transparent" />
      )}
      {rank > 0 && (
        <div className="absolute left-3 top-3 z-20">
          <div
            className={cn(
              "grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br text-sm font-black ring-1 ring-white/35",
              rankClass,
            )}
          >
            {rank}
          </div>
          {rank <= 3 && (
            <div className="mx-auto h-4 w-4 bg-gradient-to-b from-gold to-gold2 shadow-[0_7px_14px_rgba(0,0,0,0.34)] [clip-path:polygon(0_0,100%_0,100%_100%,50%_72%,0_100%)]" />
          )}
        </div>
      )}

      <div
        className={cn(
          "relative z-10 mx-auto mb-2 grid h-[64px] w-[64px] place-items-center rounded-full border bg-gradient-to-br from-slate-800 to-slate-950 p-[3px]",
          rank > 0 && rank <= 3
            ? "border-gold/60 shadow-[0_0_28px_rgba(245,196,81,0.26)]"
            : "border-white/20 shadow-[0_0_18px_rgba(15,23,42,0.38)]",
        )}
      >
        {user.photoURL ? (
          <img
            src={user.photoURL}
            alt={user.displayName}
            className="h-full w-full rounded-full object-cover object-top ring-1 ring-black/60"
            loading="lazy"
          />
        ) : (
          <span className="text-xl font-black text-gold">{user.displayName.slice(0, 1)}</span>
        )}
      </div>
      <div className="relative z-10 mb-1 text-[13px] font-black text-white">{user.displayName}</div>
      <div className="relative z-10 text-[24px] font-black leading-none text-gold drop-shadow-[0_0_18px_rgba(245,196,81,0.25)]">
        {user.futureScore.toLocaleString()}
      </div>
      <div className="relative z-10 mt-1 text-xs text-slate-400">FutureScore</div>

      <div className="relative z-10 mt-3 grid grid-cols-2 divide-x divide-white/10 overflow-hidden rounded-xl border border-white/5 bg-black/28 text-xs text-slate-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.035)]">
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
        <Flame className="h-3.5 w-3.5 fill-orange-400/25 text-orange-300" />
        {user.currentStreak} day streak
      </div>
    </article>
  );
}
