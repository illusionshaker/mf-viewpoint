import React from "react";

export default ({widgetName}) => (
  <div
    style={{
      padding: "1em",
      margin: "1em",
      background: "green",
      color: "white",
      fontWeight: "bold",
    }}
  >
    {widgetName}
  </div>
);
