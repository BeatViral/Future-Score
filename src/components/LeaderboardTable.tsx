import { Flame, ShoppingBag, Target, Trophy } from "lucide-react";
import type { UserProfile } from "../types";

export default function LeaderboardTable({ users }: { users: UserProfile[] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border">
      <table className="w-full min-w-[680px] border-collapse bg-white/[0.03] text-left text-sm">
        <thead className="bg-white/[0.04] text-xs uppercase text-muted">
          <tr>
            <th className="px-4 py-3">Rank</th>
            <th className="px-4 py-3">Predictor</th>
            <th className="px-4 py-3">FutureScore</th>
            <th className="px-4 py-3">Accuracy</th>
            <th className="px-4 py-3">Credits</th>
            <th className="px-4 py-3">Streak</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/10">
          {users.map((user) => (
            <tr key={user.uid} className="transition hover:bg-gold/5">
              <td className="px-4 py-4">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gold/10 font-black text-gold">
                  {user.rank || "-"}
                </span>
              </td>
              <td className="px-4 py-4">
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-full bg-slate-800 font-black text-gold">
                    {user.displayName.slice(0, 1)}
                  </div>
                  <div>
                    <div className="font-bold text-white">{user.displayName}</div>
                    <div className="text-xs text-muted">{user.plan}</div>
                  </div>
                </div>
              </td>
              <td className="px-4 py-4 font-black text-gold">
                <span className="inline-flex items-center gap-1">
                  <Trophy className="h-4 w-4" />
                  {user.futureScore.toLocaleString()}
                </span>
              </td>
              <td className="px-4 py-4">
                <span className="inline-flex items-center gap-1">
                  <Target className="h-4 w-4 text-futureRed" />
                  {user.accuracy}%
                </span>
              </td>
              <td className="px-4 py-4">
                <span className="inline-flex items-center gap-1">
                  <ShoppingBag className="h-4 w-4 text-gold" />
                  {user.credits.toLocaleString()}
                </span>
              </td>
              <td className="px-4 py-4">
                <span className="inline-flex items-center gap-1">
                  <Flame className="h-4 w-4 text-gold" />
                  {user.currentStreak}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
