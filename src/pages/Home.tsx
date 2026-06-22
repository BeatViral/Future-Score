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
    <div className="glass-card relative min-h-[600px] overflow-hidden rounded-[1.4rem] border-white/10 bg-[#07111c] p-10 sm:p-12 lg:min-h-[640px] xl:min-h-[720px]">
      <div className="absolute inset-0 bg-[linear-gradient(111deg,rgba(29,27,19,0.92)_0%,rgba(7,13,20,0.95)_36%,rgba(8,34,49,0.9)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_74%_23%,rgba(245,196,81,0.18),transparent_22%),radial-gradient(circle_at_69%_22%,rgba(56,189,248,0.22),transparent_18%)]" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-[linear-gradient(to_top,rgba(177,124,31,0.18),rgba(45,75,66,0.18)_42%,transparent)]" />
      <div className="relative z-10 flex min-h-[520px] flex-col gap-8 lg:min-h-[600px]">
        <div className="max-w-[390px] pt-24 sm:pt-28 lg:pt-32">
          <h2 className="text-[42px] font-light leading-[1.18] tracking-normal text-white sm:text-[52px]">
            Who is the next
            <span className="block bg-gradient-to-r from-[#fff4bc] via-[#f5c451] to-[#c98118] bg-clip-text font-black text-transparent">
              Nostradamus?
            </span>
          </h2>
          <p className="mt-10 text-2xl font-bold text-slate-300">Millions are predicting.</p>
          <p className="mt-2 text-2xl font-bold text-slate-300">The future is yours.</p>
        </div>

        <div className="pointer-events-none absolute right-[6%] top-32 h-[390px] w-[410px] max-w-[52vw] sm:right-[9%] lg:top-36 xl:right-[12%]">
          <div className="absolute left-1/2 top-0 h-[300px] w-[300px] -translate-x-1/2 rounded-full border border-white/20 bg-[radial-gradient(circle_at_42%_34%,rgba(95,204,255,0.58)_0%,rgba(22,93,123,0.34)_18%,rgba(4,13,22,0.88)_46%,rgba(13,20,31,0.98)_100%)] shadow-[inset_0_0_22px_rgba(255,255,255,0.18),inset_0_0_52px_rgba(5,12,22,0.96),0_0_80px_rgba(245,196,81,0.2)] sm:h-[340px] sm:w-[340px]">
            <div className="absolute inset-4 rounded-full border border-white/10" />
            <div className="absolute left-[42%] top-[29%] h-16 w-16 rounded-full bg-white/45 blur-md" />
            <div className="absolute right-[17%] top-[43%] h-24 w-24 rounded-full bg-gold/45 blur-2xl" />
            <div className="absolute left-[45%] top-[44%] h-px w-[44%] bg-gold/45" />
            <div className="absolute left-[50%] top-[30%] h-[63%] w-px bg-gold/55" />
            <div className="absolute left-[35%] top-[49%] h-px w-[42%] -rotate-45 bg-gold/35" />
            <div className="absolute left-[50%] top-[44%] h-28 w-px rotate-45 bg-gold/35" />
          </div>
          <div className="absolute bottom-[28px] left-1/2 h-12 w-[300px] -translate-x-1/2 rounded-full bg-gradient-to-r from-[#8a4f12] via-[#c58926] to-[#8a4f12] shadow-[0_0_34px_rgba(245,196,81,0.28)]" />
          <div className="absolute bottom-0 left-1/2 h-[86px] w-[220px] -translate-x-1/2 rounded-b-[2rem] rounded-t-2xl border border-gold/35 bg-[#5b310e]" />
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
      <section className="grid gap-4 xl:grid-cols-[0.88fr_1.12fr]">
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

        <div className="glass-card rounded-[18px] p-4 shadow-[0_18px_60px_rgba(0,0,0,0.28)]">
          <div className="mb-4 flex items-center gap-2">
            <Crown className="h-5 w-5 fill-gold/30 text-gold" />
            <h2 className="text-lg font-black text-white">Top Predictors</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5">
            {mockUsers.slice(0, 5).map((predictor) => (
              <PredictorCard key={predictor.uid} user={predictor} />
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="glass-card rounded-[18px] p-4 shadow-[0_18px_60px_rgba(0,0,0,0.28)]">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-black text-white">Categories</h2>
              <Link className="text-xs font-bold text-gold" to="/predictions">View all</Link>
            </div>
            <div className="space-y-[9px]">
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
