import React, { useEffect } from "react";
// import TitleBar from "../components/title-bar";
import { type } from "@tauri-apps/api/os";
import { invoke } from "@tauri-apps/api";
// import { open } from "@tauri-apps/api/shell";
// import { listen } from "@tauri-apps/api/event";
import LoadingOverlay from "@/components/loader";
// import axios from "axios";
// import { Store } from "tauri-plugin-store-api";
import { ThemeProvider } from "@/components/theme-provider";
// import { Button } from "@/components/ui/button";
import { getUser } from "@/lib/auth";
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

const Splash: React.FC = ({}) => {

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
  useEffect(() => {
    // Function to be executed after 5 seconds
    const executeAfterFiveSeconds = async () => {
      let token = await getUser();
      console.log(token);
      invoke("close_splashscreen", { screen: token ? "main" : "preload"});
      // Replace the above console.log with your desired command
    };

    // Set up the timer using setTimeout
    const timer = setTimeout(executeAfterFiveSeconds, 2000);

    // Clear the timer if the component unmounts or if the dependencies change
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
