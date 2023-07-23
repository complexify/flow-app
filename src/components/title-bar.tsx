import React from "react";
import { X, Minus } from "lucide-react";
import { appWindow } from "@tauri-apps/api/window";
import { Button } from "./ui/button";
import { invoke } from "@tauri-apps/api";
const TitleBar: React.FC = ({}) => {
  return (
    <div
      data-tauri-drag-region
      className="flex w-full rounded-t-md justify-between items-center p-1"
    >
      <div>
        {/* <h1 data-tauri-drag-region className="">
          flow
        </h1> */}
      </div>

      <div className="flex">
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
          <X className="w-4 h-4  group-hover:text-red-500" />
        </Button>
      </div>
    </div>
  );
};

export default TitleBar;
