import React from "react";
import violenceTypes from "@/utils/violence-types";

const ViolenceTypeColors = ({ type }: { type: number[] }) => {
  return (
    <div style={{ display: "flex", gap: "0.5rem" }}>
      {type.map((item, index) => (
        <div
          key={index}
          style={{
            backgroundColor: `${violenceTypes[item].background}aa`,
            padding: "4px 5px",
            borderRadius: "9px",
            maxWidth: "4rem",
          }}
        >
          <span
            style={{
              color: violenceTypes[item].color,
              fontSize: "0.8rem",
              fontWeight: "bold",
            }}
          >
            {violenceTypes[item].label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default ViolenceTypeColors;
