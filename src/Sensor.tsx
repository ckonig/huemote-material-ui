import Battery from "./Battery";
import React from "react";
import Thermometer from "./Thermometer";

const roomToFa = (room: string) => {
  switch (room) {
    case "Living room":
      return "fa-tv";
    case "Bathroom":
      return "fa-toilet-paper";
    case "Bedroom":
      return "fa-bed";
    case "Balcony":
      return "fa-tree";
    case "Plants":
      return "fa-seedling";
    case "Kitchen":
      return "fa-coffee";
    case "Entrance":
      return "fa-shoe-prints";
    case "Office":
      return "fa-laptop-house";
  }
  console.error("no icon for room:" + room);
};

//@todo show daylight status with fa-sun / fa-moon
//@todo show presence status with fa-eye / fa-eye-slash

const Sensor = (props: { model: any }) => (
  <div
    style={{
      fontSize: "1em",
      borderRadius: "0.25em",
      position: "relative",
      borderStyle: "solid",
      borderColor: "gray",
      borderWidth: 2,
      margin: 2,
      float: "left",
      width: "98%",
      height: 80,
    }}
  >
    <div
      style={{
        fontSize: "2em",
        position: "absolute",
        left: 10,
        top: 18,
      }}
    >
      <i className={"fa " + roomToFa(props.model.name.split(" ")[0])}></i>
    </div>
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        textAlign: "center",
        top: 10,
      }}
    >
      {props.model.name.split(" ")[0]}
    </div>

    <Battery level={props.model.presence.config.battery} />
    <Thermometer
      temp={`${(
        props.model.temperature.state.temperature / 100
      ).toFixed(2)}`}
    />
  </div>
);

export default Sensor;
