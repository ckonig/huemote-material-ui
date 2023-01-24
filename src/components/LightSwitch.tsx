import Switch from "@mui/material/Switch";
import { Light } from "../domain/models";
import useLights from "../queries/useLights";

export const LightSwitch = ({ light }: { light: Light }) => {
  const { toggle } = useLights();
  return (
    <Switch
      size="small"
      checked={!!light.state?.on}
      onChange={() => toggle(light)}
    />
  );
};
