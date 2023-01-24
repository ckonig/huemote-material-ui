import { Icon, IconButton } from "@mui/material";
import useGroups from "../queries/useGroups";

const Header = () => {
  const { shutDown } = useGroups();
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
        size="large"
      >
        <Icon className={"fa fa-power-off"} />
      </IconButton>
    </div>
  );
};

export default Header;
