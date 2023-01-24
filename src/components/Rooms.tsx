import { AccordionDetails } from "@mui/material";
import Accordion from "./Accordion";
import Room from "./Room";
import { Room as RoomModel } from "../domain/models";
import { useRooms } from "../domain/useRooms";
import { useState } from "react";
import { RoomList } from "./RoomLayout";

const Rooms = ({
  handler,
}: {
  handler: (room: RoomModel) => React.ReactNode;
}) => {
  const [expanded, setExpanded] = useState<number | false>(false);
  const rooms = useRooms();
  return (
    <>
      {rooms.map((room) => (
        <Accordion
          key={room.id}
          square
          expanded={expanded === room.id}
          onChange={(e, newExpanded) =>
            setExpanded(newExpanded ? room.id : false)
          }
        >
          <Room room={room} />
          <AccordionDetails>
            <RoomList>{handler(room)}</RoomList>
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
};
export default Rooms;
