import { ReactNode } from "react";
import Navbar from "./Navbar";

export default function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen">
      <div className="pointer-events-none fixed inset-0 future-grid opacity-30" />
      <Navbar />
      <main className="relative mx-auto w-full max-w-[1720px] px-4 pb-10 pt-4 sm:px-6 lg:px-8">
        {children}
      </main>
      <footer className="relative border-t border-white/10 bg-black/30">
        <div className="mx-auto max-w-[1720px] px-4 py-6 text-xs leading-relaxed text-muted sm:px-6 lg:px-8">
          <p>
            Future Credits are in-app reward points used inside the FutureScore platform. They are not cash, not gambling winnings, and not guaranteed to have monetary value.
          </p>
          <p className="mt-2">
            If FutureScore launches a token in the future, eligible credits may become convertible into FutureCoin, but no future value is promised.
          </p>
        </div>
      </footer>
    </div>
  );
}
