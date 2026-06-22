/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#05070d",
        surface: "#0b1018",
        surface2: "#111827",
        border: "rgba(255,255,255,0.08)",
        gold: "#f5c451",
        gold2: "#d99f2b",
        muted: "#94a3b8",
        futureGreen: "#22c55e",
        futureRed: "#ef4444",
        futureBlue: "#38bdf8",
        futurePurple: "#a855f7"
      },
      boxShadow: {
        gold: "0 0 32px rgba(245,196,81,0.2)",
        card: "0 18px 80px rgba(0,0,0,0.32)"
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "Segoe UI", "Arial", "sans-serif"]
      },
      backgroundImage: {
        "future-radial":
          "radial-gradient(circle at 25% 0%, rgba(245,196,81,0.16), transparent 34%), radial-gradient(circle at 80% 20%, rgba(56,189,248,0.1), transparent 28%), linear-gradient(135deg, #05070d 0%, #07111c 48%, #05070d 100%)"
      }
    }
  },
  plugins: []
};
