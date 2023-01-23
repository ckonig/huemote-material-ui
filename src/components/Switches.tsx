import { Paper } from "@material-ui/core";
import Switch from "./Switch";
import { useSwitches } from "../domain/useSwitches";

const Switches = () => {
  const { switches } = useSwitches();
  return (
    <Paper placeholder="loading">
      {switches.map((sw) => (
        <Switch key={sw.deviceid} model={sw} />
      ))}
    </Paper>
  );
};

export default Switches;
