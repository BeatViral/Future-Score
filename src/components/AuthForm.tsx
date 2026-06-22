import { FormEvent, useState } from "react";
import { ArrowRight, Mail, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AuthForm() {
  const navigate = useNavigate();
  const { signInWithGoogle, signInWithEmail, signUpWithEmail, demoLogin } = useAuth();
  const [mode, setMode] = useState<"login" | "signup">("signup");
  const [displayName, setDisplayName] = useState("Mahmood");
  const [email, setEmail] = useState("admin@futurescore.app");
  const [password, setPassword] = useState("FutureScore123");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      if (mode === "signup") {
        await signUpWithEmail(email, password, displayName);
      } else {
        await signInWithEmail(email, password);
      }
      navigate("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not complete auth request.");
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogle() {
    setLoading(true);
    setError("");
    try {
      await signInWithGoogle();
      navigate("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Google login failed.");
    } finally {
      setLoading(false);
    }
  }

  function handleDemo() {
    demoLogin();
    navigate("/dashboard");
  }

  return (
    <div className="glass-card mx-auto w-full max-w-md p-6">
      <div className="mb-6">
        <div className="mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-gold/10 text-gold">
          <Sparkles className="h-6 w-6" />
        </div>
        <h1 className="text-2xl font-black text-white">Start building your prediction reputation.</h1>
        <p className="mt-2 text-sm text-muted">Sign up to become a master predictor.</p>
      </div>

      <div className="mb-5 grid grid-cols-2 rounded-xl border border-border bg-black/20 p-1">
        {(["signup", "login"] as const).map((item) => (
          <button
            key={item}
            className={`rounded-lg px-3 py-2 text-sm font-bold transition ${
              mode === item ? "bg-gold text-black" : "text-slate-300 hover:bg-white/5"
            }`}
            onClick={() => setMode(item)}
          >
            {item === "signup" ? "Sign up" : "Login"}
          </button>
        ))}
      </div>

      <form className="space-y-3" onSubmit={handleSubmit}>
        {mode === "signup" && (
          <label className="block">
            <span className="mb-1 block text-xs font-bold text-muted">Display name</span>
            <input className="future-input" value={displayName} onChange={(event) => setDisplayName(event.target.value)} />
          </label>
        )}
        <label className="block">
          <span className="mb-1 block text-xs font-bold text-muted">Email</span>
          <input className="future-input" type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
        </label>
        <label className="block">
          <span className="mb-1 block text-xs font-bold text-muted">Password</span>
          <input
            className="future-input"
            type="password"
            minLength={6}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        {error && <p className="rounded-xl border border-futureRed/30 bg-futureRed/10 p-3 text-sm text-futureRed">{error}</p>}
        <button className="gold-button w-full" disabled={loading}>
          {loading ? "Working..." : mode === "signup" ? "Create account" : "Login"}
          <ArrowRight className="h-4 w-4" />
        </button>
      </form>

      <div className="my-5 flex items-center gap-3 text-xs text-muted">
        <span className="h-px flex-1 bg-white/10" />
        or
        <span className="h-px flex-1 bg-white/10" />
      </div>

      <div className="grid gap-3">
        <button className="ghost-button w-full" onClick={handleGoogle}>
          <Mail className="h-4 w-4" />
          Continue with Google
        </button>
        <button className="ghost-button w-full" onClick={handleDemo}>
          Use demo mode
        </button>
      </div>
    </div>
  );
}
