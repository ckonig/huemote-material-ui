import { Slider } from "@material-ui/core";
import { Light } from "../domain/models";
import useLights from "../queries/useLights";

export const BrightnessSlider = ({ light }: { light: Light }) => {
  const { setBrightness } = useLights();
  return light.state.bri ? (
    <Slider
      disabled={!light.state.on}
      min={1}
      max={254}
      value={light.state.bri}
      onChangeCommitted={(e, val) => setBrightness(light.id, val as number)}
      aria-labelledby="continuous-slider"
    />
  ) : null;
};
