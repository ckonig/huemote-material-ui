import "./battery.scss";

import React from "react";

const Battery = (props: { level: number }) => {
  return (
    <div style={{ margin: "auto" }}>
      <div className="battery">
        <div
          className="battery-level"
          style={{ height: props.level + "%" }}
        ></div>
      </div>
    </div>
  );
};
export default Battery;
