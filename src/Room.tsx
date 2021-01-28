import { GroupsResponseObj, RawLightsResponse } from "./Common";

import React from "react";
import Toggle from "react-toggle";
import { baseUrl } from "./API";

const Room = (props: {
  id: string;
  model: GroupsResponseObj;
  lights: RawLightsResponse;
  scenes: any;
  refresh: () => void;
}) => {
  const [expanded, setExpanded] = React.useState(false);
  const toggle = React.useCallback(() => {
    const payload = { on: !props.model.state.any_on };

    fetch(`${baseUrl}/groups/${props.id}/action`, {
      method: "put",
      body: JSON.stringify(payload),
    }).then(() => props.refresh());
  }, [props]);

  const toggleSceneApi = (scene: any) => {
    const payload = { scene: scene.key };

    fetch(`${baseUrl}/groups/${props.id}/action`, {
      method: "put",
      body: JSON.stringify(payload),
    }).then(() => props.refresh());
  };

  if (props.model.type !== "Room") {
    return null;
  }

  const hueToFa = (hue: string) => {
    switch (hue) {
      case "Living room":
        return "fa-tv";
      case "Bathroom":
        return "fa-toilet-paper";
      case "Bedroom":
        return "fa-bed";
      case "Balcony":
        return "fa-tree";
      case "Garden":
        return "fa-seedling";
      case "Kitchen":
        return "fa-coffee";
      case "Front door":
        return "fa-shoe-prints";
      case "Reading":
        return "fa-laptop-house";
    }
    console.error("no icon for class:" + hue);
  };

  const getScenes = () => {
    return Object.keys(props.scenes)
      .map((key) => ({
        key,
        ...props.scenes[key],
      }))
      .filter(
        (scene) =>
          scene.group &&
          scene.group === props.id &&
          scene.type === "GroupScene" &&
          !scene.recycle 
      );
  };

  const toggleScene = (scene: any) => {
    console.log("will toggle", scene);
    toggleSceneApi(scene);
  };

  return (
    <div
      style={{
        borderRadius: "0.25em",
        float: "left",
        width: "98%",
        margin: 2,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "gray",
        position: "relative",
        boxShadow: "none",
      }}
    >
      <button
        style={{
          textAlign: "left",
          border: "none",
          width: "80%",
          fontSize: "1.5em",
        }}
        onClick={(e: any) =>
          (!e.target.className ||
            e.target.className.substring(0, 12) !== "react-toggle") &&
          setExpanded(!expanded)
        }
      >
        <div style={{ paddingLeft: 5, paddingTop: 4.5, paddingBottom: 4.5 }}>
          <i
            style={{ width: 30, textAlign: "center" }}
            className={`fa ${hueToFa(props.model.class)}`}
          ></i>
          <span style={{ marginLeft: 10 }}>{props.model.name}</span>
        </div>
      </button>

      <div style={{ paddingTop: 8, paddingRight: 4, float: "right" }}>
        <Toggle
          icons={false}
          checked={props.model.state.any_on}
          onChange={() => toggle()}
        />
      </div>
      {expanded &&
        getScenes().map((scene, si) => (
          <button
            style={{
              textAlign: "left",
              paddingLeft: 55,
              width: "100%",
              fontSize: "1.25em",
              paddingTop: 5,
              paddingBottom: 5,
              borderWidth: "1px 0px 1px 0px",
            }}
            key={si}
            onClick={() => toggleScene(scene)}
          >
            {scene.name}
          </button>
        ))}
    </div>
  );
};

export default Room;
