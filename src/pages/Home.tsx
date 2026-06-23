import { motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, Crown, Flame, Search, ShoppingBag, Sparkles, Target, Users } from "lucide-react";
import { Link } from "react-router-dom";
import AppShell from "../components/AppShell";
import CategoryCard from "../components/CategoryCard";
import PredictorCard from "../components/PredictorCard";
import { useAuth } from "../context/AuthContext";
import { categories, demoUser, mockPredictions, mockUsers } from "../data/mockData";
import heroGlobeBg from "../assets/home/hero-globe-bg.png";
import marketAi from "../assets/home/market-ai.png";
import marketCompass from "../assets/home/market-compass.png";
import marketCrypto from "../assets/home/market-crypto.png";
import marketMacro from "../assets/home/market-macro.png";
import { categoryIcon, formatNumber } from "../lib/utils";
import type { Prediction } from "../types";

const heroStats = [
  { value: "250K+", label: "Predictors", icon: Users },
  { value: "1.2M+", label: "Predictions", icon: Sparkles },
  { value: "$3.4M+", label: "Credits Earned", icon: ShoppingBag },
];

const marketplacePreview = [
  {
    title: "The Macro Edge",
    creator: "GlobalLens",
    copy: "Monthly macro outlooks and high-confidence predictions.",
    category: "Macro",
    credits: 250,
    image: marketMacro,
  },
  {
    title: "AI Horizons",
    creator: "ByteWiz",
    copy: "Deep dives on AI trends and breakthroughs.",
    category: "AI",
    credits: 200,
    image: marketAi,
  },
  {
    title: "Market Compass",
    creator: "ChartMaster",
    copy: "Actionable market setups and risk insights.",
    category: "Markets",
    credits: 300,
    image: marketCompass,
  },
  {
    title: "Crypto Signals",
    creator: "ChainOracle",
    copy: "On-chain insights and high-probability calls.",
    category: "Crypto",
    credits: 250,
    image: marketCrypto,
  },
];

function HeroVisual() {
  return (
    <div className="relative h-full min-h-[225px] overflow-hidden rounded-[22px] border border-white/10 bg-black/22 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
      <img
        src={heroGlobeBg}
        alt=""
        className="absolute inset-y-0 right-0 h-full w-[72%] object-cover object-center opacity-90 [mask-image:linear-gradient(90deg,transparent_0%,black_18%,black_100%)]"
      />
      <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(5,7,13,0.78)_0%,rgba(6,12,21,0.65)_35%,rgba(8,18,27,0.2)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_68%_42%,rgba(245,196,81,0.18),transparent_32%),radial-gradient(circle_at_80%_15%,rgba(56,189,248,0.11),transparent_28%)]" />
      <div className="absolute bottom-0 right-0 top-0 w-[72%] bg-[linear-gradient(90deg,transparent,rgba(5,7,13,0.16))]" />
      <div className="relative z-10 flex h-full max-w-[330px] flex-col justify-center px-8 py-8">
        <h2 className="text-[30px] font-light leading-tight text-white">
          Who is the next
          <span className="block bg-gradient-to-r from-[#fff2b3] via-gold to-[#c68118] bg-clip-text font-black text-transparent">
            Nostradamus?
          </span>
        </h2>
        <p className="mt-6 text-sm font-medium text-slate-300">Millions are predicting.</p>
        <p className="mt-1 text-sm font-medium text-slate-300">The future is yours.</p>
      </div>
      <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 items-center gap-3">
        <span className="h-1.5 w-4 rounded-full bg-gold" />
        <span className="h-1.5 w-4 rounded-full bg-white/35" />
        <span className="h-1.5 w-4 rounded-full bg-white/25" />
      </div>
    </div>
  );
}

function PublicHero() {
  return (
    <section className="glass-card relative -mt-4 min-h-[320px] overflow-hidden rounded-[22px] p-4 lg:px-14">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_60%,rgba(245,196,81,0.12),transparent_24%),radial-gradient(circle_at_78%_35%,rgba(56,189,248,0.08),transparent_28%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,7,13,0.98),rgba(5,7,13,0.72)_44%,rgba(5,7,13,0.92))]" />
      <div className="absolute left-5 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-black/25 text-white/80 lg:grid">
        <ChevronLeft className="h-5 w-5" />
      </div>
      <div className="absolute right-5 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-black/25 text-white/80 lg:grid">
        <ChevronRight className="h-5 w-5" />
      </div>

      <div className="relative z-10 grid min-h-[252px] items-center gap-7 xl:grid-cols-[0.43fr_0.57fr]">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto w-full max-w-[560px] xl:ml-20"
        >
          <h1 className="font-black leading-[1.02]">
            <span className="block bg-gradient-to-r from-white via-slate-200 to-gold bg-clip-text text-[48px] text-transparent sm:text-[58px]">
              FutureScore
            </span>
            <span className="block whitespace-nowrap bg-gradient-to-r from-[#fff0ad] via-gold to-[#d99f2b] bg-clip-text text-[38px] text-transparent sm:text-[46px]">
              Predict. Prove. Earn.
            </span>
          </h1>
          <p className="mt-3 max-w-[380px] text-[15px] leading-relaxed text-slate-300">
            Predict what's next, prove you were right, earn Future Credits, and build a reputation that sets you apart.
          </p>
          <Link to="/auth" className="gold-button mt-4 min-h-[46px] w-full max-w-[380px] justify-between px-8 text-[15px]">
            Sign up to become a master predictor
            <ArrowRight className="h-5 w-5" />
          </Link>
          <div className="mt-4 grid max-w-[410px] grid-cols-3 divide-x divide-white/10">
            {heroStats.map(({ value, label, icon: Icon }) => (
              <div key={label} className="flex items-center gap-3 px-4 first:pl-0 last:pr-0">
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-gold/25 bg-gold/10 text-gold">
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-sm font-black text-white">{value}</div>
                  <div className="text-xs text-slate-400">{label}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
        <HeroVisual />
      </div>
    </section>
  );
}

function TrendingPredictionRow({ prediction }: { prediction: Prediction }) {
  const Icon = categoryIcon(prediction.category);

  return (
    <div className="group flex min-h-[54px] items-center gap-3 rounded-xl border border-white/[0.045] bg-[linear-gradient(180deg,rgba(255,255,255,0.052),rgba(255,255,255,0.018))] px-3 py-1.5 transition hover:border-gold/25 hover:bg-gold/[0.045]">
      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-black/35 text-gold shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
        <Icon className="h-5 w-5" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-[11px] font-black text-gold">{prediction.category}</div>
        <div className="line-clamp-2 text-[11px] font-bold leading-tight text-white">
          {prediction.rawText}
        </div>
      </div>
      <div className="w-[68px] shrink-0 text-right">
        <div className="text-sm font-black leading-none text-white">{prediction.confidence}%</div>
        <div className="text-xs font-bold text-futureGreen">Yes</div>
        <div className="mt-1 text-[10px] text-slate-500">{formatNumber(prediction.participantCount)} Predictors</div>
      </div>
    </div>
  );
}

function TrendingPredictions() {
  return (
    <section className="glass-card rounded-[18px] p-3">
      <div className="mb-2 flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <Search className="h-4 w-4 text-white" />
          <h2 className="text-lg font-black text-white">Trending Predictions</h2>
        </div>
        <Link className="text-xs font-bold text-gold" to="/predictions">
          View all
        </Link>
      </div>
      <div className="space-y-1">
        {mockPredictions.slice(0, 4).map((prediction) => (
          <TrendingPredictionRow key={prediction.id} prediction={prediction} />
        ))}
      </div>
      <Link
        to="/predictions"
        className="mt-1.5 flex h-9 items-center justify-center gap-2 rounded-xl border border-white/[0.045] bg-white/[0.035] text-sm font-semibold text-slate-300 transition hover:border-gold/25 hover:text-gold"
      >
        Explore all predictions
        <ChevronRight className="h-4 w-4" />
      </Link>
    </section>
  );
}

function TopPredictors() {
  return (
    <section className="glass-card rounded-[18px] px-4 pb-3 pt-4">
      <div className="mb-2 flex items-center gap-2">
        <Crown className="h-5 w-5 fill-gold/30 text-gold" />
        <h2 className="text-base font-black text-white">Top Predictors</h2>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5">
        {mockUsers.slice(0, 5).map((predictor) => (
          <PredictorCard key={predictor.uid} user={predictor} />
        ))}
      </div>
    </section>
  );
}

function CategoriesPanel() {
  return (
    <section className="glass-card rounded-[18px] p-3">
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-base font-black text-white">Categories</h2>
        <Link className="text-xs font-bold text-gold" to="/predictions">
          View all
        </Link>
      </div>
      <div className="space-y-[5px]">
        {categories.slice(0, 6).map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </section>
  );
}

function ProgressPanel() {
  const { profile } = useAuth();
  const user = profile || demoUser;

  return (
    <section className="glass-card rounded-[18px] p-3">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-base font-black text-white">Your Progress</h2>
        <Link to="/dashboard" className="text-xs font-bold text-slate-400 hover:text-gold">
          View profile
        </Link>
      </div>
      <div className="rounded-2xl border border-gold/25 bg-black/18 p-3">
        <div className="flex items-center gap-4">
          <div className="grid h-[60px] w-[60px] place-items-center rounded-2xl border border-gold/60 bg-black/25 text-[24px] font-black text-gold shadow-[0_0_24px_rgba(245,196,81,0.14)]">
            {user.level}
          </div>
          <div className="min-w-0 flex-1">
            <div className="font-black text-white">Rising Predictor</div>
            <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-white/8">
              <div className="h-full w-[78%] rounded-full bg-gradient-to-r from-gold to-gold2" />
            </div>
            <div className="mt-2 text-[11px] text-slate-400">{user.xp.toLocaleString()} / 3,000 XP to next level</div>
          </div>
        </div>
      </div>
      <div className="mt-3 grid grid-cols-3 divide-x divide-white/10 overflow-hidden rounded-xl border border-white/[0.045] bg-black/18">
        {[
          { value: `${user.accuracy}%`, label: "Accuracy", icon: Target },
          { value: user.currentStreak, label: "Day Streak", icon: Flame },
          { value: user.credits, label: "Credits", icon: ShoppingBag },
        ].map(({ value, label, icon: Icon }) => (
          <div key={label} className="px-2 py-2.5 text-center">
            <div className="flex items-center justify-center gap-1 text-base font-black text-white">
              <Icon className="h-4 w-4 text-gold" />
              {value}
            </div>
            <div className="text-[11px] text-slate-400">{label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function HomeMarketCard({ item }: { item: (typeof marketplacePreview)[number] }) {
  return (
    <article className="flex h-[124px] min-w-0 overflow-hidden rounded-2xl border border-white/[0.055] bg-[linear-gradient(180deg,rgba(255,255,255,0.052),rgba(255,255,255,0.018))] shadow-[inset_0_1px_0_rgba(255,255,255,0.035)] transition hover:-translate-y-0.5 hover:border-gold/25">
      <div className="relative w-[88px] shrink-0 overflow-hidden">
        <img src={item.image} alt="" className="h-full w-full object-cover" loading="lazy" />
        <span className="absolute bottom-2 left-2 rounded-md bg-white px-2 py-1 text-[10px] font-black text-[#7c3a12]">
          {item.category}
        </span>
      </div>
      <div className="flex min-w-0 flex-1 flex-col p-3">
        <h3 className="line-clamp-1 text-sm font-black text-gold">{item.title}</h3>
        <p className="text-xs text-slate-400">By {item.creator}</p>
        <p className="mt-2 line-clamp-2 text-xs leading-snug text-slate-300">{item.copy}</p>
        <div className="mt-auto flex items-center gap-2 text-sm font-black text-gold">
          <ShoppingBag className="h-4 w-4" />
          {item.credits}
        </div>
      </div>
    </article>
  );
}

function MarketplacePreview({ className = "" }: { className?: string }) {
  return (
    <section className={`glass-card rounded-[18px] p-4 ${className}`}>
      <div className="mb-3 flex items-center justify-between 2xl:pl-[372px]">
        <div className="flex items-center gap-2">
          <ShoppingBag className="h-5 w-5 text-slate-300" />
          <h2 className="text-base font-black text-white">Creator Marketplace Preview</h2>
        </div>
        <Link to="/marketplace" className="text-xs font-bold text-gold">
          Visit Marketplace
        </Link>
      </div>
      <div className="grid gap-3 2xl:grid-cols-[repeat(4,minmax(0,1fr))_190px]">
        {marketplacePreview.map((item) => (
          <HomeMarketCard key={item.title} item={item} />
        ))}
        <Link
          to="/marketplace"
          className="flex h-[124px] items-center gap-4 rounded-2xl border border-white/[0.055] bg-white/[0.035] p-4 transition hover:border-gold/25 hover:bg-gold/[0.045]"
        >
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-white/15 bg-black/20 text-slate-300">
            <ShoppingBag className="h-6 w-6" />
          </div>
          <div className="min-w-0">
            <div className="font-black text-white">Explore more</div>
            <p className="mt-1 text-xs leading-snug text-slate-400">Top creators and exclusive insights.</p>
          </div>
          <ChevronRight className="ml-auto h-5 w-5 shrink-0 text-slate-500" />
        </Link>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <AppShell>
      <PublicHero />

      <section className="mt-3 grid items-start gap-3 2xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="grid items-start gap-3 2xl:grid-cols-[360px_minmax(0,1fr)]">
          <TrendingPredictions />
          <TopPredictors />
          <MarketplacePreview className="2xl:col-span-2 2xl:-mt-[68px]" />
        </div>
        <div className="space-y-3">
          <CategoriesPanel />
          <ProgressPanel />
        </div>
      </section>
    </AppShell>
  );
}
