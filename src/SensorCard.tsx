import {
  Box,
  Card,
  CardActions,
  CardHeader,
  Chip,
  Icon,
} from "@material-ui/core";

import Battery from "./Battery";
import React from "react";
import { Sensor as AbstractSensor } from "./domain/sensor";

//@todo move to json
const roomToFa = (room: string) => {
  switch (room) {
    case "Living":
    case "Living room":
      return "fa-tv";
    case "Bathroom":
    case "Bath":
      return "fa-toilet-paper";
    case "Bed":
    case "Bedroom":
      return "fa-bed";
    case "Balcony":
      return "fa-tree";
    case "Plants":
    case "Greenhouse":
      return "fa-seedling";
    case "Kitchen":
      return "fa-coffee";
    case "Entrance":
    case "entrance":
      return "fa-shoe-prints";
    case "Office":
    case "Bib":
      return "fa-laptop-house";
  }
  console.error("no icon for room:" + room);
};

const iconStyle = {
  width: "auto",
  height: "auto",
  margin: "auto",
  fontSize: "0.8em",
  paddingLeft: "10px",
};

const FooterChip = (props: {
  icon: string;
  label: number | string;
  opacity?: number;
}) => {
  return (
    <Chip
      style={{ backgroundColor: `rgba(144,202,253,${props.opacity})` }}
      variant="outlined"
      size="small"
      icon={<Icon style={iconStyle} className={`fa fa-${props.icon}`} />}
      label={props.label}
    />
  );
};

const toUtc = (date: any) => {
  var now_utc = Date.UTC(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds()
  );

  return now_utc;
};

const Sensor = ({ model }: { model: AbstractSensor }) => {
  //@todo use bridge-timezone from API to correct calculation?
  const diffToNow = React.useCallback(() => {
    if (!model) return null;
    const then = new Date(model.presence.state?.lastupdated);

    const now_utc = toUtc(new Date(Date.now()));
    const diff = now_utc - toUtc(then);
    //@todo why utc doesn't work? remove - 60 minutes hack
    const roundedMinutes = Math.floor(diff / 1000 / 60) - 60;

    if (roundedMinutes >= 60) {
      const hours = Math.floor(roundedMinutes / 60);
      if (hours > 24) {
        const days = Math.floor(hours / 24);
        return days + " days ago";
      }
      return hours + " hours ago";
    }
    if (roundedMinutes === 0) {
      return "now";
    }
    if (roundedMinutes === 1) {
      return "1 minute ago";
    }
    return roundedMinutes + " minutes ago";
  }, [model]);

  const buttonEventToStr = (buttonevent: number) => {
    if (buttonevent === 1002) return "on";
    if (buttonevent === 2002) return "dim +";
    if (buttonevent === 3002) return "dim -";
    if (buttonevent === 4002) return "off";
    //@todo map tap switch button events
    return "";
  };

  return (
    <Card variant="outlined">
      <CardHeader
        avatar={
          <Icon
            style={{ margin: "auto", width: "auto" }}
            className={"fa " + roomToFa(model.name.split(" ")[0])}
          />
        }
        title={model.name}
        action={
          model.presence.config?.battery ? (
            <Battery level={model.presence.config.battery} />
          ) : null
        }
        subheader={diffToNow()}
      />

      <CardActions>
        <Box
          width="100%"
          display="flex"
          justifyContent="space-between"
          alignContent="center"
        >
          {model.lightLevel.state?.lightlevel && (
            <Box>
              <FooterChip
                icon={model.lightLevel.state.dark ? "moon" : "sun"}
                label={model.lightLevel.state?.lightlevel}
                opacity={model.lightLevel.state?.lightlevel / 33000}
              />
            </Box>
          )}
          {model.temperature?.state?.temperature && (
            <Box>
              <FooterChip
                icon="thermometer"
                label={`${(model.temperature.state.temperature / 100).toFixed(
                  2
                )}°C`}
              />
            </Box>
          )}
          {model.presence?.state && (
            <Box>
              {model.presence?.state?.presence && (
                <FooterChip icon="eye" label="Presence" />
              )}
              {!model.presence?.state?.presence && (
                <FooterChip icon="eye-slash" label="No presence" />
              )}
            </Box>
          )}
        </Box>
      </CardActions>
    </Card>
  );
};

export default Sensor;
