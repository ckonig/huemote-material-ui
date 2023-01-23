import { Box, Grid, Typography } from "@material-ui/core";
import AccordionSummary from "./AccordionSummary";
import RoomIcon from "./components/RoomIcon";
import RoomSwitch from "./components/RoomSwitch";
import { Room as RoomModel } from "./domain/models";

const Room = ({ room }: { room: RoomModel }) => {
  return (
    <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
      <Grid style={{ width: "100%" }} container>
        <Box display="flex" flexGrow={1} style={{ margin: "auto" }}>
          <RoomIcon room={room} />
          <Typography>{room.name}</Typography>
        </Box>
        <Box>
          <RoomSwitch room={room} />
        </Box>
      </Grid>
    </AccordionSummary>
  );
};

export default Room;
