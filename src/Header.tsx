import { Icon, IconButton } from "@material-ui/core";

import { shutDown } from "./API";
import { useHueContext } from "./HueContext";

const Header = () => {
  const {
    state: { baseUrl },
    refresh,
  } = useHueContext();
  return (
    <div style={{ width: "100%", textAlign: "center" }}>
      <IconButton
        color="secondary"
        style={{
          outline: "none",
          border: "none",
          width: 50,
          height: 50,
          fontSize: "2em",
        }}
        onClick={() => baseUrl && shutDown(baseUrl).then(refresh)}
      >
        <Icon className={"fa fa-power-off"} />
      </IconButton>
    </div>
  );
};

export default Header;
