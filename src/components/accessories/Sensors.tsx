import { Paper } from "@mui/material";
import { useSensors } from "../../domain/useSensors";
import Sensor from "./Sensor";

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
