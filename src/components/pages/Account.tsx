import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../ui/button";
import { User } from "@/interfaces/interfaces";
// import { Store } from "tauri-plugin-store-api";
import { invoke } from "@tauri-apps/api";
import { logout } from "@/lib/auth";
type props = {
  user: User;
};
// const store = new Store("token.dat");
const AccountContent: React.FC<props> = ({ user }) => {


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
              logout();
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
