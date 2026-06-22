import { Download, Share2 } from "lucide-react";
import { formatDate } from "../lib/utils";
import type { Prediction, UserProfile } from "../types";

export default function ProofCard({ prediction, user }: { prediction: Prediction; user: UserProfile }) {
  return (
    <div className="rounded-2xl border border-gold/30 bg-gradient-to-br from-slate-950 via-slate-900 to-black p-5 shadow-gold">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-gold text-black font-black">F</div>
          <div>
            <div className="font-black text-white">FutureScore</div>
            <div className="text-xs text-muted">Predict. Prove. Earn.</div>
          </div>
        </div>
        <span className="status-pill border-futureGreen/30 bg-futureGreen/10 text-futureGreen">
          Proven True
        </span>
      </div>
      <h3 className="gold-text text-3xl font-black">I called it.</h3>
      <p className="mt-4 text-sm text-muted">Prediction:</p>
      <p className="text-lg font-bold text-white">{prediction.rawText}</p>
      <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-xl border border-border bg-black/20 p-3">
          <div className="text-muted">Locked</div>
          <strong>{formatDate(prediction.createdAt)}</strong>
        </div>
        <div className="rounded-xl border border-border bg-black/20 p-3">
          <div className="text-muted">Resolved</div>
          <strong>{prediction.resolvedAt ? formatDate(prediction.resolvedAt) : "Pending"}</strong>
        </div>
        <div className="rounded-xl border border-border bg-black/20 p-3">
          <div className="text-muted">Reward</div>
          <strong className="text-gold">+{prediction.rewardCredits} Future Credits</strong>
        </div>
        <div className="rounded-xl border border-border bg-black/20 p-3">
          <div className="text-muted">FutureScore</div>
          <strong>{user.futureScore.toLocaleString()}</strong>
        </div>
      </div>
      <div className="mt-5 flex flex-col gap-2 sm:flex-row">
        <button className="ghost-button flex-1">
          <Download className="h-4 w-4" />
          Download Proof Card
        </button>
        <button className="gold-button flex-1">
          <Share2 className="h-4 w-4" />
          Share
        </button>
      </div>
    </div>
  );
}
