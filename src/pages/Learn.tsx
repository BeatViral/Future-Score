import { BookOpen, CheckCircle2, Coins, ShieldAlert, Sparkles } from "lucide-react";
import AppShell from "../components/AppShell";
import PlanCard from "../components/PlanCard";
import SectionHeader from "../components/SectionHeader";
import { plans } from "../data/mockData";

const learnBlocks = [
  {
    title: "How FutureScore works",
    copy: "Make a measurable prediction, lock it with a timestamp, prove the outcome, earn Future Credits, build reputation, and redeem rewards.",
    icon: Sparkles,
  },
  {
    title: "What are Future Credits?",
    copy: "Future Credits are platform rewards used to unlock coupons, digital perks, creator products, reports, events, and marketplace deals.",
    icon: Coins,
  },
  {
    title: "How predictions are scored",
    copy: "Scoring considers correctness, difficulty, confidence, streak, timing, credits earned, and category performance.",
    icon: CheckCircle2,
  },
  {
    title: "What makes a good prediction?",
    copy: "A good prediction has a clear outcome, a source of truth, a deadline, and objective resolution criteria.",
    icon: BookOpen,
  },
];

export default function Learn() {
  return (
    <AppShell>
      <section className="glass-card mb-4 p-6">
        <p className="mb-2 text-sm font-black uppercase text-gold">Learn FutureScore</p>
        <h1 className="text-4xl font-black text-white">Predict. Prove. Earn. Redeem. Rise.</h1>
        <p className="mt-3 max-w-3xl text-sm text-muted">
          FutureScore is a gamified prediction reputation platform where users lock predictions, prove they were right, earn Future Credits, climb rankings, unlock badges, and redeem credits for coupons, sponsor rewards, creator drops, and marketplace deals.
        </p>
      </section>

      <section className="mb-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {learnBlocks.map(({ title, copy, icon: Icon }) => (
          <div key={title} className="glass-card p-5">
            <Icon className="mb-4 h-7 w-7 text-gold" />
            <h2 className="font-black text-white">{title}</h2>
            <p className="mt-2 text-sm text-muted">{copy}</p>
          </div>
        ))}
      </section>

      <section className="glass-card mb-4 p-5">
        <SectionHeader title="Signup / Tier System" />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {plans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} active={plan.id === "explorer"} />
          ))}
        </div>
      </section>

      <section className="glass-card p-5">
        <div className="mb-4 flex items-center gap-3">
          <ShieldAlert className="h-7 w-7 text-gold" />
          <h2 className="text-xl font-black text-white">Important Compliance Copy</h2>
        </div>
        <div className="space-y-3 text-sm text-slate-300">
          <p>
            Future Credits are in-app reward points used inside the FutureScore platform. They are not cash, not gambling winnings, and not guaranteed to have monetary value.
          </p>
          <p>
            If FutureScore launches a token in the future, eligible credits may become convertible into FutureCoin, but no future value is promised.
          </p>
          <p>
            Users pay for access, prediction locks, analytics, events, and platform features. Rewards are based on prediction outcomes and platform rules.
          </p>
          <p>
            Future Credits may become eligible for future token conversion. The app does not promise investment returns, cash out, guaranteed coin conversion, or future value.
          </p>
        </div>
      </section>
    </AppShell>
  );
}
