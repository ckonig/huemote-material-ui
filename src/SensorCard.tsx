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

const roomToFa = (room: string) => {
  switch (room) {
    case "Living room":
      return "fa-tv";
    case "Bathroom":
      return "fa-toilet-paper";
    case "Bedroom":
      return "fa-bed";
    case "Balcony":
      return "fa-tree";
    case "Plants":
      return "fa-seedling";
    case "Kitchen":
      return "fa-coffee";
    case "Entrance":
      return "fa-shoe-prints";
    case "Office":
      return "fa-laptop-house";
  }
  console.error("no icon for room:" + room);
};

const iconStyle = {
  width: "auto",
  margin: "auto",
  marginLeft: "10px",
  fontSize: "1em",
};

const FooterChip = (props: { icon: string; label: string }) => {
  return (
    <Chip
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

const Sensor = (props: { model: any }) => {
  //@todo use bridge-timezone from API to correct calculation?
  const diffToNow = React.useCallback(() => {
    const then = new Date(props.model.presence.state.lastupdated);
    const now_utc = toUtc(new Date(Date.now()));
    const diff = now_utc - toUtc(then);
    console.log(now_utc, toUtc(then));
    //@todo why utc doesn't work? remove - 60 minutes hack
    const roundedMinutes = Math.round(diff / 1000 / 60) - 60;
    if (roundedMinutes >= 60) {
      return "more than " + Math.round(roundedMinutes / 60) + " hours ago";
    }
    //@todo more than x days ago
    return roundedMinutes + " minutes ago";
  }, [props]);

  return (
    <Card variant="outlined">
      <CardHeader
        avatar={
          <Icon
            style={{ margin: "auto", width: "auto" }}
            className={"fa " + roomToFa(props.model.name.split(" ")[0])}
          />
        }
        title={props.model.name}
        action={<Battery level={props.model.presence.config.battery} />}
        subheader={diffToNow()}
      />

      <CardActions>
        <Box
          width="100%"
          display="flex"
          justifyContent="space-between"
          alignContent="center"
        >
          <Box>
            {props.model.light.state.daylight && (
              <FooterChip icon="sun" label="Daylight" />
            )}
            {!props.model.light.state.daylight && (
              <FooterChip icon="moon" label="No daylight" />
            )}
          </Box>
          <Box>
            <FooterChip
              icon="thermometer"
              label={`${(
                props.model.temperature.state.temperature / 100
              ).toFixed(2)}°C`}
            />
          </Box>
          <Box>
            {props.model.presence.state.presence && (
              <FooterChip icon="eye" label="Presence" />
            )}
            {!props.model.presence.state.presence && (
              <FooterChip icon="eye-slash" label="No presence" />
            )}
          </Box>
        </Box>
      </CardActions>
    </Card>
  );
};

export default Sensor;
