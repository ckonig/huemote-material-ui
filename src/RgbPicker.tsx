import React from "react";
import { Slider } from "@material-ui/core";
import { useHueContext } from "./HueContext";
import xyBriToRgb from "./xyBriToRgb";

const converter = require("@q42philips/hue-color-converter");

const RgbPicker = (props: { light: any, show?: boolean }) => {
  //@todo this doesn't update when the lamp is refreshed from api (e.g. when activating a scene)
  const inRgb = React.useMemo(
    () =>
      xyBriToRgb(
        props.light.state.xy[0],
        props.light.state.xy[1],
        props.light.state.bri
      ),
    [props]
  );

  const [r, setR] = React.useState(inRgb.r);
  const [g, setG] = React.useState(inRgb.g);
  const [b, setB] = React.useState(inRgb.b);
  
  const {
    state: { baseUrl },
    refresh,
  } = useHueContext();

  const xy = React.useMemo(
    () => converter.calculateXY(r, g, b, props.light.modelid),
    [r, g, b, props]
  );

  const setLightRgb = React.useCallback(() => {
    fetch(`${baseUrl}/lights/${props.light.key}/state`, {
      method: "put",
      body: JSON.stringify({ xy: xy }),
    }).then(() => refresh());
  }, [props, baseUrl, refresh, xy]);

if (!props.show) return null;
  return (
    <>
      R{" "}
      <Slider
        value={r}
        onChangeCommitted={(e, v: any) => {
          setR(v); //@todo this doesn't always work, pass data to api directly (instead from state)
          setLightRgb();
        }}
      />
      G{" "}
      <Slider
        value={g}
        onChangeCommitted={(e, v: any) => {
          setG(v);
          setLightRgb();
        }}
      />
      B{" "}
      <Slider
        value={b}
        onChangeCommitted={(e, v: any) => {
          setB(v);
          setLightRgb();
        }}
      />
    </>
  );
};

export default RgbPicker;
