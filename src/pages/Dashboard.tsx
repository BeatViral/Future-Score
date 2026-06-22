import { useState } from "react";
import {
  Activity,
  ArrowRight,
  CheckCircle2,
  Flame,
  LockKeyhole,
  Plus,
  Target,
  Trophy,
  Users,
} from "lucide-react";
import { Line, LineChart, ResponsiveContainer } from "recharts";
import { Link } from "react-router-dom";
import AppShell from "../components/AppShell";
import BadgeCard from "../components/BadgeCard";
import CreatePredictionModal from "../components/CreatePredictionModal";
import CreditsBag from "../components/CreditsBag";
import EventCard from "../components/EventCard";
import MarketplaceItemCard from "../components/MarketplaceItemCard";
import PredictionCard from "../components/PredictionCard";
import ProgressCard from "../components/ProgressCard";
import ProofCard from "../components/ProofCard";
import SectionHeader from "../components/SectionHeader";
import StatCard from "../components/StatCard";
import WalletPanel from "../components/WalletPanel";
import { useAuth } from "../context/AuthContext";
import {
  badges,
  categories,
  couponOffers,
  demoUser,
  mockPredictions,
  mockUsers,
  predictionEvents,
} from "../data/mockData";
import { createPrediction } from "../services/predictions";
import type { Prediction } from "../types";

export default function Dashboard() {
  const { profile, setProfile } = useAuth();
  const user = profile || demoUser;
  const [predictions, setPredictions] = useState(mockPredictions.filter((prediction) => prediction.userId === user.uid || prediction.userName === "Mahmood"));
  const [modalOpen, setModalOpen] = useState(false);

  async function handleLock(prediction: Omit<Prediction, "id">) {
    const created = await createPrediction(prediction);
    setPredictions((current) => [created, ...current]);
    setProfile({
      ...user,
      activePredictionCount: user.activePredictionCount + 1,
    });
  }

  const activeCount = predictions.filter((prediction) => prediction.status === "active").length;
  const resolvedCount = predictions.filter((prediction) => prediction.status !== "active").length;
  const canUnlock = couponOffers.filter((offer) => offer.requiredCredits <= user.credits).slice(0, 3);
  const recentWin = predictions.find((prediction) => prediction.status === "resolved" && prediction.isCorrect) || mockPredictions[2];

  return (
    <AppShell>
      <section className="grid gap-4 xl:grid-cols-[1fr_340px]">
        <div className="space-y-4">
          <div className="glass-card overflow-hidden p-6">
            <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
              <div>
                <p className="text-3xl text-slate-200">Welcome back,</p>
                <h1 className="gold-text text-5xl font-black">{user.displayName}</h1>
                <p className="mt-4 text-2xl font-bold text-white">Predict. Prove. Earn.</p>
                <p className="mt-2 max-w-xl text-sm text-muted">
                  Your insights shape tomorrow. Keep predicting and climb the ranks.
                </p>
              </div>
              <div className="relative min-h-[190px] rounded-2xl border border-border bg-black/25">
                <div className="crystal-shell absolute left-1/2 top-4 h-40 w-40 -translate-x-1/2 rounded-full border border-white/20 shadow-gold" />
                <div className="absolute bottom-6 left-1/2 h-8 w-48 -translate-x-1/2 rounded-full bg-gradient-to-r from-[#5b3510] via-gold to-[#5b3510]" />
              </div>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-7">
            <StatCard icon={<Target className="h-5 w-5" />} label="FutureScore" value={user.futureScore.toLocaleString()} subtext="Top 12% of users" />
            <StatCard icon={<Activity className="h-5 w-5" />} label="Accuracy" value={`${user.accuracy}%`} trend="+6%" subtext="vs last 30d" />
            <StatCard icon={<LockKeyhole className="h-5 w-5" />} label="Total Predictions" value="256" subtext="All time" />
            <StatCard icon={<Plus className="h-5 w-5" />} label="Active Predictions" value={activeCount} subtext="In progress" />
            <StatCard icon={<CheckCircle2 className="h-5 w-5" />} label="Resolved Predictions" value={resolvedCount || 238} subtext="Completed" />
            <StatCard icon={<Trophy className="h-5 w-5" />} label="Global Rank" value={`#${user.rank?.toLocaleString() || "4,231"}`} subtext="Top 12%" />
            <StatCard icon={<Flame className="h-5 w-5" />} label="Best Streak" value={user.bestStreak} subtext="Days" />
          </div>

          <div className="grid gap-4 xl:grid-cols-[1fr_0.36fr_0.74fr]">
            <div className="glass-card p-5">
              <SectionHeader
                title="My Predictions"
                action={<Link to="/predictions" className="text-sm font-bold text-gold">View all</Link>}
              />
              <div className="space-y-3">
                {predictions.slice(0, 4).map((prediction) => (
                  <PredictionCard key={prediction.id} prediction={prediction} compact />
                ))}
              </div>
            </div>

            <button
              className="glass-card flex min-h-[310px] flex-col items-center justify-center p-5 text-center transition hover:-translate-y-1 hover:border-gold/40"
              onClick={() => setModalOpen(true)}
            >
              <div className="mb-5 grid h-28 w-28 place-items-center rounded-full border border-gold/40 bg-gold/10 text-gold shadow-gold">
                <Plus className="h-12 w-12" />
              </div>
              <h3 className="text-xl font-black text-white">Create Prediction</h3>
              <p className="mt-2 text-sm text-muted">Turn your insight into impact.</p>
              <span className="gold-button mt-6">Create Prediction</span>
            </button>

            <div className="glass-card p-5">
              <SectionHeader title="Category Performance" action={<Link to="/predictions" className="text-sm font-bold text-gold">View full report</Link>} />
              <div className="grid gap-3 sm:grid-cols-2">
                {categories.slice(0, 6).map((category) => (
                  <div key={category.id} className="rounded-2xl border border-border bg-black/20 p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="font-bold text-white">{category.name}</span>
                      <span className="text-gold">{category.accuracy}%</span>
                    </div>
                    <div className="h-14">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={category.sparkline.map((value, index) => ({ index, value }))}>
                          <Line type="monotone" dataKey="value" stroke="#f5c451" strokeWidth={2} dot={false} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-4 xl:grid-cols-[1fr_0.9fr]">
            <div>
              <SectionHeader title="Master Predictor Progression" />
              <ProgressCard user={user} />
            </div>
            <div className="glass-card p-5">
              <SectionHeader title="Recent Badges" action={<span className="text-sm font-bold text-gold">View all</span>} />
              <div className="grid gap-3 sm:grid-cols-3">
                {badges.filter((badge) => badge.unlockedAt).slice(0, 3).map((badge) => (
                  <BadgeCard key={badge.id} badge={badge} />
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-4 xl:grid-cols-[0.95fr_1.05fr]">
            <div className="glass-card p-5">
              <SectionHeader title="Live Challenges" action={<Link to="/events" className="text-sm font-bold text-gold">View events</Link>} />
              <div className="grid gap-3 sm:grid-cols-2">
                {predictionEvents.filter((event) => event.status === "live").slice(0, 2).map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </div>
            <div className="glass-card p-5">
              <SectionHeader title="Recent wins" action={<span className="text-sm font-bold text-gold">Proof cards</span>} />
              <ProofCard prediction={recentWin} user={user} />
            </div>
          </div>
        </div>

        <aside className="space-y-4">
          <CreditsBag credits={user.credits} cta="Earn More Credits" to="/predictions" />
          <WalletPanel user={user} />
          <div className="glass-card p-5">
            <SectionHeader title="Ways to Earn More" />
            <div className="grid gap-2">
              {[
                ["Daily Login", "+1 credit"],
                ["Share Prediction", "+2 credits"],
                ["Invite Friends", "+5 credits"],
              ].map(([title, copy]) => (
                <div key={title} className="flex items-center justify-between rounded-xl border border-border bg-black/20 p-3 text-sm">
                  <span className="font-bold text-white">{title}</span>
                  <span className="text-gold">{copy}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="glass-card p-5">
            <SectionHeader title="You can unlock these now" />
            <div className="space-y-3">
              {canUnlock.map((offer) => (
                <MarketplaceItemCard key={offer.id} item={offer} compact />
              ))}
            </div>
            <Link to="/marketplace" className="gold-button mt-4 w-full">
              Redeem Rewards
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="glass-card p-5">
            <SectionHeader title="Top Predictors" action={<Link to="/rankings" className="text-sm font-bold text-gold">View rankings</Link>} />
            <div className="space-y-2">
              {[...mockUsers.slice(0, 3), user].map((predictor, index) => (
                <div key={`${predictor.uid}-${index}`} className="flex items-center gap-3 rounded-xl border border-border bg-black/20 p-3">
                  <span className="text-sm font-black text-gold">{predictor.rank || 4231}</span>
                  <div className="grid h-8 w-8 place-items-center rounded-full bg-white/10 text-xs font-black text-gold">
                    {predictor.displayName.slice(0, 1)}
                  </div>
                  <span className="flex-1 text-sm font-bold text-white">{index === 3 ? "You" : predictor.displayName}</span>
                  <span className="text-sm text-gold">{predictor.futureScore.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </section>

      <CreatePredictionModal open={modalOpen} user={user} onClose={() => setModalOpen(false)} onLock={handleLock} />
    </AppShell>
  );
}
