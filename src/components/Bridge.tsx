import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { Box, Icon } from "@mui/material";
import Typography from "@mui/material/Typography";
import useConfig from "../queries/useConfig";
import useConnection from "../queries/useConnection";

const Label = ({ children }: { children: React.ReactNode }) => {
  const style = {
    float: "left",
    width: 150,
  };
  return (
    <Box component="span" sx={style}>
      {children}
    </Box>
  );
};

const Bridge = () => {
  const { appname, disconnect } = useConnection();
  const { data: config, isFetched } = useConfig();
  if (!config || !isFetched) return null;
  return (
    <>
      <Card sx={{ minWidth: 275 }} variant="outlined">
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="textSecondary" gutterBottom>
            Connected with Hue Bridge
          </Typography>
          <Typography variant="h5" component="h2">
            {config.name}
          </Typography>
          <Typography sx={{ marginBottom: 12 }} color="textSecondary">
            Model: {config.modelid}
          </Typography>
          <Typography variant="body2" component="div">
            <Label>Mac Address</Label>
            {config.mac}
            <br />
            <Label>IP Address</Label>
            {config.ipaddress}
            <br />
            <Label>Zigbee Channel</Label>
            {config.zigbeechannel}
            <br />
            <Label>App Name</Label>
            {appname || ""}
            <br />
          </Typography>
        </CardContent>
        <CardActions style={{ alignItems: "right" }}>
          <Button
            style={{ float: "right" }}
            size="small"
            endIcon={<Icon className="fa fa-trash" />}
            variant="contained"
            color="secondary"
            onClick={() => {
              if (window.confirm("disconnect from bridge and delete data?")) {
                disconnect();
              }
            }}
          >
            Disconnect
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default Bridge;
