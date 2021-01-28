import React from "react";

const Thermometer = (props: { temp: string }) => {
  return (
    <div
      style={{
        fontSize: "2em",
        position: "absolute",
        bottom: 10,
        left: 0,
        right: 0,
        textAlign: "center",
      }}
      className="thermometer"
    >
      {props.temp}°C
    </div>
  );
};

export default Thermometer;
