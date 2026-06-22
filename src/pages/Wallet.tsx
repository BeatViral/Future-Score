import { CreditCard, History, ShoppingBag, WalletCards } from "lucide-react";
import AppShell from "../components/AppShell";
import MarketplaceItemCard from "../components/MarketplaceItemCard";
import SectionHeader from "../components/SectionHeader";
import StatCard from "../components/StatCard";
import { useAuth } from "../context/AuthContext";
import { couponOffers, creditTransactions, demoUser } from "../data/mockData";

export default function Wallet() {
  const { profile } = useAuth();
  const user = profile || demoUser;

  return (
    <AppShell>
      <section className="glass-card mb-4 p-6">
        <p className="mb-2 text-sm font-black uppercase text-gold">Rewards Wallet</p>
        <h1 className="text-4xl font-black text-white">Credits in Bag, history, coupons, and saved rewards.</h1>
        <p className="mt-3 max-w-2xl text-sm text-muted">
          Future Credits power the marketplace. Earn them when predictions come true and redeem them inside FutureScore.
        </p>
      </section>

      <section className="mb-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={<ShoppingBag className="h-5 w-5" />} label="Credits in Bag" value={user.credits} subtext="Available now" />
        <StatCard icon={<WalletCards className="h-5 w-5" />} label="Total Earned" value={user.totalEarned} subtext="Lifetime credits" />
        <StatCard icon={<CreditCard className="h-5 w-5" />} label="Total Spent" value={user.totalSpent} subtext="Marketplace unlocks" />
        <StatCard icon={<History className="h-5 w-5" />} label="Transactions" value={creditTransactions.length} subtext="Demo history" />
      </section>

      <section className="grid gap-4 xl:grid-cols-[1fr_0.9fr]">
        <div className="glass-card p-5">
          <SectionHeader title="Credit History" />
          <div className="space-y-3">
            {creditTransactions.map((tx) => (
              <div key={tx.id} className="flex items-center justify-between rounded-2xl border border-border bg-black/20 p-4">
                <div>
                  <div className="font-bold text-white">{tx.reason}</div>
                  <div className="text-xs text-muted">{tx.type}</div>
                </div>
                <div className={tx.amount >= 0 ? "font-black text-futureGreen" : "font-black text-gold"}>
                  {tx.amount >= 0 ? "+" : ""}
                  {tx.amount}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="glass-card p-5">
            <SectionHeader title="My Unlocked Coupons" />
            <p className="rounded-2xl border border-border bg-black/20 p-4 text-sm text-muted">
              Coupon unlocks from the marketplace will appear here with hidden codes revealed after redemption.
            </p>
          </div>
          <div className="glass-card p-5">
            <SectionHeader title="Redeem More" />
            <div className="grid gap-3 sm:grid-cols-2">
              {couponOffers.slice(0, 4).map((offer) => (
                <MarketplaceItemCard key={offer.id} item={offer} compact />
              ))}
            </div>
          </div>
        </div>
      </section>
    </AppShell>
  );
}
