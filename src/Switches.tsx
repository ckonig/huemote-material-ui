import { Paper } from "@material-ui/core";
import useAccessories from "./queries/accessories";
import Switch from "./components/SwitchCard";

const Switches = () => {
  const { switches } = useAccessories();
  return (
    <Paper placeholder="loading">
      {Object.keys(switches)
        .map((key) => switches[key])
        .map((sensor, si) => (
          <Switch key={si} model={sensor} />
        ))}
    </Paper>
  );
};

export default Switches;
