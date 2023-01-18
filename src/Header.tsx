import { Icon, IconButton } from "@material-ui/core";
import useLights from "./queries/lights";

const Header = () => {
  const { shutDown } = useLights();
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
        onClick={() => shutDown()}
      >
        <Icon className={"fa fa-power-off"} />
      </IconButton>
    </div>
  );
};

export default Header;
