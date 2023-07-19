import React, { useEffect, useState } from "react";
import TitleBar from "../components/title-bar";
import { type } from "@tauri-apps/api/os";
import { invoke } from "@tauri-apps/api";
import { open } from "@tauri-apps/api/shell";
import { listen } from "@tauri-apps/api/event";
import LoadingOverlay from "@/components/loader";
import axios from "axios";
import { Store } from "tauri-plugin-store-api";
import { ThemeProvider } from "@/components/theme-provider";
const osType = await type();
const store = new Store("token.dat");
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
  const [schemeRequest, setSchemeRequest] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unlisten = async () => {
      const val = await store.get("authToken");
      console.log(val);
      if (!val) {
        1;
        setLoading(false);
        await listen("scheme-request-received", async (event) => {
          console.log("RECEIVED", event.payload);

          if (Array.isArray(event.payload)) {
            const authtoken = event.payload.find(
              (param) => param.key === "authtoken"
            )?.value;

            if (authtoken) {
              // setSchemeRequest(authtoken);
              const response = await axios.get<any>(
                `https://discord.com/api/v10/users/@me`,
                {
                  headers: { Authorization: `Bearer ${authtoken}` },
                }
              );
              console.log(response);
              setSchemeRequest(response.data.username);
              await store.set("authToken", { value: authtoken });
              await store.save();
              setLoading(false);
              invoke("close_splashscreen");
            }
          }
        });
      } else {
        invoke("close_splashscreen");
      }
    };

    unlisten(); // Assuming unlisten function is provided by Tauri

    return () => {
      unlisten();
    };
  }, []);

  function process() {
    setLoading(true);
    open("http://localhost:3000/?authType=app");
    // invoke("close_splashscreen");
  }

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
      {loading && <LoadingOverlay />}
      <div className="flex flex-col items-center justify-center text-center overflow-hidden w-full">
        {schemeRequest ? (
          <h1>Hello, {schemeRequest}</h1>
        ) : (
          <>
            <h1 className="text-3xl p-3 m-3">Awaiting Login</h1>
            <button
              className="bg-blue-500 p-3 mx-3 w-1/3 rounded-lg"
              onClick={process}
            >
              login
            </button>
          </>
        )}
      </div>
    </ThemeProvider>
  );
};

export default Splash;
