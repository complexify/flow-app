import React, { useEffect } from "react";
import { type } from "@tauri-apps/api/os";
import { invoke } from "@tauri-apps/api";
import LoadingOverlay from "@/components/loader";
import { ThemeProvider } from "@/components/theme-provider";
import { getUser } from "@/lib/auth";

const osType = await type();

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

const Splash: React.FC = ({}) => {

  useEffect(() => {
    const handleContextMenu = (e: any) => {
      e.preventDefault();
    };
    document.addEventListener("contextmenu", handleContextMenu);

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
  useEffect(() => {
    const executeAfterFiveSeconds = async () => {
      let token = await getUser();
      console.log(token);
      invoke("close_splashscreen", { screen: token ? "main" : "preload"});
    };

    const timer = setTimeout(executeAfterFiveSeconds, 2000);

    return () => clearTimeout(timer);
  }, []);


  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {/* <TitleBar /> */}
      {/*  min-h-[calc(100vh-80px)] */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div
          className={`flex flex-col min-h-[calc(100vh-80px)] justify-center items-center `}
        >
          <h1 className="text-3xl m-2">Flow</h1>
          <LoadingOverlay />
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Splash;
