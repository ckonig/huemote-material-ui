import { Slider } from "@material-ui/core";
import { Light } from "../domain/room";
import useLights from "../queries/lights";

export const BrightnessSlider = ({ light }: { light: Light }) => {
  const { setBrightness } = useLights();
  return light.state.bri ? (
    <Slider
      disabled={!light.state.on}
      min={1}
      max={254}
      value={light.state.bri}
      onChangeCommitted={(e, val) => setBrightness(light.id, val as any)}
      aria-labelledby="continuous-slider"
    />
  ) : null;
};
