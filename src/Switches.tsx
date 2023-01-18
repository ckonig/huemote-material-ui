import { Paper } from "@material-ui/core";
import Sensor from "./SensorCard";
import useAccessories from "./queries/accessories";

const Switches = () => {
  const { switches } = useAccessories();
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
