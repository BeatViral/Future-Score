import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import App from "./App";
import "./index.css";

function getRouterBaseName() {
  const configuredBase = import.meta.env.BASE_URL;

  if (configuredBase && configuredBase !== "/" && configuredBase !== "./") {
    return configuredBase.replace(/\/$/, "");
  }

  if (window.location.hostname.endsWith("github.io")) {
    const [repoName, folderName] = window.location.pathname.split("/").filter(Boolean);

    if (repoName === "Future-Score" && folderName === "dist") {
      return "/Future-Score/dist";
    }

    if (repoName === "Future-Score") {
      return "/Future-Score";
    }
  }

  return undefined;
}

const routerBaseName = getRouterBaseName();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter basename={routerBaseName}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
