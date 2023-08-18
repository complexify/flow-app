import React from "react";
import {
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  AreaChart,
  Area,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";
import CustomLegend from "./legend";
import CustomTooltip from "./tooltip";
import { format, parseISO } from "date-fns";
import { useTheme } from "next-themes";

interface ProcessedExpense {
  id: string;
  name: string;
  amount: number;
  description?: string;
}

interface ExpenseData {
  totalAmount: number;
  expenses: ProcessedExpense[];
}

interface ExpenseDictionary {
  [e_type: string]: {
    [date: string]: ExpenseData;
  };
}

interface SortedChartProps {
  data: ExpenseDictionary;
}

const SortedChart: React.FC<SortedChartProps> = ({ data }) => {
  const { resolvedTheme } = useTheme();
  
  const isDarkMode = resolvedTheme === "dark";

  const textColor = isDarkMode ? "white" : "black";
  const lineColor = isDarkMode ? "white" : "black";

  // Collect all unique dates from the data
  const allDates = Object.values(data).flatMap((expenseType) =>
    Object.keys(expenseType)
  );

  // Remove duplicates and sort dates in ascending order
  const sortedDates = [...new Set(allDates)].sort();

  // Calculate the total amount for each expense type on each date
  const chartData = sortedDates.map((date) => ({
    date,
    ...Object.keys(data).reduce((acc, type) => {
      const typeData = data[type][date];
      if (typeData) {
        acc[type] = typeData.totalAmount;
      } else {
        acc[type] = 0;
      }
      return acc;
    }, {} as Record<string, number>),
  }));

  const colors = ["#eab308", "#2563eb", "#e11d48", "#7c3aed"]; // Customize colors as needed
  
  return (
    <div className="w-full my-2 p-2 rounded-lg bg-slate-50 dark:bg-slate-900/40">
      <ResponsiveContainer className="h-full w-full">
        <AreaChart data={chartData}>
          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            tick={{
              fill: textColor,
              fontSize: 12,
              transform: "translate(0, 6)",
            }}
            tickFormatter={(str) => {
              const date = parseISO(str);
              return format(date, "MMM d");
            }}
            padding={{ left: 10, right: 10 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tickCount={4}
            tick={{
              fill: textColor,
              fontSize: 12,
              transform: "translate(-7, 0)",
            }}
            tickFormatter={(number) => `$${number}`}
          />
          <CartesianGrid
            opacity={0.3}
            vertical={false}
            strokeDasharray="3 3"
            className="stroke-black dark:stroke-white"
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: lineColor, opacity: isDarkMode ? ".40" : "1" }}
          />
          <Legend
            verticalAlign="top"
            content={<CustomLegend />}
            
          />
          <defs>
            {colors.map((color, index) => (
              <linearGradient
                key={index}
                id={`color${index}`}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="0%" stopColor={color} stopOpacity={0.6} />
                <stop offset="75%" stopColor={color} stopOpacity={0.1} />
              </linearGradient>
            ))}
          </defs>

          {Object.keys(data).map((type, index) => (
            <Area
              dataKey={type}
              key={type}
              name={type}
              type="monotone"
              stackId={index}
              stroke={colors[index % colors.length]}
              fill={`url(#color${index})`}
              strokeWidth={2}
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SortedChart;
