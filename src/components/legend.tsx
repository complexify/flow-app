import React from "react";

interface CustomLegendProps {
  payload?: any[]; // Replace with the actual payload type
}

const CustomLegend: React.FC<CustomLegendProps> = ({ payload }) => {
  if (payload && payload.length) {
    return (
      <div className="custom-legend mb-4">
        {payload.map((type, index) => (
          <div className="legend-entry mx-2" key={`item-${index}`}>
            <div
              className={`dot`}
              style={{ backgroundColor: type.color, color: type.stroke }}
            />
            <span className="legend-text">{type.value}</span>
          </div>
        ))}
      </div>
    );
  }
};
export default CustomLegend;
