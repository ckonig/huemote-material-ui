import { Paper } from "@material-ui/core";
import Sensor from "./SensorCard";
import { useHueContext } from "./HueContext";

const Switches = () => {
  const {
    state: { switches },
  } = useHueContext();
  return (
    <Paper placeholder="loading">
      {Object.keys(switches)
        .map((key) => switches[key])
        .map((sensor, si) => (
          <Sensor key={si} model={sensor} />
        ))}
    </Paper>
  );
};

export default Switches;
