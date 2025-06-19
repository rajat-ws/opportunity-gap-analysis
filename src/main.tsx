import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Import API tests for browser console access
import "./lib/api-test";

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error('Root element with id "root" not found');
}
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
