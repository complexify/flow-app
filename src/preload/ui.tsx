import React, { useEffect } from "react";
import TitleBar from "../components/title-bar";
import { type } from "@tauri-apps/api/os";
import { invoke } from "@tauri-apps/api";
// import { open } from "@tauri-apps/api/shell";
import { listen } from "@tauri-apps/api/event";
// import axios from "axios";
// import { Store } from "tauri-plugin-store-api";
import { ThemeProvider } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
const osType = await type();
// const store = new Store("token.dat");
export type User = {
  id: string;
  username: string;
  discriminator: string;
  avatar?: string;
  bot?: boolean;
  system?: boolean;
  mfa_enabled?: boolean;
  banner?: string;
  accent_color?: number;
  locale?: string;
  verified?: boolean;
  email?: string;
  flags?: number;
  premium_type?: number;
  public_flags?: number;
};

const Preload: React.FC = ({}) => {
  async function process() {
    invoke("open_client");
  }

  useEffect(() => {
    const unlisten = async () => {
      await listen("scheme-request-received", async (event) => {
        console.log("RECEIVED", event.payload);

        if (Array.isArray(event.payload)) {
          const authtoken = event.payload.find(
            (param) => param.key === "authtoken"
          )?.value;
          console.log(authtoken);
        }
      });
    };

    unlisten();
    return () => {
      unlisten();
    };
  }, []);

  useEffect(() => {
    // define a custom handler function
    // for the contextmenu event
    const handleContextMenu = (e: any) => {
      // prevent the right-click menu from appearing
      e.preventDefault();
    };

    // attach the event listener to
    // the document object
    document.addEventListener("contextmenu", handleContextMenu);

    // clean up the event listener when
    // the component unmounts
    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);

  function disable_web_functions() {
    document.addEventListener("contextmenu", (event) => event.preventDefault());
    document.onkeydown = function (e) {
      // Reload F5
      if ((e.ctrlKey && e.key === "F5") || e.key === "F5") {
        e.preventDefault();
        // Reload Ctrl + R
      } else if ((e.ctrlKey && e.key === "r") || (e.ctrlKey && e.key === "R")) {
        e.preventDefault();
        // Print
      } else if ((e.ctrlKey && e.key === "p") || (e.ctrlKey && e.key === "P")) {
        e.preventDefault();
        // Search
      } else if (
        (e.ctrlKey && e.key === "f") ||
        (e.ctrlKey && e.key === "F") ||
        e.key === "F3"
      ) {
        e.preventDefault();
        // F7
      } else if (e.key === "F7") {
        e.preventDefault();
      }
    };
  }
  if (window.location.hostname !== "localhost") {
    disable_web_functions();
  } else if (osType == "Linux" || osType == "Darwin") {
    disable_web_functions();
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <TitleBar />
      <div
        className={`flex flex-col min-h-[calc(100vh-80px)] justify-center items-center`}
      >
        <h1 className="text-3xl m-2">Flow</h1>
        <Button onClick={process}>Open Client</Button>
      </div>
    </ThemeProvider>
  );
};

export default Preload;
