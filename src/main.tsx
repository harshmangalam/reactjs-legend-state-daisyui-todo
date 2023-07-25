import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { enableReactUse } from "@legendapp/state/config/enableReactUse";

enableReactUse(); // This adds the use() function to observables

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
