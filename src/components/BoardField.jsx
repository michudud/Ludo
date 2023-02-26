import React from "react";

const BoardField = ({ field, pawnsOnField }) => {
  let fieldColor;

  if ((typeof field === "string" && field.includes("r")) || field === 1) {
    fieldColor = "#EA4335";
  } else if (
    (typeof field === "string" && field.includes("g")) ||
    field === 11
  ) {
    fieldColor = "#34A853";
  } else if (
    (typeof field === "string" && field.includes("y")) ||
    field === 21
  ) {
    fieldColor = "#FBBC05";
  } else if (
    (typeof field === "string" && field.includes("b")) ||
    field === 31
  ) {
    fieldColor = "#4285F4";
  } else if (field === 0) {
    fieldColor = "#56342A";
  } else if (field === 100) {
    fieldColor = "lightgray";
  } else {
    fieldColor = "#B68E65";
  }

  return (
    <div
      className="BoardField"
      style={{ backgroundColor: fieldColor }}
      key={Math.random()}
    >
      {pawnsOnField.length > 0
        ? pawnsOnField.map((color) => {
            return (
              <div
                className="Pawn"
                style={{ backgroundColor: color }}
                key={Math.random()}
              ></div>
            );
          })
        : null}
    </div>
  );
};

export default BoardField;
