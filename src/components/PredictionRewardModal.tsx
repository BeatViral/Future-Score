import { Award, Share2, ShoppingBag, Trophy, X } from "lucide-react";
import { motion } from "framer-motion";
import type { Prediction, RewardBreakdown } from "../types";

export default function PredictionRewardModal({
  open,
  reward,
  prediction,
  onClose,
}: {
  open: boolean;
  reward?: RewardBreakdown;
  prediction?: Prediction;
  onClose: () => void;
}) {
  if (!open || !reward || !prediction) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/72 p-4 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-gold/30 bg-surface shadow-gold"
      >
        <button className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-slate-300 hover:text-white" onClick={onClose}>
          <X className="h-5 w-5" />
        </button>
        <div className="bg-[radial-gradient(circle_at_50%_0%,rgba(245,196,81,0.32),transparent_55%)] p-8 text-center">
          <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-2xl bg-gold text-black shadow-gold">
            <Trophy className="h-8 w-8" />
          </div>
          <h2 className="gold-text text-4xl font-black">Prediction Proven</h2>
          <p className="mt-2 text-slate-300">You called it before the world caught up.</p>
        </div>
        <div className="grid gap-3 p-6 sm:grid-cols-2">
          {[
            { label: "Future Credits earned", value: `+${reward.creditsEarned}`, Icon: ShoppingBag },
            { label: "XP gained", value: `+${reward.xpGained}`, Icon: Award },
            { label: "FutureScore", value: `${reward.futureScoreBefore} -> ${reward.futureScoreAfter}`, Icon: Trophy },
            { label: "Global Rank", value: `#${reward.rankBefore} -> #${reward.rankAfter}`, Icon: Trophy },
            { label: "Accuracy", value: `${reward.accuracyBefore}% -> ${reward.accuracyAfter}%`, Icon: Award },
            { label: "Streak", value: `${reward.streak} wins`, Icon: Trophy },
          ].map(({ label, value, Icon }) => (
            <div key={label} className="rounded-2xl border border-border bg-black/25 p-4">
              <Icon className="mb-3 h-5 w-5 text-gold" />
              <div className="text-xs text-muted">{label}</div>
              <div className="text-xl font-black text-white">{value}</div>
            </div>
          ))}
          {reward.badgeUnlocked && (
            <div className="rounded-2xl border border-gold/30 bg-gold/10 p-4 sm:col-span-2">
              <div className="text-xs text-gold">New Badge</div>
              <div className="text-xl font-black text-white">{reward.badgeUnlocked.name}</div>
              <p className="text-sm text-slate-300">{reward.badgeUnlocked.description}</p>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-3 border-t border-border p-6 sm:flex-row">
          <button className="gold-button flex-1">
            <Share2 className="h-4 w-4" />
            Share your proof
          </button>
          <button className="ghost-button flex-1">Redeem rewards</button>
          <button className="ghost-button flex-1" onClick={onClose}>
            View prediction
          </button>
        </div>
      </motion.div>
    </div>
  );
}
