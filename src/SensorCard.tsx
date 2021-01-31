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
    case "Living":
    case "Living room":
      return "fa-tv";
    case "Bathroom":
    case "Bath":
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
    if (!props.model.model) return null;
    const then = new Date(props.model?.model?.state?.lastupdated);
    const now_utc = toUtc(new Date(Date.now()));
    const diff = now_utc - toUtc(then);

    const roundedMinutes = Math.floor(diff / 1000 / 60) - 60;

    //@todo why utc doesn't work? remove - 60 minutes hack
    if (roundedMinutes >= 60) {
      const hours = Math.floor(roundedMinutes / 60);
      if (hours > 24) {
        const days = Math.floor(hours / 24);
        return days + " days ago";
      }
      return hours + " hours ago";
    }
    //@todo more than x days ago
    if (roundedMinutes === 0) {
      return "now";
    }
    if (roundedMinutes === 1) {
      return "1 minute ago";
    }
    return roundedMinutes + " minutes ago";
  }, [props]);

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
          props.model?.model?.config ? (
            <Battery level={props.model.model.config.battery} />
          ) : null
        }
        subheader={diffToNow()}
      />

      {props.model.light || props.model.temperature || props.model.presence ? (
        <CardActions>
          <Box
            width="100%"
            display="flex"
            justifyContent="space-between"
            alignContent="center"
          >
            {props.model.light && (
              <Box>
                {props.model.light?.state?.daylight && (
                  <FooterChip icon="sun" label="Daylight" />
                )}
                {!props.model.light?.state?.daylight && (
                  <FooterChip icon="moon" label="No daylight" />
                )}
              </Box>
            )}
            {props.model.temperature && (
              <Box>
                <FooterChip
                  icon="thermometer"
                  label={
                    props.model.temperature &&
                    `${(
                      props.model.temperature.state.temperature / 100
                    ).toFixed(2)}°C`
                  }
                />
              </Box>
            )}
            {props.model.presence && (
              <Box>
                {props.model.presence?.state?.presence && (
                  <FooterChip icon="eye" label="Presence" />
                )}
                {!props.model.presence?.state?.presence && (
                  <FooterChip icon="eye-slash" label="No presence" />
                )}
              </Box>
            )}
          </Box>
        </CardActions>
      ) : null}
    </Card>
  );
};

export default Sensor;
