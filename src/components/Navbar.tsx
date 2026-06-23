import {
  Bell,
  BookOpen,
  ChevronDown,
  Home,
  LogIn,
  Search,
  Shield,
  ShoppingBag,
  Trophy,
} from "lucide-react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { adminEmail } from "../lib/firebase";
import { cn } from "../lib/utils";

const links = [
  { to: "/", label: "Home", icon: Home },
  { to: "/predictions", label: "Predictions", icon: Search },
  { to: "/rankings", label: "Rankings", icon: Trophy },
  { to: "/marketplace", label: "Marketplace", icon: ShoppingBag },
  { to: "/events", label: "Quests", icon: Trophy },
  { to: "/learn", label: "Learn", icon: BookOpen },
];

export default function Navbar() {
  const { profile, isAuthenticated } = useAuth();
  const location = useLocation();
  const showAdmin = profile?.email === adminEmail && location.pathname !== "/";

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-background/82 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-[1720px] items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="flex shrink-0 items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-gold to-gold2 text-lg font-black text-black shadow-gold">
            F
          </div>
          <span className="hidden text-xl font-black sm:block">FutureScore</span>
        </Link>

        <nav className="hidden flex-1 items-center justify-center gap-7 overflow-x-auto lg:flex">
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                cn(
                  "relative flex min-h-11 items-center gap-2 px-1 text-sm font-semibold text-slate-300 transition",
                  isActive
                    ? "text-white after:absolute after:bottom-[-13px] after:left-0 after:h-px after:w-full after:bg-gold after:shadow-[0_0_18px_rgba(245,196,81,0.8)]"
                    : "hover:text-white",
                )
              }
            >
              <Icon className="h-4 w-4 lg:hidden" />
              {label}
            </NavLink>
          ))}
          {showAdmin && (
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-slate-300 transition",
                  isActive ? "bg-gold/10 text-gold" : "hover:bg-white/5 hover:text-white",
                )
              }
            >
              <Shield className="h-4 w-4" />
              Admin
            </NavLink>
          )}
        </nav>

        <div className="ml-auto hidden min-w-[260px] max-w-[360px] flex-1 items-center gap-2 rounded-2xl border border-border bg-black/30 px-3 py-2 text-muted xl:flex">
          <Search className="h-4 w-4" />
          <input
            className="w-full bg-transparent text-sm outline-none placeholder:text-slate-500"
            placeholder="Search predictions, people..."
          />
          <span className="rounded-md bg-white/10 px-1.5 py-0.5 text-[10px] text-slate-400">
            Ctrl K
          </span>
        </div>

        <button className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-white/5 text-slate-200 transition hover:border-gold/40 hover:text-gold">
          <Bell className="h-5 w-5" />
        </button>

        <Link
          to="/wallet"
          className="hidden items-center gap-2 rounded-xl border border-gold/30 bg-gold/10 px-3 py-2 text-sm font-bold text-gold shadow-gold sm:flex"
        >
          <ShoppingBag className="h-4 w-4" />
          <span>{profile?.credits ?? 10}</span>
          <span className="text-xs font-medium text-slate-300">Credits</span>
        </Link>

        {isAuthenticated ? (
          <Link to="/dashboard" className="flex items-center gap-2 rounded-full border border-border bg-white/5 p-1 pr-2">
            <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-gold to-futurePurple text-sm font-black text-black">
              {(profile?.displayName || "F").slice(0, 1)}
            </div>
            <ChevronDown className="h-4 w-4 text-muted" />
          </Link>
        ) : (
          <Link to="/auth" className="gold-button px-4 py-2">
            <LogIn className="h-4 w-4" />
            Sign in
          </Link>
        )}
      </div>

      <nav className="flex gap-2 overflow-x-auto px-4 pb-3 lg:hidden">
        {links.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              cn(
                "shrink-0 rounded-full border px-3 py-1.5 text-xs font-semibold",
                isActive
                  ? "border-gold/40 bg-gold/10 text-gold"
                  : "border-border bg-white/5 text-slate-300",
              )
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
