import { Paper } from "@material-ui/core";
import { useSensors } from "./domain/sensor";
import Sensor from "./SensorCard";

const Sensors = () => {
  const { sensors } = useSensors();
  return (
    <Paper placeholder="loading">
      {sensors.map((sensor) => (
        <Sensor key={sensor.deviceid} model={sensor} />
      ))}
    </Paper>
  );
};

export default Sensors;
