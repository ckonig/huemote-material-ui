import { Paper } from "@material-ui/core";
import Sensor from "./SensorCard";
import useAccessories from "./queries/accessories";

const Sensors = () => {
  const { sensors } = useAccessories();
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
