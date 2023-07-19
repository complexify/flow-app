import React from "react";
import ReactDOM from "react-dom/client";
import Splash from "./ui";
import "../styles/globals.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
      <div className="w-full min-h-screen rounded-md">
        <Splash />
      </div>
  </React.StrictMode>
);
