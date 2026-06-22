import { ArrowRight, Coins, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

export default function CreditsBag({
  credits,
  cta = "Redeem Rewards",
  to = "/marketplace",
}: {
  credits: number;
  cta?: string;
  to?: string;
}) {
  return (
    <div className="glass-card relative overflow-hidden p-5">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(245,196,81,0.22),transparent_46%)]" />
      <div className="relative text-center">
        <div className="mb-2 flex items-center justify-center gap-2 text-sm font-bold text-gold">
          <ShoppingBag className="h-4 w-4" />
          Future Credits
        </div>
        <div className="relative mx-auto mb-5 h-40 w-44">
          <div className="absolute bottom-0 left-1/2 h-10 w-36 -translate-x-1/2 rounded-[50%] bg-gold/30 blur-xl" />
          <div className="bag-shine absolute bottom-4 left-1/2 h-32 w-32 -translate-x-1/2 rounded-b-[2.2rem] rounded-t-xl border border-yellow-100/40 shadow-gold" />
          <div className="absolute left-1/2 top-8 h-8 w-28 -translate-x-1/2 rounded-full bg-gradient-to-r from-yellow-200 to-gold2 shadow-gold" />
          <div className="absolute left-1/2 top-3 h-12 w-20 -translate-x-1/2 rounded-t-[2rem] border-x-8 border-t-8 border-gold2 bg-transparent" />
          <Coins className="absolute right-1 top-12 h-7 w-7 animate-pulse text-gold" />
          <Coins className="absolute left-2 top-20 h-5 w-5 text-gold/80" />
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-center text-black">
            <div className="text-5xl font-black">{credits}</div>
            <div className="text-sm font-bold">Credits</div>
          </div>
        </div>
        <p className="mb-4 text-sm text-slate-300">Keep predicting to earn more credits.</p>
        <Link to={to} className="gold-button w-full">
          {cta}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
