import { Navigate, Route, Routes } from "react-router-dom";
import type { ReactElement } from "react";
import { useAuth } from "./context/AuthContext";
import Admin from "./pages/Admin";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Events from "./pages/Events";
import Home from "./pages/Home";
import Learn from "./pages/Learn";
import Marketplace from "./pages/Marketplace";
import NotFound from "./pages/NotFound";
import Predictions from "./pages/Predictions";
import Rankings from "./pages/Rankings";
import Wallet from "./pages/Wallet";

function ProtectedRoute({ children }: { children: ReactElement }) {
  const { isAuthenticated, loading } = useAuth();
  if (loading) {
    return (
      <div className="grid min-h-screen place-items-center bg-background text-gold">
        Loading FutureScore...
      </div>
    );
  }
  return isAuthenticated ? children : <Navigate to="/auth" replace />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<Auth />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route path="/predictions" element={<Predictions />} />
      <Route path="/rankings" element={<Rankings />} />
      <Route path="/marketplace" element={<Marketplace />} />
      <Route path="/events" element={<Events />} />
      <Route
        path="/wallet"
        element={
          <ProtectedRoute>
            <Wallet />
          </ProtectedRoute>
        }
      />
      <Route path="/learn" element={<Learn />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <Admin />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
