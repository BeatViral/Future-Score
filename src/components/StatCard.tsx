import { ReactNode } from "react";

export default function StatCard({
  icon,
  label,
  value,
  subtext,
  trend,
}: {
  icon: ReactNode;
  label: string;
  value: string | number;
  subtext?: string;
  trend?: string;
}) {
  return (
    <div className="glass-card p-4 transition hover:-translate-y-1 hover:border-gold/30">
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-gold/10 text-gold">
        {icon}
      </div>
      <p className="text-xs font-semibold text-muted">{label}</p>
      <div className="mt-1 text-2xl font-black text-white">{value}</div>
      {(subtext || trend) && (
        <p className="mt-2 text-xs text-muted">
          {trend && <span className="mr-1 text-futureGreen">{trend}</span>}
          {subtext}
        </p>
      )}
    </div>
  );
}
