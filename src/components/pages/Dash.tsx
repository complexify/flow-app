import { User } from "@/interfaces/interfaces";
import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useEffect } from "react";
import LoadingOverlay from "../loader";
import { getUserId } from "@/lib/auth";
import { Expense } from "@/interfaces/interfaces";
import { invoke } from "@tauri-apps/api";
import { DatePickerWithRange } from "../datepicker";
// import { DateRange } from "react-day-picker";
import SortedChart from "../chart";
import BChart from "../bar";
type props = {
  user: User;
};

interface ProcessedExpense {
  id: string;
  name: string;
  amount: number;
  description?: string;
}

interface ExpenseDictionary {
  [e_type: string]: {
    [date: string]: {
      totalAmount: number;
      expenses: ProcessedExpense[];
    };
  };
}

const DashContent: React.FC<props> = ({ user }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [expenseDictionary, setExpenseDictionary] = useState<ExpenseDictionary>(
    {}
  );
  const token = getUserId();


  const processExpenses = (expenses: Expense[]): ExpenseDictionary => {
    const expenseDictionary: ExpenseDictionary = {};

    expenses.forEach((expense) => {
      const { id, name, e_type, amount, description, created_at } = expense;

      const dateStr = new Date(created_at).toISOString().split("T")[0];

      if (!expenseDictionary[e_type]) {
        expenseDictionary[e_type] = {};
      }

      if (!expenseDictionary[e_type][dateStr]) {
        expenseDictionary[e_type][dateStr] = {
          totalAmount: 0,
          expenses: [],
        };
      }

      expenseDictionary[e_type][dateStr].totalAmount += amount;
      expenseDictionary[e_type][dateStr].expenses.push({
        id,
        name,
        amount,
        description,
      });
    });

    return expenseDictionary;
  };

  useEffect(() => {
    let isMounted = true;

    const getExpenses = async () => {
      try {
        const expenses: Expense[] = await invoke("get_user_expenses", {
          url: "https://next-js-auth-complexify.vercel.app/api/users/getExpenses",
          token,
        });

        const expenseDictionary = processExpenses(expenses);

        if (isMounted) {
         
          setExpenseDictionary(expenseDictionary);
          console.log(expenseDictionary);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching expenses:", error);

        if (isMounted) {
          setLoading(false);
        }
      }
    };

    if (user) {
      getExpenses();
    }

    return () => {
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
        <>
          <div className="mb-4 w-full bg-background sticky top-0 flex justify-between items-center p-2">
            <h3 className="text-lg font-medium bg-background">Expenses</h3>
            <div className="flex justify-between"></div>
          </div>
          <div className="space-y-4 rounded-md w-full">
            {loading ? (
              <div
                className={`flex flex-col min-h-[calc(100vh-300px)] justify-center items-center`}
              >
                <LoadingOverlay />
              </div>
            ) : !expenseDictionary ? (
              <h1>No Expenses</h1>
            ) : (
              <div>
                <DatePickerWithRange
                  onDateSelect={()=>{}}
                  expenseDictionary={expenseDictionary}
                />
                <div className="grid grid-cols-2 gap-4">
                  <SortedChart data={expenseDictionary} key={122}/>
                  <BChart data={expenseDictionary} key={12}/>
                </div>
              </div>
            )}
          </div>
        </>
      </motion.div>
    </AnimatePresence>
  );
};

export default DashContent;
