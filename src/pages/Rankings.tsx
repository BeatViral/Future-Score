import { Award, Flame, Target, TrendingUp, Trophy } from "lucide-react";
import AppShell from "../components/AppShell";
import LeaderboardTable from "../components/LeaderboardTable";
import PredictorCard from "../components/PredictorCard";
import SectionHeader from "../components/SectionHeader";
import StatCard from "../components/StatCard";
import { mockUsers } from "../data/mockData";

export default function Rankings() {
  const sorted = [...mockUsers].sort((a, b) => b.futureScore - a.futureScore);

  return (
    <AppShell>
      <section className="glass-card mb-4 p-6">
        <p className="mb-2 text-sm font-black uppercase text-gold">Competitive Reputation</p>
        <h1 className="text-4xl font-black text-white">Climb toward Master Predictor / Nostradamus status.</h1>
        <p className="mt-3 max-w-2xl text-sm text-muted">
          Global leaderboard, category leaderboards, weekly climbers, top streaks, top accuracy, and most credits earned.
        </p>
      </section>

      <section className="mb-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        <StatCard icon={<Trophy className="h-5 w-5" />} label="Global Leader" value="NovaMind" subtext="1,942 FutureScore" />
        <StatCard icon={<TrendingUp className="h-5 w-5" />} label="Weekly Climber" value="+214" subtext="FutureScore gained" />
        <StatCard icon={<Flame className="h-5 w-5" />} label="Top Streak" value="24 days" subtext="NovaMind" />
        <StatCard icon={<Target className="h-5 w-5" />} label="Top Accuracy" value="82%" subtext="Mahmood" />
        <StatCard icon={<Award className="h-5 w-5" />} label="Credits Earned" value="18.2K" subtext="NovaMind" />
      </section>

      <section className="grid gap-4 xl:grid-cols-[1fr_360px]">
        <div className="glass-card p-5">
          <SectionHeader title="Global Leaderboard" />
          <div className="overflow-x-auto">
            <LeaderboardTable users={sorted} />
          </div>
        </div>
        <div className="space-y-4">
          <div className="glass-card p-5">
            <SectionHeader title="Top Predictors" />
            <div className="grid gap-3">
              {sorted.slice(0, 3).map((user) => (
                <PredictorCard key={user.uid} user={user} />
              ))}
            </div>
          </div>
          <div className="glass-card p-5">
            <SectionHeader title="Category Kings" />
            {["AI Oracle", "Market Whisperer", "Crypto Caller", "Sports Prophet"].map((title) => (
              <div key={title} className="mb-2 rounded-xl border border-border bg-black/20 p-3 text-sm font-bold text-white">
                {title}
              </div>
            ))}
          </div>
        </div>
      </section>
    </AppShell>
  );
}
