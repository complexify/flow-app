import React from "react";
import { Expense } from "@/interfaces/interfaces";
type props = {
  expense: Expense;
  state: boolean
};

const ExpenseCard: React.FC<props> = ({expense, state}) => {
  return (
    <div
      className={`rounded-lg border-l-4 border-blue-500 ${
        state ? "h-32" : "h-12"
      } bg-slate-50 dark:bg-slate-900/40 shadow-md ${
        state ? "hover:scale-[1.09]" : "hover:scale-[1.01]"
      } duration-150`}
    >
        <h1 className="p-3">
            {expense.name}
        </h1>
    </div>
  );
};
export default ExpenseCard;