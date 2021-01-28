import "./battery.scss";

import React from "react";

const Battery = (props: { level: number }) => {
  return (
    <div
      className="battery"
      style={{
        position: "absolute",
        right: 10,
        top: 8,
      }}
    >
      <div
        className="battery-level"
        style={{ height: props.level + "%" }}
      ></div>
    </div>
  );
};
export default Battery;
