import Sensor from "./Sensor";
import { useHueContext } from "./HueContext";

const Sensors = () => {
  const {
    state: { sensors },
  } = useHueContext();
  return (
    <div>
      {Object.keys(sensors)
        .map((key) => sensors[key])
        .map((sensor, si) => (
          <Sensor key={si} model={sensor} />
        ))}
    </div>
  );
};

export default Sensors;
