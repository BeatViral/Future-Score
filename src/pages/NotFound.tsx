import { Link } from "react-router-dom";
import AppShell from "../components/AppShell";

export default function NotFound() {
  return (
    <AppShell>
      <section className="grid min-h-[60vh] place-items-center text-center">
        <div>
          <p className="mb-3 text-sm font-black uppercase text-gold">404</p>
          <h1 className="text-5xl font-black text-white">This future has not been predicted yet.</h1>
          <p className="mx-auto mt-4 max-w-xl text-muted">
            Head back to FutureScore and lock a measurable call.
          </p>
          <Link to="/" className="gold-button mt-8">
            Back home
          </Link>
        </div>
      </section>
    </AppShell>
  );
}
