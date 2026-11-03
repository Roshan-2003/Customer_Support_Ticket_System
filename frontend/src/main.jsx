import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import "./index.css";

import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />

    <Toaster
      position="top-right"
      toastOptions={{
        duration: 3500,
        style: {
          background: "#ffffff",
          color: "#1e293b",
          border: "1px solid #e2e8f0",
          borderRadius: "12px",
          boxShadow: "0 10px 25px -5px rgba(15, 23, 42, 0.08), 0 8px 10px -6px rgba(15, 23, 42, 0.03)",
          fontSize: "0.875rem",
          fontWeight: 500,
          padding: "12px 16px",
        },
        success: {
          iconTheme: {
            primary: "#10b981",
            secondary: "#ffffff",
          },
        },
        error: {
          iconTheme: {
            primary: "#ef4444",
            secondary: "#ffffff",
          },
        },
      }}
    />
  </React.StrictMode>
);
