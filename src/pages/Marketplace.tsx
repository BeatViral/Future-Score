import { useMemo, useState } from "react";
import { ArrowUpRight, CheckCircle2, LockKeyhole, Search, ShoppingBag, X } from "lucide-react";
import AppShell from "../components/AppShell";
import MarketplaceItemCard from "../components/MarketplaceItemCard";
import SectionHeader from "../components/SectionHeader";
import { useAuth } from "../context/AuthContext";
import { couponOffers, demoUser } from "../data/mockData";
import { trackCouponClick, unlockCoupon } from "../services/coupons";
import type { CouponOffer, UnlockedCoupon } from "../types";

const sections = [
  "Featured Coupons",
  "AI Tool Deals",
  "Music Plugin Deals",
  "Creator Tools",
  "Crypto / Finance Reports",
  "Sports Offers",
  "Tech Deals",
  "Sponsor Rewards",
  "Gift Card Style Rewards",
  "My Unlocked Coupons",
];

export default function Marketplace() {
  const { profile, setProfile } = useAuth();
  const user = profile || demoUser;
  const [credits, setCredits] = useState(user.credits);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [unlocked, setUnlocked] = useState<UnlockedCoupon[]>([]);
  const [activeUnlock, setActiveUnlock] = useState<UnlockedCoupon | null>(null);
  const [message, setMessage] = useState("");

  const categories = useMemo(() => ["All", ...Array.from(new Set(couponOffers.map((offer) => offer.category)))], []);
  const filtered = couponOffers.filter((offer) => {
    const categoryMatch = category === "All" || offer.category === category;
    const searchMatch =
      !query ||
      offer.title.toLowerCase().includes(query.toLowerCase()) ||
      offer.vendor.toLowerCase().includes(query.toLowerCase()) ||
      offer.category.toLowerCase().includes(query.toLowerCase());
    return categoryMatch && searchMatch;
  });

  async function handleRedeem(item: CouponOffer) {
    setMessage("");
    if (unlocked.some((coupon) => coupon.couponOfferId === item.id)) {
      const existing = unlocked.find((coupon) => coupon.couponOfferId === item.id)!;
      setActiveUnlock(existing);
      return;
    }

    if (credits < item.requiredCredits) {
      setMessage("Keep predicting to earn more Future Credits.");
      return;
    }

    const coupon = await unlockCoupon(user.uid, item);
    setUnlocked((current) => [coupon, ...current]);
    setCredits((current) => current - item.requiredCredits);
    setProfile({
      ...user,
      credits: user.credits - item.requiredCredits,
      totalSpent: user.totalSpent + item.requiredCredits,
    });
    setActiveUnlock(coupon);
  }

  async function visitVendor(coupon: UnlockedCoupon) {
    await trackCouponClick(user.uid, coupon.couponOfferId);
    window.open(coupon.affiliateUrl, "_blank", "noopener,noreferrer");
  }

  return (
    <AppShell>
      <section className="glass-card mb-4 overflow-hidden p-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="mb-2 text-sm font-black uppercase text-gold">FutureScore Rewards</p>
            <h1 className="text-4xl font-black text-white">Unlock coupons, tools, sponsor rewards, and creator drops.</h1>
            <p className="mt-3 max-w-2xl text-sm text-muted">
              Coupon codes stay hidden until you redeem Future Credits. Unlock the code, save it to your wallet, then visit the vendor.
            </p>
          </div>
          <div className="rounded-2xl border border-gold/30 bg-gold/10 p-4 text-right">
            <div className="text-xs text-muted">Credits in Bag</div>
            <div className="text-3xl font-black text-gold">{credits}</div>
          </div>
        </div>
        {message && <p className="mt-4 rounded-xl border border-gold/30 bg-gold/10 p-3 text-sm text-gold">{message}</p>}
      </section>

      <section className="mb-4 grid gap-4 lg:grid-cols-[280px_1fr]">
        <aside className="space-y-4">
          <div className="glass-card p-5">
            <SectionHeader title="Browse Rewards" />
            <div className="mb-4 flex items-center gap-2 rounded-xl border border-border bg-black/20 px-3 py-2">
              <Search className="h-4 w-4 text-muted" />
              <input
                className="w-full bg-transparent text-sm outline-none placeholder:text-slate-500"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search rewards"
              />
            </div>
            <div className="space-y-2">
              {categories.map((item) => (
                <button
                  key={item}
                  className={`w-full rounded-xl border px-3 py-2 text-left text-sm font-bold transition ${
                    category === item
                      ? "border-gold/40 bg-gold/10 text-gold"
                      : "border-border bg-white/[0.035] text-slate-300 hover:border-gold/30"
                  }`}
                  onClick={() => setCategory(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="glass-card p-5">
            <SectionHeader title="Marketplace Sections" />
            <div className="space-y-2">
              {sections.map((section) => (
                <div key={section} className="rounded-xl border border-border bg-black/20 p-3 text-sm text-slate-300">
                  {section}
                </div>
              ))}
            </div>
          </div>
        </aside>

        <div className="space-y-4">
          <div className="glass-card p-5">
            <SectionHeader title="Featured Coupons" action={<span className="text-sm font-bold text-gold">{filtered.length} rewards</span>} />
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((offer) => (
                <MarketplaceItemCard key={offer.id} item={offer} onRedeem={(item) => handleRedeem(item as CouponOffer)} />
              ))}
            </div>
          </div>

          <div className="glass-card p-5">
            <SectionHeader title="My Unlocked Coupons" />
            {unlocked.length === 0 ? (
              <p className="rounded-2xl border border-border bg-black/20 p-4 text-sm text-muted">
                Unlock a reward to reveal coupon codes and save them to your wallet.
              </p>
            ) : (
              <div className="grid gap-3 md:grid-cols-2">
                {unlocked.map((coupon) => (
                  <div key={coupon.id} className="rounded-2xl border border-gold/30 bg-gold/10 p-4">
                    <div className="text-xs text-muted">{coupon.vendor}</div>
                    <h3 className="font-black text-white">{coupon.title}</h3>
                    <div className="mt-3 rounded-xl border border-gold/30 bg-black/30 p-3 font-mono text-lg font-black text-gold">
                      {coupon.couponCode}
                    </div>
                    <button className="ghost-button mt-3 w-full" onClick={() => visitVendor(coupon)}>
                      Visit Vendor
                      <ArrowUpRight className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {activeUnlock && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/72 p-4 backdrop-blur-md">
          <div className="w-full max-w-lg rounded-3xl border border-gold/30 bg-surface p-6 text-center shadow-gold">
            <button className="ml-auto block rounded-full bg-white/10 p-2 text-slate-300 hover:text-white" onClick={() => setActiveUnlock(null)}>
              <X className="h-5 w-5" />
            </button>
            <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-2xl bg-futureGreen/15 text-futureGreen">
              <CheckCircle2 className="h-9 w-9" />
            </div>
            <h2 className="gold-text text-4xl font-black">Coupon unlocked</h2>
            <p className="mt-2 text-slate-300">{activeUnlock.title}</p>
            <div className="mx-auto mt-5 max-w-sm rounded-2xl border border-gold/30 bg-black/30 p-5">
              <div className="text-xs text-muted">Coupon Code</div>
              <div className="mt-1 font-mono text-3xl font-black text-gold">{activeUnlock.couponCode}</div>
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button className="gold-button flex-1" onClick={() => visitVendor(activeUnlock)}>
                Visit Vendor
                <ArrowUpRight className="h-4 w-4" />
              </button>
              <button className="ghost-button flex-1" onClick={() => setActiveUnlock(null)}>
                <LockKeyhole className="h-4 w-4" />
                Save to wallet
              </button>
            </div>
            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted">
              <ShoppingBag className="h-4 w-4 text-gold" />
              Credits bag updated.
            </div>
          </div>
        </div>
      )}
    </AppShell>
  );
}
