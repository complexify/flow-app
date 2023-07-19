import { useState, useEffect } from "react";
import { ThemeProvider } from "./components/theme-provider";
import SettingsContent from "./components/pages/Settings";
import PanelContent from "./components/pages/Panel";
import DashContent from "./components/pages/Dash";
import "./styles/globals.css";
import SideNav from "./components/side-nav";
import { Store } from "tauri-plugin-store-api";
import getUser, { User } from "../src/lib/getUser";
import LoadingOverlay from "./components/loader";
import { type } from "@tauri-apps/api/os";
import { invoke } from "@tauri-apps/api";
import AccountContent from "./components/pages/Account";
const osType = await type();
const store = new Store("token.dat");
if (osType == "Windows_NT") invoke("set_window_shadow");

type TokenStorageProps = {
  value: string;
};
function App() {
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState(null);
  useEffect(() => {
    const getToken = async () => {
      setLoading(true);
      const val = (await store.get("authToken")) as TokenStorageProps;
      console.log(val);
      if (val) {
        const u = await getUser(val.value!);
        if (u) {
          setUser(u);
          setLoading(false);
        }
      }
    };
    getToken();
    return () => {
      getToken();
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

  const handleIconClick = (iconName: any) => {
    setSelectedIcon(iconName);
  };
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div
        className="w-full min-h-screen rounded-md"
        onContextMenu={(e) => e.preventDefault()}
      >
        {loading && <LoadingOverlay />}
        {user ? (
          <SideNav user={user} handleIconClick={handleIconClick}>
            <div className="p-3">
              {/* <App user={user} /> */}
              {selectedIcon === "dash" && <DashContent user={user} />}
              {selectedIcon === "panel" && <PanelContent user={user} />}
              {selectedIcon === "settings" && <SettingsContent />}
              {selectedIcon === "account" && <AccountContent user={user} />}
            </div>
          </SideNav>
        ) : (
          <></>
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;
