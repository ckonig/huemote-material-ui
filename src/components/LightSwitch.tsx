import Switch from "@material-ui/core/Switch";
import { Light } from "../domain/room";
import useLights from "../queries/lights";

export const LightSwitch = ({ light }: { light: Light }) => {
  const { toggle } = useLights();
  return (
    <Switch
      size="small"
      checked={!!light.state.on}
      onChange={() => toggle(light)}
    />
  );
};
