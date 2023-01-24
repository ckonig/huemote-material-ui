import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { Icon } from "@mui/material";
import Typography from "@mui/material/Typography";
import makeStyles from '@mui/styles/makeStyles';
import useConfig from "../queries/useConfig";
import useConnection from "../queries/useConnection";

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
  const { appname, disconnect } = useConnection();
  const { data: config, isFetched } = useConfig();
  const cardClasses = useCardStyles();
  if (!config || !isFetched) return null;
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
