import { motion } from "framer-motion";
import { ArrowRight, ChevronRight, Crown, ShoppingBag, Sparkles, Trophy, Users } from "lucide-react";
import { Link } from "react-router-dom";
import AppShell from "../components/AppShell";
import CategoryCard from "../components/CategoryCard";
import MarketplaceItemCard from "../components/MarketplaceItemCard";
import PredictionCard from "../components/PredictionCard";
import PredictorCard from "../components/PredictorCard";
import SectionHeader from "../components/SectionHeader";
import { categories, couponOffers, demoUser, mockPredictions, mockUsers } from "../data/mockData";
import { useAuth } from "../context/AuthContext";

function CrystalBallVisual() {
  return (
    <div className="glass-card relative min-h-[300px] overflow-hidden p-8">
      <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(245,196,81,0.12),transparent_42%,rgba(56,189,248,0.12))]" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-[linear-gradient(to_top,rgba(245,196,81,0.16),transparent)]" />
      <div className="relative z-10 grid gap-8 lg:grid-cols-[0.85fr_1fr]">
        <div className="flex flex-col justify-center">
          <h2 className="text-3xl font-light text-white">
            Who is the next <span className="gold-text font-black">Nostradamus?</span>
          </h2>
          <p className="mt-5 text-slate-300">Millions are predicting.</p>
          <p className="text-slate-300">The future is yours.</p>
        </div>
        <div className="relative mx-auto h-64 w-64">
          <div className="absolute bottom-7 left-1/2 h-12 w-56 -translate-x-1/2 rounded-[50%] bg-gold/30 blur-2xl" />
          <div className="crystal-shell absolute left-1/2 top-2 h-52 w-52 -translate-x-1/2 rounded-full border border-white/25 shadow-[0_0_80px_rgba(245,196,81,0.28)]" />
          <div className="absolute bottom-8 left-1/2 h-8 w-48 -translate-x-1/2 rounded-full bg-gradient-to-r from-[#5b3510] via-gold to-[#5b3510]" />
          <div className="absolute bottom-2 left-1/2 h-12 w-36 -translate-x-1/2 rounded-b-3xl rounded-t-xl border border-gold/40 bg-[#4a2b0e]" />
          <div className="absolute left-1/2 top-16 h-36 w-px -translate-x-1/2 bg-gold/50" />
          <div className="absolute left-20 top-24 h-px w-32 bg-gold/40" />
          <div className="absolute right-20 top-36 h-px w-24 rotate-45 bg-gold/40" />
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const { profile } = useAuth();
  const user = profile || demoUser;
  const featuredRewards = couponOffers.slice(0, 4);

  return (
    <AppShell>
      <section className="grid gap-4 lg:grid-cols-[0.88fr_1.12fr]">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card relative overflow-hidden p-8 sm:p-10"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(245,196,81,0.18),transparent_36%)]" />
          <div className="relative">
            <p className="mb-3 text-sm font-black uppercase text-gold">Predict. Prove. Earn.</p>
            <h1 className="text-5xl font-black leading-tight sm:text-6xl">
              FutureScore
              <span className="block gold-text">Predict. Prove. Earn.</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg text-slate-300">
              Predict what happens next. Prove you were right. Unlock real rewards.
            </p>
            <p className="mt-3 max-w-xl text-sm text-muted">
              Build your reputation by predicting what happens next. Earn Future Credits when your predictions come true.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/auth" className="gold-button">
                Sign up to become a master predictor
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/predictions" className="ghost-button">
                Browse predictions
              </Link>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                { value: "250K+", label: "Predictors", Icon: Users },
                { value: "1.2M+", label: "Predictions", Icon: Sparkles },
                { value: "$3.4M+", label: "Credits Earned", Icon: ShoppingBag },
              ].map(({ value, label, Icon }) => (
                <div key={label} className="rounded-2xl border border-border bg-black/20 p-4">
                  <Icon className="mb-2 h-5 w-5 text-gold" />
                  <div className="text-lg font-black text-white">{value}</div>
                  <div className="text-xs text-muted">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
        <CrystalBallVisual />
      </section>

      <section className="mt-4 grid gap-4 xl:grid-cols-[0.92fr_1.48fr_0.8fr]">
        <div className="glass-card p-5">
          <SectionHeader title="Trending Predictions" action={<Link className="text-sm font-bold text-gold" to="/predictions">View all</Link>} />
          <div className="space-y-3">
            {mockPredictions.slice(0, 4).map((prediction) => (
              <PredictionCard key={prediction.id} prediction={prediction} compact />
            ))}
          </div>
        </div>

        <div className="glass-card p-5">
          <SectionHeader title="Top Predictors" />
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
            {mockUsers.slice(0, 5).map((predictor) => (
              <PredictorCard key={predictor.uid} user={predictor} />
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="glass-card p-5">
            <SectionHeader title="Categories" action={<Link className="text-sm font-bold text-gold" to="/predictions">View all</Link>} />
            <div className="space-y-2">
              {categories.slice(0, 6).map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          </div>
          <div className="glass-card p-5">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-black text-white">Your Progress</h3>
              <Link to="/dashboard" className="text-xs font-bold text-gold">View profile</Link>
            </div>
            <div className="rounded-2xl border border-gold/30 bg-gold/10 p-4">
              <div className="flex items-center gap-3">
                <div className="grid h-16 w-16 place-items-center rounded-2xl border border-gold/40 bg-black/30 text-2xl font-black text-gold">
                  {user.level}
                </div>
                <div className="flex-1">
                  <div className="font-black text-white">Rising Predictor</div>
                  <div className="mt-2 h-2 rounded-full bg-white/10">
                    <div className="h-full w-[78%] rounded-full bg-gold" />
                  </div>
                  <div className="mt-1 text-xs text-muted">{user.xp.toLocaleString()} / 3,000 XP to next level</div>
                </div>
              </div>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs">
              <div className="rounded-xl border border-border bg-black/20 p-3">
                <strong className="block text-lg text-white">{user.accuracy}%</strong>
                Accuracy
              </div>
              <div className="rounded-xl border border-border bg-black/20 p-3">
                <strong className="block text-lg text-white">{user.currentStreak}</strong>
                Day Streak
              </div>
              <div className="rounded-xl border border-border bg-black/20 p-3">
                <strong className="block text-lg text-white">{user.credits}</strong>
                Credits
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-4 glass-card p-5">
        <SectionHeader
          eyebrow="FutureScore Rewards"
          title="Redeem credits for coupons, creator tools, sponsor rewards, and exclusive marketplace deals."
          action={<Link to="/marketplace" className="text-sm font-bold text-gold">Visit Marketplace</Link>}
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featuredRewards.map((item) => (
            <MarketplaceItemCard key={item.id} item={item} compact />
          ))}
        </div>
        <Link to="/marketplace" className="mt-4 flex items-center justify-center gap-2 rounded-xl border border-border bg-black/20 py-3 text-sm font-bold text-gold">
          Use your Future Credits to unlock coupons, creator drops, software deals, sponsor rewards, and digital products.
          <ChevronRight className="h-4 w-4" />
        </Link>
      </section>

      <section className="mt-4 grid gap-4 lg:grid-cols-4">
        {[
          ["Prediction Engine", "Users lock measurable predictions."],
          ["Reputation Engine", "Users build FutureScore, XP, levels, badges, streaks, ranks."],
          ["Rewards Marketplace", "Users redeem Future Credits for coupons, tools, sponsor rewards, creator products, and digital perks."],
          ["Predict. Prove. Earn. Redeem. Rise.", "The whole product loop points back to better calls and better rewards."],
        ].map(([title, copy]) => (
          <div key={title} className="glass-card p-5">
            <Crown className="mb-4 h-6 w-6 text-gold" />
            <h3 className="font-black text-white">{title}</h3>
            <p className="mt-2 text-sm text-muted">{copy}</p>
          </div>
        ))}
      </section>
    </AppShell>
  );
}
