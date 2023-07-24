import React, { useEffect, useState } from "react";
import TitleBar from "../components/title-bar";
import { type } from "@tauri-apps/api/os";
import LoadingOverlay from "@/components/loader";
import { open } from "@tauri-apps/api/shell";
import { ThemeProvider } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { login, getUser } from "@/lib/auth";
import { listen } from "@tauri-apps/api/event";
import { invoke } from "@tauri-apps/api";
import { Store } from "tauri-plugin-store-api";
const osType = await type();
const store = new Store("token.dat");

const Preload: React.FC = ({}) => {
  const [loading, setLoading] = useState(false);

   useEffect(() => {
     // Function to check and handle the authToken
     const checkAuthToken = async () => {
       const val = await store.get("authToken");
       console.log(val);
       if (!val) {
         setLoading(true);

         // Listen for the "scheme-request-received" event
         const unlistenSchemeRequest = listen(
           "scheme-request-received",
           async (event) => {
             console.log("RECEIVED", event.payload);

             if (Array.isArray(event.payload)) {
               const authtoken = event.payload.find(
                 (param) => param.key === "authtoken"
               )?.value;

               if (authtoken) {
                 // Save the authToken to local storage and perform the necessary actions
                 await store.set("authToken", { value: authtoken });
                 await store.save();
                 setLoading(false);
                 invoke("open_client");
               }
             }
           }
         );

         return () => {
           // Clean up the event listener when this useEffect is re-executed or the component unmounts
           unlistenSchemeRequest.then((f) => f());
         };
       } else {
         // If authToken exists in local storage, perform the necessary actions
         invoke("open_client");
       }
     };

     checkAuthToken();
   }, []);
  
  function process() {
    setLoading(true);
    open("http://localhost:3000/?authType=app");
  }

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

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <TitleBar />
      <div
        className={`flex flex-col min-h-[calc(100vh-80px)] justify-center items-center`}
      >
        <h1 className="text-3xl m-2">Flow</h1>
        {loading ? (
          <LoadingOverlay />
        ) : (
          <Button onClick={process}>Login</Button>
        )}
      </div>
    </ThemeProvider>
  );
};

export default Preload;
