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
import { Sensor as AbstractSensor } from "./clip/v1/sensors";

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

const Sensor = (props: {
  //@todo use Device class
  model: {
    model: AbstractSensor;
    light: AbstractSensor;
    temperature: AbstractSensor;
    presence: AbstractSensor;
    switch: AbstractSensor;
  };
}) => {
  //@todo use bridge-timezone from API to correct calculation?
  const diffToNow = React.useCallback(() => {
    if (!props.model.model) return null;
    const then = new Date(props.model?.model?.state?.lastupdated);

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
  }, [props]);

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
            className={"fa " + roomToFa(props.model?.model?.name.split(" ")[0])}
          />
        }
        title={props.model.model.name}
        action={
          props.model?.model?.config?.battery ? (
            <Battery level={props.model.model.config.battery} />
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
          {props.model.light?.state?.lightlevel && (
            <Box>
              <FooterChip
                icon={props.model.light?.state.dark ? "moon" : "sun"}
                label={props.model.light?.state?.lightlevel}
                opacity={props.model.light?.state?.lightlevel / 33000}
              />
            </Box>
          )}
          {props.model.temperature?.state?.temperature && (
            <Box>
              <FooterChip
                icon="thermometer"
                label={`${(
                  props.model.temperature.state.temperature / 100
                ).toFixed(2)}°C`}
              />
            </Box>
          )}
          {props.model.presence?.state && (
            <Box>
              {props.model.presence?.state?.presence && (
                <FooterChip icon="eye" label="Presence" />
              )}
              {!props.model.presence?.state?.presence && (
                <FooterChip icon="eye-slash" label="No presence" />
              )}
            </Box>
          )}

          {props.model.switch?.state?.buttonevent && (
            <Box>
              {props.model.switch?.state?.buttonevent && (
                <FooterChip
                  icon="hand-point-down"
                  label={
                    "last button pressed: " +
                    buttonEventToStr(props.model.switch?.state?.buttonevent)
                  }
                />
              )}
            </Box>
          )}
        </Box>
      </CardActions>
    </Card>
  );
};

export default Sensor;
