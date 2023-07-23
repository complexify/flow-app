import { User } from "../../lib/getUser";
import { Store } from "tauri-plugin-store-api";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../ui/button";
type props = {
  user: User;
};
type TokenStorageProps = {
  value: string;
};

const store = new Store("token.dat");

const AccountContent: React.FC<props> = ({ user }) => {
  useEffect(() => {
    const getToken = async () => {
      const val = (await store.get("authToken")) as TokenStorageProps;
      console.log(val);
    };
    getToken();
    return () => {
      getToken();
    };
  }, []);

  async function logout() {
    await store.delete("authToken");
    const val = (await store.get("authToken")) as TokenStorageProps;
    console.log(val);
  }
  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -100, opacity: 0 }}
      >
        <div className="flex flex-col">
          <h1>{user.username}</h1>
          <Button variant="destructive" className="bg-red-600" onClick={logout}>Logout</Button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AccountContent;
