import { CalendarDays, Coins, Trophy, Users } from "lucide-react";
import { categoryIcon, cn, formatDate, formatNumber } from "../lib/utils";
import type { PredictionEvent } from "../types";

export default function EventCard({ event, onJoin }: { event: PredictionEvent; onJoin?: (event: PredictionEvent) => void }) {
  const Icon = categoryIcon(event.category);

  return (
    <article className="glass-card flex h-full flex-col p-5 transition hover:-translate-y-1 hover:border-gold/40">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gold/10 text-gold">
          <Icon className="h-6 w-6" />
        </div>
        <span
          className={cn(
            "status-pill",
            event.status === "live"
              ? "border-futureGreen/30 bg-futureGreen/10 text-futureGreen"
              : event.status === "upcoming"
                ? "border-gold/30 bg-gold/10 text-gold"
                : "border-border bg-white/5 text-muted",
          )}
        >
          {event.status}
        </span>
      </div>
      <h3 className="text-lg font-black text-white">{event.title}</h3>
      <p className="mt-2 flex-1 text-sm text-muted">{event.description}</p>
      <div className="mt-5 grid grid-cols-2 gap-3 text-xs text-slate-300">
        <span className="flex items-center gap-2">
          <CalendarDays className="h-4 w-4 text-gold" />
          {formatDate(event.endDate)}
        </span>
        <span className="flex items-center gap-2">
          <Users className="h-4 w-4 text-gold" />
          {formatNumber(event.participantCount)}
        </span>
        <span className="flex items-center gap-2">
          <Coins className="h-4 w-4 text-gold" />
          {event.entryCostCredits} entry
        </span>
        <span className="flex items-center gap-2">
          <Trophy className="h-4 w-4 text-gold" />
          {formatNumber(event.rewardPoolCredits)}
        </span>
      </div>
      {onJoin && (
        <button className="gold-button mt-5 w-full" onClick={() => onJoin(event)}>
          Join Challenge
        </button>
      )}
    </article>
  );
}
