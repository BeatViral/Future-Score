import { useState } from "react";
import AppShell from "../components/AppShell";
import EventCard from "../components/EventCard";
import SectionHeader from "../components/SectionHeader";
import { predictionEvents } from "../data/mockData";
import type { PredictionEvent } from "../types";

export default function Events() {
  const [message, setMessage] = useState("");

  function joinEvent(event: PredictionEvent) {
    setMessage(`Joined ${event.title}. Challenge entry is mocked for v1.`);
  }

  return (
    <AppShell>
      <section className="glass-card mb-4 p-6">
        <p className="mb-2 text-sm font-black uppercase text-gold">Prediction Events</p>
        <h1 className="text-4xl font-black text-white">Forza-style challenges for prediction skill.</h1>
        <p className="mt-3 max-w-2xl text-sm text-muted">
          Join live and upcoming events, spend credits where required, and compete for reward pools, badges, and rank boosts.
        </p>
        {message && <p className="mt-4 rounded-xl border border-futureGreen/30 bg-futureGreen/10 p-3 text-sm text-futureGreen">{message}</p>}
      </section>

      <section className="glass-card mb-4 p-5">
        <SectionHeader title="Featured Challenges" />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {predictionEvents.filter((event) => event.featured).map((event) => (
            <EventCard key={event.id} event={event} onJoin={joinEvent} />
          ))}
        </div>
      </section>

      <section className="glass-card p-5">
        <SectionHeader title="All Prediction Events" />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {predictionEvents.map((event) => (
            <EventCard key={event.id} event={event} onJoin={joinEvent} />
          ))}
        </div>
      </section>
    </AppShell>
  );
}
