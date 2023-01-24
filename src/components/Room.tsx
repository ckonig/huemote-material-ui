import AccordionSummary from "./AccordionSummary";
import RoomIcon from "./RoomIcon";
import RoomSwitch from "./RoomSwitch";
import { Room as RoomModel } from "../domain/models";
import { Box, Grid, Typography } from "@mui/material";

const Room = ({
  room,
  backgrounded,
}: {
  room: RoomModel;
  backgrounded: boolean;
}) => {
  const color = backgrounded ? "disabled" : "inherit";
  return (
    <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
      <Grid style={{ width: "100%" }} container>
        <Box display="flex" flexGrow={1} style={{ margin: "auto" }}>
          <RoomIcon color={color} room={room} />
          <Typography color={color}>{room.name}</Typography>
        </Box>
        <Box>
          <RoomSwitch room={room} />
        </Box>
      </Grid>
    </AccordionSummary>
  );
};

export default Room;
