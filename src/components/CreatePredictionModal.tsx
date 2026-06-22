import { FormEvent, useMemo, useState } from "react";
import { ArrowRight, CheckCircle2, LockKeyhole, Plus, Sparkles, X } from "lucide-react";
import { motion } from "framer-motion";
import { validatePrediction } from "../services/openai";
import type {
  Prediction,
  PredictionCategory,
  PredictionOutcome,
  UserProfile,
  ValidationResult,
} from "../types";

const categories: PredictionCategory[] = [
  "AI",
  "Tech",
  "Markets",
  "Crypto",
  "Sports",
  "Music",
  "Entertainment",
  "Startups",
  "World Events",
];

export default function CreatePredictionModal({
  open,
  user,
  onClose,
  onLock,
}: {
  open: boolean;
  user: UserProfile;
  onClose: () => void;
  onLock: (prediction: Omit<Prediction, "id">) => Promise<void> | void;
}) {
  const [step, setStep] = useState(1);
  const [category, setCategory] = useState<PredictionCategory>("AI");
  const [rawText, setRawText] = useState("");
  const [deadline, setDeadline] = useState("2026-12-31");
  const [confidence, setConfidence] = useState(72);
  const [outcome, setOutcome] = useState<PredictionOutcome>("Yes");
  const [validation, setValidation] = useState<ValidationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [locked, setLocked] = useState(false);

  const activeSlotsLeft = useMemo(
    () => Math.max(0, user.activePredictionLimit - user.activePredictionCount),
    [user.activePredictionCount, user.activePredictionLimit],
  );

  if (!open) return null;

  async function handleValidate(event?: FormEvent) {
    event?.preventDefault();
    setStep(4);
    setLoading(true);
    const result = await validatePrediction(rawText, category, deadline);
    setValidation(result);
    setLoading(false);
  }

  async function handleLock() {
    if (!validation?.isMeasurable) return;
    const now = new Date().toISOString();
    await onLock({
      userId: user.uid,
      userName: user.displayName,
      userAvatar: user.photoURL,
      rawText,
      cleanedText: validation.cleanedText,
      resolutionCriteria: validation.resolutionCriteria,
      category,
      confidence,
      deadline: new Date(deadline).toISOString(),
      status: "active",
      predictedOutcome: outcome,
      difficulty: validation.difficulty,
      rewardCredits: validation.potentialRewardCredits,
      createdAt: now,
      participantCount: Math.floor(120 + Math.random() * 900),
    });
    setLocked(true);
  }

  function resetAndClose() {
    setStep(1);
    setValidation(null);
    setLocked(false);
    setRawText("");
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/72 p-4 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-gold/25 bg-surface shadow-gold"
      >
        <button className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-slate-300 hover:text-white" onClick={resetAndClose}>
          <X className="h-5 w-5" />
        </button>

        <div className="border-b border-border bg-[radial-gradient(circle_at_45%_0%,rgba(245,196,81,0.22),transparent_52%)] p-6">
          <div className="mb-2 flex items-center gap-2 text-gold">
            <Sparkles className="h-5 w-5" />
            <span className="text-sm font-bold">Create Prediction</span>
          </div>
          <h2 className="text-3xl font-black text-white">Lock your next future call</h2>
          <p className="mt-2 text-sm text-muted">
            {activeSlotsLeft} active prediction slots left on your current plan.
          </p>
        </div>

        {locked ? (
          <div className="p-8 text-center">
            <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-2xl bg-futureGreen/15 text-futureGreen">
              <CheckCircle2 className="h-9 w-9" />
            </div>
            <h3 className="gold-text text-4xl font-black">Prediction locked</h3>
            <p className="mt-3 text-slate-300">Your future call is now timestamped.</p>
            <button className="gold-button mt-8" onClick={resetAndClose}>
              View predictions
            </button>
          </div>
        ) : (
          <form className="p-6" onSubmit={handleValidate}>
            <div className="mb-6 grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className={`h-2 rounded-full ${step >= item ? "bg-gold" : "bg-white/10"}`} />
              ))}
            </div>

            {step === 1 && (
              <div>
                <h3 className="mb-4 text-xl font-black text-white">Choose category</h3>
                <div className="grid gap-3 sm:grid-cols-3">
                  {categories.map((item) => (
                    <button
                      key={item}
                      type="button"
                      className={`rounded-2xl border p-4 text-left font-bold transition ${
                        category === item
                          ? "border-gold/50 bg-gold/10 text-gold"
                          : "border-border bg-white/[0.035] text-white hover:border-gold/30"
                      }`}
                      onClick={() => setCategory(item)}
                    >
                      {item}
                    </button>
                  ))}
                </div>
                <button type="button" className="gold-button mt-6" onClick={() => setStep(2)}>
                  Continue
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            )}

            {step === 2 && (
              <div>
                <h3 className="mb-4 text-xl font-black text-white">Enter raw prediction</h3>
                <textarea
                  className="future-input min-h-40"
                  value={rawText}
                  onChange={(event) => setRawText(event.target.value)}
                  placeholder="Example: AI-generated song will enter the Billboard Hot 100 before Dec 31, 2026."
                  required
                />
                <div className="mt-6 flex gap-3">
                  <button type="button" className="ghost-button" onClick={() => setStep(1)}>
                    Back
                  </button>
                  <button type="button" className="gold-button" onClick={() => setStep(3)} disabled={!rawText.trim()}>
                    Continue
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h3 className="mb-4 text-xl font-black text-white">Set contract details</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label>
                    <span className="mb-1 block text-xs font-bold text-muted">Deadline</span>
                    <input className="future-input" type="date" value={deadline} onChange={(event) => setDeadline(event.target.value)} />
                  </label>
                  <label>
                    <span className="mb-1 block text-xs font-bold text-muted">Confidence: {confidence}%</span>
                    <input
                      className="w-full accent-gold"
                      type="range"
                      min={50}
                      max={100}
                      value={confidence}
                      onChange={(event) => setConfidence(Number(event.target.value))}
                    />
                  </label>
                  <label>
                    <span className="mb-1 block text-xs font-bold text-muted">Predicted outcome</span>
                    <select className="future-input" value={outcome} onChange={(event) => setOutcome(event.target.value as PredictionOutcome)}>
                      <option>Yes</option>
                      <option>No</option>
                    </select>
                  </label>
                </div>
                <div className="mt-6 flex gap-3">
                  <button type="button" className="ghost-button" onClick={() => setStep(2)}>
                    Back
                  </button>
                  <button className="gold-button">
                    Validate Prediction
                    <Sparkles className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {step === 4 && (
              <div>
                <h3 className="mb-4 text-xl font-black text-white">FutureScore validation</h3>
                {loading ? (
                  <div className="rounded-2xl border border-border bg-black/25 p-6 text-center">
                    <Plus className="mx-auto mb-4 h-10 w-10 animate-pulse text-gold" />
                    <p className="font-bold text-white">FutureScore is cleaning your prediction into a measurable contract...</p>
                  </div>
                ) : validation ? (
                  <div className="space-y-4">
                    <div className="rounded-2xl border border-border bg-black/25 p-5">
                      <p className="mb-2 text-xs font-bold uppercase text-gold">Cleaned statement</p>
                      <p className="font-bold text-white">{validation.cleanedText}</p>
                    </div>
                    <div className="rounded-2xl border border-border bg-black/25 p-5">
                      <p className="mb-2 text-xs font-bold uppercase text-gold">Resolution criteria</p>
                      <p className="text-sm text-slate-300">{validation.resolutionCriteria}</p>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-3">
                      <div className="rounded-2xl border border-border bg-black/25 p-4">
                        <div className="text-xs text-muted">Category</div>
                        <div className="font-black text-white">{validation.category}</div>
                      </div>
                      <div className="rounded-2xl border border-border bg-black/25 p-4">
                        <div className="text-xs text-muted">Difficulty</div>
                        <div className="font-black text-white">{validation.difficulty}</div>
                      </div>
                      <div className="rounded-2xl border border-border bg-black/25 p-4">
                        <div className="text-xs text-muted">Potential reward</div>
                        <div className="font-black text-gold">+{validation.potentialRewardCredits}</div>
                      </div>
                    </div>
                    {!validation.isMeasurable && (
                      <p className="rounded-2xl border border-futureRed/30 bg-futureRed/10 p-4 text-sm text-futureRed">
                        {validation.feedback}
                      </p>
                    )}
                    <div className="flex gap-3">
                      <button type="button" className="ghost-button" onClick={() => setStep(2)}>
                        Edit
                      </button>
                      <button type="button" className="gold-button" onClick={handleLock} disabled={!validation.isMeasurable}>
                        <LockKeyhole className="h-4 w-4" />
                        Lock Prediction
                      </button>
                    </div>
                  </div>
                ) : null}
              </div>
            )}
          </form>
        )}
      </motion.div>
    </div>
  );
}
