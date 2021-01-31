import { Paper } from "@material-ui/core";
import Sensor from "./SensorCard";
import { useHueContext } from "./HueContext";

const Sensors = () => {
  const {
    state: { sensors },
  } = useHueContext();
  return (
    <Paper placeholder="loading">
      {Object.keys(sensors)
        .map((key) => sensors[key])
        .map((sensor, si) => (
          <Sensor key={si} model={sensor} />
        ))}
    </Paper>
  );
};

export default Sensors;
