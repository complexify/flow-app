import React from "react";
import { Expense } from "@/interfaces/interfaces";
import { Button } from "./ui/button";
import { MoreHorizontal } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type props = {
  expense: Expense;
  state: boolean;
};

const ExpenseCard: React.FC<props> = ({ expense, state }) => {
   const typeColor: { [key: string]: string } = {
     general: "#eab308",
     special: "#e11d48",
     digital: "#2563eb",
     custom: "#7c3aed",
   };
  return (
    <div
      style={{ borderColor: `${typeColor[expense.e_type]}` }}
      className={`rounded-lg border-l-4 ${
        state ? "h-32" : "h-12"
      } bg-slate-50 dark:bg-slate-900/40 shadow-md ${
        state ? "hover:scale-[1.09]" : "hover:scale-[1.01]"
      } duration-150`}
    >
      <div
        className={`flex ${
          state ? "flex-col p-3 " : "flex-row items-center p-2"
        }`}
      >
        {state ? (
          <div className={`${state ? "flex justify-between" : ""}`}>
            <div>
              <h1 className={`text-lg ${state ? "" : ""}`}>{expense.name}</h1>
              <h1 className={`text-2xl  ${state ? "font-semibold" : ""}`}>
                {expense.amount}
              </h1>
              <p className={`text-sm ${state ? "" : ""}`}>
                {expense?.description}
              </p>
            </div>

            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div className={`flex flex-row w-full justify-between items-center`}>
            <div className="w-24">
              <h1 className={`text-lg ${state ? "" : ""}`}>{expense.name}</h1>
            </div>
            <div className="w-24">
              <h1 className={`text-2xl ${state ? "font-semibold" : ""}`}>
                {expense.amount}
              </h1>
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="w-32">
                    <p className={`text-sm truncate ...${state ? "" : ""}`}>
                      {expense.description}
                    </p>
                  </div>
                </TooltipTrigger>
                <TooltipContent>{expense.description}</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
export default ExpenseCard;
