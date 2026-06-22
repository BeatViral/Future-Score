import { Check, Sparkles } from "lucide-react";
import type { PlanDefinition, PlanId } from "../types";
import { cn } from "../lib/utils";

export default function PlanCard({
  plan,
  active,
  onSelect,
}: {
  plan: PlanDefinition;
  active?: boolean;
  onSelect?: (plan: PlanId) => void;
}) {
  return (
    <article
      className={cn(
        "glass-card flex h-full flex-col p-5 transition hover:-translate-y-1",
        active && "border-gold/40 shadow-gold",
      )}
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="grid h-11 w-11 place-items-center rounded-xl bg-gold/10 text-gold">
          <Sparkles className="h-5 w-5" />
        </div>
        {active && <span className="status-pill border-gold/30 bg-gold/10 text-gold">Current</span>}
      </div>
      <h3 className="text-xl font-black text-white">{plan.name}</h3>
      <p className="mt-1 text-sm font-bold text-gold">{plan.priceLabel}</p>
      <div className="mt-4 text-sm text-slate-300">
        <strong className="text-white">{plan.activePredictionLimit}</strong> active prediction locks
      </div>
      <ul className="mt-5 flex-1 space-y-3 text-sm text-slate-300">
        {plan.features.map((feature) => (
          <li key={feature} className="flex gap-2">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-futureGreen" />
            {feature}
          </li>
        ))}
      </ul>
      <button className={active ? "ghost-button mt-5 w-full" : "gold-button mt-5 w-full"} onClick={() => onSelect?.(plan.id)}>
        {active ? "Active Plan" : "Select Plan"}
      </button>
    </article>
  );
}
