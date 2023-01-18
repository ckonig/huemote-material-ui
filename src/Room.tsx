import { Box, Grid, Icon, Switch, Typography } from "@material-ui/core";

import AccordionSummary from "./AccordionSummary";
import React from "react";
import { hueToFa } from "./HueIcon";
import { useHueContext } from "./HueContext";

const Room = (props: { elem: any }) => {
  const { elem } = props;
  const {
    state: { baseUrl },
    refresh,
  } = useHueContext();
  const toggleRoom = React.useCallback(
    (elem: any) => {
      const payload = { on: !elem.state.any_on };
      //@todo move to api
      fetch(`${baseUrl}/groups/${elem.key}/action`, {
        method: "put",
        body: JSON.stringify(payload),
      }).then(() => refresh());
    },
    [refresh, baseUrl]
  );
  return (
    <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
      <Grid style={{ width: "100%" }} container>
        <Box display="flex" flexGrow={1} style={{ margin: "auto" }}>
          <Icon className={`fa ${hueToFa(elem.class)}`} style={{ width: 45 }} />
          <Typography>{elem.name}</Typography>
        </Box>
        <Box>
          <Switch
            checked={elem.state.any_on}
            onClick={(e) => e.stopPropagation()}
            onChange={(e) => {
              e.stopPropagation();
              toggleRoom(elem);
            }}
            color="primary"
            inputProps={{ "aria-label": "primary checkbox" }}
          />
        </Box>
      </Grid>
    </AccordionSummary>
  );
};

export default Room;
