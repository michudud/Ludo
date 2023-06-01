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

  let fieldTemplate = "1fr / 1fr";
  let pawnSize = 26;
  if (pawnsOnField.length === 2) {
    fieldTemplate = "repeat(1, 1fr) / repeat(2, 1fr)";
  } else if (pawnsOnField.length === 3 || pawnsOnField.length === 4) {
    fieldTemplate = "repeat(2, 1fr) / repeat(2, 1fr)";
  } else if (pawnsOnField.length === 5 || pawnsOnField.length === 6) {
    fieldTemplate = "repeat(3, 1fr) / repeat(2, 1fr)";
    pawnSize = 20;
  } else if (pawnsOnField.length > 6) {
    fieldTemplate = "repeat(3, 1fr) / repeat(3, 1fr)";
    pawnSize = 20;
  }

  return (
    <div
      className="BoardField"
      style={{
        backgroundColor: fieldColor,
        gridTemplate: fieldTemplate,
      }}
      key={Math.random()}
    >
      {pawnsOnField.length > 0
        ? pawnsOnField.map((pawn) => {
            return (
              <div
                className="Pawn"
                style={{
                  backgroundColor: pawn.color2,
                  width: pawnSize + "px",
                  height: pawnSize + "px",
                  borderRadius: pawnSize / 2 + "px",
                  border: `3px solid ${pawn.color}`,
                }}
                key={Math.random()}
              >
                {pawn.nr}
              </div>
            );
          })
        : null}
    </div>
  );
};

export default BoardField;
