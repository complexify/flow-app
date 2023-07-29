import { User } from "@/interfaces/interfaces";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LayoutGrid, AlignJustify } from "lucide-react";
import { Button } from "../ui/button";
type props = {
  user: User;
};

const PanelContent: React.FC<props> = ({}) => {
  const [grid, setGrid] = useState<boolean>(true);
  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -100, opacity: 0 }}
      >
        <div>
          <div className="mb-4 w-full bg-background sticky top-0 flex justify-between items-center p-2">
            <h3 className="text-lg font-medium bg-background">Expenses</h3>
            <div className="flex justify-between">
              <Tabs
                defaultValue={grid ? "grid" : "list"}
                className="mx-2 border rounded-md"
              >
                <TabsList>
                  <TabsTrigger
                    value="grid"
                    onClick={() => {
                      setGrid(true);
                    }}
                  >
                    <LayoutGrid />
                  </TabsTrigger>
                  <TabsTrigger
                    value="list"
                    onClick={() => {
                      setGrid(false);
                    }}
                  >
                    <AlignJustify />
                  </TabsTrigger>
                </TabsList>
              </Tabs>
              <Button>Add New</Button>
            </div>
          </div>
          <div className="space-y-4 rounded-md w-full">
            <div
              className={`grid ${grid ? "grid-cols-4" : "grid-rows-4"} gap-4`}
            >
              <div
                className={`rounded-lg border-l-4 border-blue-500 ${
                  grid ? "h-32" : "h-12"
                } bg-slate-50 dark:bg-slate-900/40 shadow-md ${
                  grid ? "hover:scale-[1.09]" : "hover:scale-[1.03]"
                } duration-150`}
              ></div>
              <div
                className={`rounded-lg border-l-4 border-red-500  ${
                  grid ? "h-32" : "h-12"
                }
                 bg-slate-50 dark:bg-slate-900/40 shadow-md ${
                   grid ? "hover:scale-[1.09]" : "hover:scale-[1.03]"
                 } duration-150`}
              ></div>
              <div
                className={`rounded-lg border-l-4 border-blue-500  ${
                  grid ? "h-32" : "h-12"
                } bg-slate-50 dark:bg-slate-900/40 shadow-md ${
                  grid ? "hover:scale-[1.09]" : "hover:scale-[1.03]"
                } duration-150`}
              ></div>
              <div
                className={`rounded-lg border-l-4 border-red-500 ${
                  grid ? "h-32" : "h-12"
                } bg-slate-50 dark:bg-slate-900/40 shadow-md ${
                  grid ? "hover:scale-[1.09]" : "hover:scale-[1.03]"
                } duration-150`}
              ></div>
              <div
                className={`rounded-lg border-l-4 border-blue-500 ${
                  grid ? "h-32" : "h-12"
                } bg-slate-50 dark:bg-slate-900/40 shadow-md ${
                  grid ? "hover:scale-[1.09]" : "hover:scale-[1.03]"
                } duration-150`}
              ></div>
              <div
                className={`rounded-lg border-l-4 border-red-500  ${
                  grid ? "h-32" : "h-12"
                }
                 bg-slate-50 dark:bg-slate-900/40 shadow-md ${
                   grid ? "hover:scale-[1.09]" : "hover:scale-[1.03]"
                 } duration-150`}
              ></div>
              <div
                className={`rounded-lg border-l-4 border-blue-500  ${
                  grid ? "h-32" : "h-12"
                } bg-slate-50 dark:bg-slate-900/40 shadow-md ${
                  grid ? "hover:scale-[1.09]" : "hover:scale-[1.03]"
                } duration-150`}
              ></div>
              <div
                className={`rounded-lg border-l-4 border-red-500 ${
                  grid ? "h-32" : "h-12"
                } bg-slate-50 dark:bg-slate-900/40 shadow-md ${
                  grid ? "hover:scale-[1.09]" : "hover:scale-[1.03]"
                } duration-150`}
              ></div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PanelContent;
