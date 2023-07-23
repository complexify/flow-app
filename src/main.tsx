import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/globals.css";
import { Toaster } from "./components/ui/toaster";
// import { AnimatePresence } from "framer-motion";
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    {/* <AnimatePresence > */}
      <div className="rounded-md">
        <App />
        <Toaster />
      </div>
    {/* </AnimatePresence> */}
  </React.StrictMode>
);
