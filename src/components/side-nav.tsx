import React, { ReactNode } from "react";
import { X, Minus } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { appWindow } from "@tauri-apps/api/window";
import { User } from "@/interfaces/interfaces";
import SettingsIcon from "@mui/icons-material/Settings";
import WindowIcon from "@mui/icons-material/Window";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { invoke } from "@tauri-apps/api";
export type props = {
  children?: ReactNode;
  user: User;
  handleIconClick: (iconName: string) => void;
};

const SideNav: React.FC<props> = ({ children, user, handleIconClick }) => {
  const nameInitial = user.username?.charAt(0).toUpperCase() || "";
  const [activeIcon, setActiveIcon] = useState<string | null>(null);

  const handleClick = (iconName: string) => {
    setActiveIcon(iconName);
    handleIconClick(iconName);
  };

  return (
    <div className="flex min-h-screen w-full">
      <div
        className={`fixed h-screen flex flex-col w-16 z-[61] rounded-l-md bg-slate-100 dark:bg-slate-900/40`}
      >
        <div
          className={`flex-col origin-center duration-300 h-full border-r  p-2 text-center items-center justify-between flex`}
        >
          <div className="flex flex-col items-center justify-between">
            {/* <img src={logo} className="w-10 h-10 mt-2" /> */}
            <Badge variant="outline" className="mt-2 rounded-md ">
              flow
            </Badge>
            <div className="flex flex-col mt-12">
              <Button
                variant="ghost"
                className={`p-2 rounded-md my-2 ${
                  activeIcon === "dash"
                    ? "bg-primary dark:bg-accent text-white "
                    : ""
                }`}
                onClick={() => handleClick("dash")}
              >
                <EqualizerIcon fontSize="medium" />
              </Button>

              <Button
                variant="ghost"
                className={` p-2 rounded-md my-2 ${
                  activeIcon === "panel"
                    ? "bg-primary dark:bg-accent text-white "
                    : ""
                }`}
                onClick={() => handleClick("panel")}
              >
                <WindowIcon fontSize="medium" />
              </Button>

              <Button
                variant="ghost"
                className={`p-2 rounded-md my-2 ${
                  activeIcon === "settings"
                    ? "bg-primary dark:bg-accent text-white "
                    : ""
                }`}
                onClick={() => handleClick("settings")}
              >
                <SettingsIcon fontSize="medium" />
              </Button>
            </div>
          </div>

          <div
            className={`p-1 rounded-full ${
              activeIcon === "account" ? "bg-primary dark:bg-accent" : ""
            }`}
          >
            <Avatar onClick={() => handleClick("account")}>
              <AvatarImage
                src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`}
              />
              <AvatarFallback>{nameInitial}</AvatarFallback>
            </Avatar>
            {/* {user.avatar ? (
              <img
                src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`}
                alt="Avatar"
                className={`w-10 h-10 rounded-full `}
                onClick={() => handleClick("account")}
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-slate-300 text-slate-600 flex items-center justify-center">
                {nameInitial}
              </div>
            )} */}
          </div>
        </div>
      </div>
      <main
        data-tauri-drag-region
        className="flex-1 flex flex-col rounded-tr-md"
      >
        <div
          data-tauri-drag-region
          className={`fixed flex items-center justify-end p-2 z-[60] right-0 w-full bg-background`}
        >
          <Button
            variant="ghost"
            className="h-7"
            onClick={() => {
              appWindow.minimize();
            }}
          >
            <Minus className="w-4 h-4" />
          </Button>

          <Button
            variant="ghost"
            className="h-7 group"
            onClick={() => {
              invoke("exit_app");
            }}
          >
            <X className="w-4 h-4 group-hover:text-red-500" />
          </Button>
        </div>

        <div className="left-16 p-2 mt-10 overflow-y-auto overflow-x-hidden fixed top-0 bottom-0 right-0">
          {children}
        </div>
      </main>
    </div>
  );
};

export default SideNav;
