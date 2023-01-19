import { Box, Grid, Icon, Switch, Typography } from "@material-ui/core";
import AccordionSummary from "./AccordionSummary";
import { hueToFa } from "./HueIcon";
import useGroups from "./queries/groups";
import { Room as RoomModel } from "./domain/models";

const Room = ({ room }: { room: RoomModel }) => {
  const { toggle } = useGroups();
  return (
    <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
      <Grid style={{ width: "100%" }} container>
        <Box display="flex" flexGrow={1} style={{ margin: "auto" }}>
          <Icon className={`fa ${hueToFa(room.class)}`} style={{ width: 45 }} />
          <Typography>{room.name}</Typography>
        </Box>
        <Box>
          <Switch
            checked={room.state.any_on}
            onClick={(e) => e.stopPropagation()}
            onChange={(e) => {
              e.stopPropagation();
              toggle(room);
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
