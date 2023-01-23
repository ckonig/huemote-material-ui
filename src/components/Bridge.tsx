import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { Icon } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useHueContext } from "../HueContext";
import useConfig from "../queries/config";

const useCardStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  label: {
    float: "left",
    width: 150,
  },
});

const Bridge = () => {
  const {
    state: { appname },
    disconnect,
  } = useHueContext();
  const { config } = useConfig();
  const cardClasses = useCardStyles();
  return (
    <>
      <Card className={cardClasses.root} variant="outlined">
        <CardContent>
          <Typography
            className={cardClasses.title}
            color="textSecondary"
            gutterBottom
          >
            Connected with Hue Bridge
          </Typography>
          <Typography variant="h5" component="h2">
            {config.name}
          </Typography>
          <Typography className={cardClasses.pos} color="textSecondary">
            Model: {config.modelid}
          </Typography>
          <Typography variant="body2" component="div">
            <span className={cardClasses.label}>Mac Address</span>
            {config.mac}
            <br />
            <span className={cardClasses.label}>IP Address</span>
            {config.ipaddress}
            <br />
            <span className={cardClasses.label}>Zigbee Channel</span>
            {config.zigbeechannel}
            <br />
            <span className={cardClasses.label}>App Name</span>
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
