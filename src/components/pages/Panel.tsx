import { User } from "@/interfaces/interfaces";
import { motion, AnimatePresence } from "framer-motion";

type props = {
  user: User;
};

const PanelContent: React.FC<props> = ({}) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -100, opacity: 0 }}
      >
        <div className="">
          <h1>Panel</h1>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PanelContent;
