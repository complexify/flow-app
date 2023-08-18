// CustomTooltip.tsx
import React from "react";
import { format, parseISO } from "date-fns";
interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    console.log(payload)
    return (
      <div className="p-2 rounded-md border bg-popover">
        {/* Render your tooltip content here */}
        <h4>{format(parseISO(label!), "eeee, d MMM, yyyy")}</h4>
        {payload.map((type, index) => (
          <div className="flex justify-between">
            <p key={`title ${index}`} style={{ color: type.stroke }}>
              {type.name}
            </p>
            <p key={`amount ${index}`}>{type.value}</p>
          </div>
        ))}
      </div>
    );
  }
  return null;

};

export default CustomTooltip;