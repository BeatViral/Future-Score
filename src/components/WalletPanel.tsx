import { ChevronRight, History, ShoppingBag, WalletCards } from "lucide-react";
import type { UserProfile } from "../types";

export default function WalletPanel({ user }: { user: UserProfile }) {
  const rows = [
    { label: "Credits in Bag", value: user.credits, Icon: ShoppingBag },
    { label: "Total Earned", value: user.totalEarned, Icon: WalletCards },
    { label: "Total Spent", value: user.totalSpent, Icon: WalletCards },
    { label: "Credit History", value: "View", Icon: History },
  ];

  return (
    <div className="glass-card p-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-black text-white">My Wallet</h3>
        <span className="text-xs font-bold text-gold">View all</span>
      </div>
      <div className="space-y-2">
        {rows.map(({ label, value, Icon }) => (
          <div key={label} className="flex items-center gap-3 rounded-xl border border-border bg-black/20 p-3">
            <Icon className="h-5 w-5 text-gold" />
            <span className="flex-1 text-sm text-slate-300">{label}</span>
            <strong className="text-white">{value}</strong>
            <ChevronRight className="h-4 w-4 text-muted" />
          </div>
        ))}
      </div>
    </div>
  );
}
