import { useState } from "react";
import { addDays, format, startOfDay } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type SelectRangeEventHandler = (range: DateRange | undefined) => void;

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

export function DatePickerWithRange({
  className,
  onDateSelect,
  expenseDictionary,
}: {
  className?: string;
  onDateSelect: SelectRangeEventHandler;
  expenseDictionary: ExpenseDictionary; // Pass your ExpenseDictionary here
}) {
  const [date, setDate] = useState<DateRange | undefined>({
    from: startOfDay(new Date()),
    to: addDays(startOfDay(new Date()), 20),
  });

  const handleDateSelect: SelectRangeEventHandler = (selectedDate) => {
    setDate(selectedDate);
    onDateSelect(selectedDate);
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleDateSelect}
            expenseDictionary={expenseDictionary}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
