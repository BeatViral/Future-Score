import { useMemo, useState } from "react";
import { CheckCircle2, Shield, SlidersHorizontal, Ticket, Trophy, Users } from "lucide-react";
import AppShell from "../components/AppShell";
import EventCard from "../components/EventCard";
import MarketplaceItemCard from "../components/MarketplaceItemCard";
import PredictionRewardModal from "../components/PredictionRewardModal";
import SectionHeader from "../components/SectionHeader";
import StatCard from "../components/StatCard";
import { useAuth } from "../context/AuthContext";
import { adminEmail } from "../lib/firebase";
import { couponOffers, demoUser, mockPredictions, mockUsers, predictionEvents } from "../data/mockData";
import { calculatePredictionRewards } from "../utils/scoring";
import type { Prediction, RewardBreakdown } from "../types";

export default function Admin() {
  const { profile } = useAuth();
  const user = profile || demoUser;
  const isAdmin = user.email === adminEmail;
  const [selectedPrediction, setSelectedPrediction] = useState<Prediction | undefined>();
  const [reward, setReward] = useState<RewardBreakdown | undefined>();
  const [message, setMessage] = useState("");

  const stats = useMemo(
    () => [
      { label: "Users", value: mockUsers.length, icon: Users },
      { label: "Predictions", value: mockPredictions.length, icon: Trophy },
      { label: "Coupon Offers", value: couponOffers.length, icon: Ticket },
      { label: "Events", value: predictionEvents.length, icon: SlidersHorizontal },
    ],
    [],
  );

  function resolvePrediction(prediction: Prediction, correct: boolean) {
    const resolved = {
      ...prediction,
      status: correct ? "resolved" : "failed",
      isCorrect: correct,
      resolvedOutcome: correct ? prediction.predictedOutcome : prediction.predictedOutcome === "Yes" ? "No" : "Yes",
      resolvedAt: new Date().toISOString(),
    } satisfies Prediction;
    setSelectedPrediction(resolved);
    if (correct) {
      setReward(calculatePredictionRewards(resolved, user));
    } else {
      setMessage("Prediction marked failed. No credits awarded.");
    }
  }

  return (
    <AppShell>
      <section className="glass-card mb-4 p-6">
        <div className="flex items-center gap-3">
          <Shield className="h-8 w-8 text-gold" />
          <div>
            <p className="mb-1 text-sm font-black uppercase text-gold">Admin</p>
            <h1 className="text-4xl font-black text-white">Resolve predictions, manage credits, rewards, events, and coupons.</h1>
          </div>
        </div>
        {!isAdmin && (
          <p className="mt-4 rounded-xl border border-gold/30 bg-gold/10 p-3 text-sm text-gold">
            Demo notice: this route is hardcoded for {adminEmail}. Current user is {user.email || "demo"}.
          </p>
        )}
        {message && <p className="mt-4 rounded-xl border border-futureGreen/30 bg-futureGreen/10 p-3 text-sm text-futureGreen">{message}</p>}
      </section>

      <section className="mb-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(({ label, value, icon: Icon }) => (
          <StatCard key={label} icon={<Icon className="h-5 w-5" />} label={label} value={value} subtext="Admin view" />
        ))}
      </section>

      <section className="grid gap-4 xl:grid-cols-[1fr_0.85fr]">
        <div className="space-y-4">
          <div className="glass-card p-5">
            <SectionHeader title="Resolve Predictions" />
            <div className="space-y-3">
              {mockPredictions.map((prediction) => (
                <div key={prediction.id} className="rounded-2xl border border-border bg-black/20 p-4">
                  <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                      <div className="mb-1 text-xs font-bold uppercase text-gold">{prediction.category}</div>
                      <h3 className="font-bold text-white">{prediction.rawText}</h3>
                      <p className="mt-1 text-xs text-muted">{prediction.status}</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="gold-button py-2" onClick={() => resolvePrediction(prediction, true)}>
                        <CheckCircle2 className="h-4 w-4" />
                        Resolve true
                      </button>
                      <button className="ghost-button py-2" onClick={() => resolvePrediction(prediction, false)}>
                        Mark failed
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-5">
            <SectionHeader title="Create Coupon Offer" />
            <div className="grid gap-3 md:grid-cols-2">
              {["Title", "Vendor", "Coupon code", "Required credits", "Affiliate URL", "Expiry date"].map((label) => (
                <label key={label}>
                  <span className="mb-1 block text-xs font-bold text-muted">{label}</span>
                  <input className="future-input" placeholder={label} />
                </label>
              ))}
            </div>
            <textarea className="future-input mt-3 min-h-24" placeholder="Terms and description" />
            <button className="gold-button mt-4" onClick={() => setMessage("Coupon creation is wired as a v1 admin placeholder.")}>
              Create coupon offer
            </button>
          </div>

          <div className="glass-card p-5">
            <SectionHeader title="Award / Adjust Credits" />
            <div className="grid gap-3 md:grid-cols-3">
              <input className="future-input" placeholder="User ID" />
              <input className="future-input" placeholder="Amount" type="number" />
              <button className="gold-button" onClick={() => setMessage("Credit adjustment placeholder recorded.")}>
                Adjust credits
              </button>
            </div>
          </div>
        </div>

        <aside className="space-y-4">
          <div className="glass-card p-5">
            <SectionHeader title="Feature Marketplace Offer" />
            <div className="grid gap-3">
              {couponOffers.slice(0, 3).map((offer) => (
                <MarketplaceItemCard key={offer.id} item={offer} compact />
              ))}
            </div>
          </div>
          <div className="glass-card p-5">
            <SectionHeader title="Create Prediction Event" />
            <div className="grid gap-3">
              {predictionEvents.slice(0, 2).map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
            <button className="gold-button mt-4 w-full" onClick={() => setMessage("Event creation is ready for Firestore wiring.")}>
              Create prediction event
            </button>
          </div>
          <div className="glass-card p-5">
            <SectionHeader title="Unlocked Coupons / Clicks" />
            <div className="grid gap-3">
              {["View unlocked coupons", "View coupon clicks", "Create sponsor campaign", "Deactivate coupon"].map((item) => (
                <button key={item} className="ghost-button justify-start" onClick={() => setMessage(`${item} admin action placeholder.`)}>
                  {item}
                </button>
              ))}
            </div>
          </div>
        </aside>
      </section>

      <PredictionRewardModal
        open={Boolean(selectedPrediction && reward)}
        prediction={selectedPrediction}
        reward={reward}
        onClose={() => {
          setSelectedPrediction(undefined);
          setReward(undefined);
        }}
      />
    </AppShell>
  );
}
