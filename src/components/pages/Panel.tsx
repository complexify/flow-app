import { User } from "@/interfaces/interfaces";
import { motion, AnimatePresence } from "framer-motion";
import { PlusIcon } from "lucide-react";
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
        <div>
          <h3 className="mb-4 text-lg font-medium">Panel</h3>
          <div className="space-y-4 rounded-md w-full">
            <div className="grid grid-rows-4 gap-4">
              <div className="rounded-lg border-l-4 border-blue-500 h-12 bg-slate-50 dark:bg-slate-900/40 shadow-md hover:scale-[1.03] duration-150"></div>
              <div className="rounded-lg border-l-4 border-red-500 h-32 bg-slate-50 dark:bg-slate-900/40 shadow-md hover:scale-[1.09] duration-150"></div>
              <div className="rounded-lg border-l-4 border-green-500 h-32 bg-slate-50 dark:bg-slate-900/40 shadow-md hover:scale-[1.09] duration-150"></div>
              <div className="rounded-lg border-l-4 border-violet-500 h-32 bg-slate-50 dark:bg-slate-900/40 shadow-md hover:scale-[1.09] duration-150"></div>

              <div className="group flex items-center justify-center w-1/2 rounded-lg border-dashed border-2 h-32 bg-slate-100 dark:bg-slate-900/40 hover:border-primary shadow-md">
                <PlusIcon className="group-hover:text-primary w-1/2 h-1/2 text-border dark:text-border duration-150"></PlusIcon>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PanelContent;
