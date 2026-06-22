import { ShieldCheck } from "lucide-react";
import { levelName } from "../utils/scoring";
import type { UserProfile } from "../types";

export default function ProgressCard({ user }: { user: UserProfile }) {
  const progress = Math.min(100, (user.xp / 3000) * 100);
  return (
    <div className="glass-card p-5">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
        <div className="grid h-20 w-20 place-items-center rounded-2xl border border-gold/40 bg-black/30 text-center shadow-gold">
          <span className="text-3xl font-black text-gold">{user.level}</span>
        </div>
        <div className="min-w-0 flex-1">
          <div className="mb-1 flex items-center justify-between gap-3">
            <h3 className="text-xl font-black text-gold">{levelName(user.level)}</h3>
            <span className="text-xs text-gold">Gold III</span>
          </div>
          <div className="h-3 overflow-hidden rounded-full bg-white/10">
            <div className="h-full rounded-full bg-gradient-to-r from-gold to-gold2" style={{ width: `${progress}%` }} />
          </div>
          <p className="mt-2 text-sm text-muted">{user.xp.toLocaleString()} / 3,000 XP to next level</p>
        </div>
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-4">
        {[
          ["Current Level", user.level],
          ["Badges Earned", 3],
          ["Lifetime XP", "12.4K"],
          ["Current Tier", "Gold III"],
        ].map(([label, value]) => (
          <div key={label} className="rounded-xl border border-border bg-black/20 p-3">
            <div className="mb-2 flex items-center gap-2 text-gold">
              <ShieldCheck className="h-4 w-4" />
              <span className="text-lg font-black">{value}</span>
            </div>
            <div className="text-xs text-muted">{label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
