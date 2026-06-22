import { Link } from "react-router-dom";
import AppShell from "../components/AppShell";
import AuthForm from "../components/AuthForm";

export default function Auth() {
  return (
    <AppShell>
      <section className="grid min-h-[calc(100vh-140px)] items-center gap-8 lg:grid-cols-[1fr_0.9fr]">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-black uppercase text-gold">FutureScore access</p>
          <h1 className="text-5xl font-black leading-tight sm:text-6xl">
            Predict. Prove. <span className="gold-text">Earn.</span>
          </h1>
          <p className="mt-5 text-lg text-slate-300">
            Start with 10 Future Credits, lock measurable predictions, build your reputation, and redeem rewards in the marketplace.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {["10 starter credits", "Prediction locks", "Rewards wallet"].map((item) => (
              <div key={item} className="rounded-2xl border border-border bg-white/[0.035] p-4 text-sm font-bold text-white">
                {item}
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-muted">
            New users get 10 starter Future Credits. Future Credits are platform rewards, not cash.
          </p>
          <Link className="mt-6 inline-flex text-sm font-bold text-gold" to="/learn">
            Learn how scoring works
          </Link>
        </div>
        <AuthForm />
      </section>
    </AppShell>
  );
}
