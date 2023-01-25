import { Box, Card, CardActions, CardHeader, Icon } from "@mui/material";

import Battery from "./Battery";
import FooterChip from "./FooterChip";
import { Sensor as AbstractSensor } from "../../domain/models";
import roomToFa from "../../helpers/roomToFa";
import useDiffToNow from "../../helpers/useDiffToNow";

const Sensor = ({ model }: { model: AbstractSensor }) => {
  const diffToNow = useDiffToNow(model.presence.state?.lastupdated);
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
        subheader={diffToNow}
      />

      <CardActions>
        <Box
          width="100%"
          display="flex"
          justifyContent="space-between"
          alignContent="center"
        >
          <Box>
            <FooterChip
              icon={model.lightLevel.state.dark ? "moon" : "sun"}
              label={model.lightLevel.state?.lightlevel}
              opacity={model.lightLevel.state?.lightlevel / 33000}
            />
          </Box>

          <Box>
            <FooterChip
              icon="thermometer"
              label={`${(model.temperature.state.temperature / 100).toFixed(
                2
              )}°C`}
            />
          </Box>

          <Box>
            {model.presence?.state?.presence && (
              <FooterChip icon="eye" label="Presence" />
            )}
            {!model.presence?.state?.presence && (
              <FooterChip icon="eye-slash" label="No presence" />
            )}
          </Box>
        </Box>
      </CardActions>
    </Card>
  );
};

export default Sensor;
