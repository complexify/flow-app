import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../ui/button";
import { User } from "@/interfaces/interfaces";
import { invoke } from "@tauri-apps/api";
import { logout } from "@/lib/auth";
import React from "react";

type props = {
  user: User;
  setSelectedIcon: React.Dispatch<React.SetStateAction<string>>;
  handleIconClick: (icon: string) => void;
};

const AccountContent: React.FC<props> = ({ user, setSelectedIcon, handleIconClick }) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -100, opacity: 0 }}
      >
        <div className="flex flex-col">
          <h1>{user.username}</h1>

          <Button
            variant="destructive"
            className="bg-red-600"
            onClick={() => {
              // Logout action
              logout();

              // Set the selected icon and trigger the handleIconClick
              handleIconClick("dash");
              setSelectedIcon("dash");
              // Any other actions you need to perform
              invoke("close_client");
            }}
          >
            Logout
          </Button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AccountContent;
