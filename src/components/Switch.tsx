import { Box, Card, CardActions, CardHeader, Icon } from "@mui/material";

import Battery from "./Battery";
import buttonEventToStr from "../helpers/buttonEventToStr";
import { Switch as SwitchModel } from "../domain/models";
import roomToFa from "../helpers/roomToFa";
import useDiffToNow from "../helpers/useDiffToNow";
import FooterChip from "./FooterChip";

const Switch = ({ model }: { model: SwitchModel }) => {
  const diffToNow = useDiffToNow(model?.switch?.state?.lastupdated);

  return (
    <Card variant="outlined">
      <CardHeader
        avatar={
          <Icon
            style={{ margin: "auto", width: "auto" }}
            className={"fa " + roomToFa(model?.switch?.name.split(" ")[0])}
          />
        }
        title={model?.switch?.name}
        action={
          model?.switch?.config?.battery ? (
            <Battery level={model?.switch?.config.battery} />
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
          {model?.switch?.state?.buttonevent && (
            <Box>
              {model?.switch?.state?.buttonevent && (
                <FooterChip
                  icon="hand-point-down"
                  label={
                    "last button pressed: " +
                    buttonEventToStr(model?.switch?.state?.buttonevent)
                  }
                />
              )}
            </Box>
          )}
          {model?.switch?.productname && (
            <Box>
              <FooterChip icon="info" label={model?.switch?.productname} />
            </Box>
          )}
        </Box>
      </CardActions>
    </Card>
  );
};

export default Switch;
