import { useState, useEffect } from "react";
import { ThemeProvider } from "./components/theme-provider";
import SettingsContent from "./components/pages/Settings";
import PanelContent from "./components/pages/Panel";
import DashContent from "./components/pages/Dash";
import "./styles/globals.css";
import SideNav from "./components/side-nav";
import { getUserStruct, getUser, logout } from "./lib/auth";
import { User } from "./interfaces/interfaces";
import { type } from "@tauri-apps/api/os";
import { invoke } from "@tauri-apps/api";
import AccountContent from "./components/pages/Account";
import { Button } from "./components/ui/button";
import LoadingOverlay from "./components/loader";
const osType = await type();
if (osType == "Windows_NT") invoke("set_window_shadow");
type props = {

};

const App: React.FC<props> = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User>();
  const [selectedIcon, setSelectedIcon] = useState("dash");

  useEffect(() => {
    const getToken = async () => {
      let val = null;
      while (!val) {
        val = getUser();
        console.log(val);
        if (val) {
          const u = await getUserStruct(val);
          if (u) {
            setUser(u);
            setLoading(false);
          }
        }
      }
    };
    getToken();
    return () => {
      
    };
  }, [user]);

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

  const handleIconClick = (iconName: any) => {
    setSelectedIcon(iconName);
  };

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div
        className="w-full min-h-screen rounded-md"
        onContextMenu={(e) => e.preventDefault()}
        style={{ userSelect: "none" }}
      >
        {/* {loading && <LoadingOverlay />} */}
        {loading ? (
          <LoadingOverlay />
        ) : user ? (
          <SideNav
            user={user}
            handleIconClick={handleIconClick}
            selectedIcon={selectedIcon}
          >
            <div className="p-3">
              {selectedIcon === "dash" && <DashContent user={user} />}
              {selectedIcon === "panel" && <PanelContent user={user} />}
              {selectedIcon === "settings" && <SettingsContent />}
              {selectedIcon === "account" && (
                <AccountContent
                  user={user}
                  setSelectedIcon={setSelectedIcon}
                  handleIconClick={handleIconClick}
                />
              )}
            </div>
          </SideNav>
        ) : (
          <div
            className={`flex flex-col min-h-screen justify-center items-center`}
          >
            <p className="text-2xl m-2">
              Please login again, you have been signed out.
            </p>

            <Button
              onClick={() => {
                logout();
                invoke("close_client");
              }}
            >
              Login
            </Button>
          </div>
        )}
      </div>
    </ThemeProvider>
  );
};

export default App;
