import { useMemo, useState } from "react";
import { Plus, Search, SlidersHorizontal } from "lucide-react";
import AppShell from "../components/AppShell";
import CreatePredictionModal from "../components/CreatePredictionModal";
import PredictionCard from "../components/PredictionCard";
import SectionHeader from "../components/SectionHeader";
import { useAuth } from "../context/AuthContext";
import { demoUser, mockPredictions } from "../data/mockData";
import { createPrediction } from "../services/predictions";
import type { Prediction, PredictionCategory, PredictionStatus } from "../types";

const categories: Array<PredictionCategory | "All"> = [
  "All",
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

export default function Predictions() {
  const { profile, setProfile } = useAuth();
  const user = profile || demoUser;
  const [predictions, setPredictions] = useState(mockPredictions);
  const [modalOpen, setModalOpen] = useState(false);
  const [category, setCategory] = useState<PredictionCategory | "All">("All");
  const [tab, setTab] = useState<"all" | "active" | "resolved">("all");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return predictions.filter((prediction) => {
      const categoryMatch = category === "All" || prediction.category === category;
      const statusMatch =
        tab === "all" ||
        (tab === "active" && prediction.status === "active") ||
        (tab === "resolved" && prediction.status !== "active");
      const searchMatch =
        !search ||
        prediction.rawText.toLowerCase().includes(search.toLowerCase()) ||
        prediction.category.toLowerCase().includes(search.toLowerCase());
      return categoryMatch && statusMatch && searchMatch;
    });
  }, [category, predictions, search, tab]);

  async function handleLock(prediction: Omit<Prediction, "id">) {
    const created = await createPrediction(prediction);
    setPredictions((current) => [created, ...current]);
    setProfile({
      ...user,
      activePredictionCount: user.activePredictionCount + 1,
    });
  }

  function tabCount(status: "all" | PredictionStatus | "resolved") {
    if (status === "all") return predictions.length;
    if (status === "resolved") return predictions.filter((prediction) => prediction.status !== "active").length;
    return predictions.filter((prediction) => prediction.status === status).length;
  }

  return (
    <AppShell>
      <section className="glass-card mb-4 overflow-hidden p-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="mb-2 text-sm font-black uppercase text-gold">Prediction Engine</p>
            <h1 className="text-4xl font-black text-white">Browse, create, lock, and track predictions.</h1>
            <p className="mt-3 max-w-2xl text-sm text-muted">
              Predictions must be measurable. The journey always points back to make prediction, lock prediction, prove outcome, earn credits, build FutureScore, spend credits.
            </p>
          </div>
          <button className="gold-button" onClick={() => setModalOpen(true)}>
            <Plus className="h-4 w-4" />
            Create Prediction
          </button>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[280px_1fr]">
        <aside className="space-y-4">
          <div className="glass-card p-5">
            <SectionHeader title="Filters" />
            <div className="mb-4 flex items-center gap-2 rounded-xl border border-border bg-black/20 px-3 py-2">
              <Search className="h-4 w-4 text-muted" />
              <input
                className="w-full bg-transparent text-sm outline-none placeholder:text-slate-500"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search predictions"
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
            <div className="mb-3 flex items-center gap-2 text-gold">
              <SlidersHorizontal className="h-5 w-5" />
              <h3 className="font-black text-white">Lock slots</h3>
            </div>
            <div className="text-3xl font-black text-gold">
              {user.activePredictionLimit - user.activePredictionCount}
            </div>
            <p className="mt-1 text-sm text-muted">Available active prediction slots on {user.plan}.</p>
          </div>
        </aside>

        <div className="glass-card p-5">
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex gap-2">
              {(["all", "active", "resolved"] as const).map((item) => (
                <button
                  key={item}
                  className={`rounded-xl px-4 py-2 text-sm font-bold capitalize transition ${
                    tab === item ? "bg-gold text-black" : "border border-border bg-white/[0.035] text-slate-300"
                  }`}
                  onClick={() => setTab(item)}
                >
                  {item} ({tabCount(item)})
                </button>
              ))}
            </div>
            <span className="text-sm text-muted">{filtered.length} predictions</span>
          </div>
          <div className="grid gap-3">
            {filtered.map((prediction) => (
              <PredictionCard key={prediction.id} prediction={prediction} />
            ))}
          </div>
        </div>
      </section>

      <CreatePredictionModal open={modalOpen} user={user} onClose={() => setModalOpen(false)} onLock={handleLock} />
    </AppShell>
  );
}
