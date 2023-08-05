import { User, Expense } from "@/interfaces/interfaces";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LayoutGrid, AlignJustify } from "lucide-react";
import { Button } from "../ui/button";
import { invoke } from "@tauri-apps/api";
import { getUserId } from "@/lib/auth";
import ExpenseCard from "../expense";
import LoadingOverlay from "../loader";

type props = {
  user: User;
};

const PanelContent: React.FC<props> = ({ user }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [grid, setGrid] = useState<boolean>(true);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const token = getUserId();

  useEffect(() => {
    let isMounted = true;

    const getExpenses = async () => {
      try {
        const expenses: Expense[] = await invoke("get_user_expenses", {
          url: "https://next-js-auth-complexify.vercel.app/api/users/getExpenses",
          token,
        });

        if (isMounted) {
          setExpenses(expenses);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching expenses:", error);

        if (isMounted) {
          setLoading(false);
          // Optionally, show an error message to the user or handle the error gracefully.
        }
      }
    };

    if (user) {
      // Call the API only if the user is available.
      getExpenses();
    }

    return () => {
      // Cleanup function to prevent setting state on unmounted component.
      isMounted = false;
    };
  }, []);

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
            {loading ? (
              <div
                className={`flex flex-col min-h-[calc(100vh-300px)] justify-center items-center`}
              >
                <LoadingOverlay />
              </div>
            ) : expenses.length === 0 ? (
              <h1>No Expenses</h1>
            ) : (
              <div
                className={`grid ${grid ? "grid-cols-4" : "grid-rows-4"} gap-4`}
              >
                {expenses.map((expense, index) => (
                  <ExpenseCard expense={expense} state={grid} key={index} />
                ))}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PanelContent;
