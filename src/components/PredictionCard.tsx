import { CheckCircle2, Clock3, LockKeyhole, Users } from "lucide-react";
import { categoryIcon, cn, daysUntil, formatNumber } from "../lib/utils";
import type { Prediction } from "../types";

export default function PredictionCard({ prediction, compact = false }: { prediction: Prediction; compact?: boolean }) {
  const Icon = categoryIcon(prediction.category);
  const isResolved = prediction.status !== "active";

  return (
    <article className="rounded-2xl border border-border bg-white/[0.035] p-4 transition hover:-translate-y-0.5 hover:border-gold/30 hover:bg-white/[0.055]">
      <div className="flex gap-4">
        <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gold/10 text-gold">
          <Icon className="h-7 w-7" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="mb-1 flex flex-wrap items-center gap-2">
            <span
              className={cn(
                "status-pill",
                prediction.status === "active"
                  ? "border-gold/30 bg-gold/10 text-gold"
                  : prediction.isCorrect
                    ? "border-futureGreen/30 bg-futureGreen/10 text-futureGreen"
                    : "border-futureRed/30 bg-futureRed/10 text-futureRed",
              )}
            >
              {prediction.status}
            </span>
            <span className="text-xs font-bold text-muted">{prediction.category}</span>
            <span className="text-xs text-muted">{prediction.difficulty}</span>
          </div>
          <h3 className="text-sm font-bold leading-snug text-white sm:text-base">{prediction.rawText}</h3>
          {!compact && (
            <p className="mt-1 line-clamp-2 text-sm text-muted">{prediction.resolutionCriteria}</p>
          )}
          <div className="mt-3 grid gap-3 text-xs text-slate-300 sm:grid-cols-4">
            <span>
              <strong className="text-white">{prediction.confidence}%</strong>
              <br />
              Confidence
            </span>
            <span className="flex items-center gap-1">
              <Users className="h-4 w-4 text-muted" />
              {formatNumber(prediction.participantCount)}
            </span>
            <span className="flex items-center gap-1">
              {isResolved ? <CheckCircle2 className="h-4 w-4 text-futureGreen" /> : <Clock3 className="h-4 w-4 text-gold" />}
              {isResolved ? "Resolved" : daysUntil(prediction.deadline)}
            </span>
            <span className="flex items-center gap-1 font-bold text-gold">
              <LockKeyhole className="h-4 w-4" />
              {isResolved && prediction.isCorrect ? `Won +${prediction.rewardCredits}` : `+${prediction.rewardCredits} possible`}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
