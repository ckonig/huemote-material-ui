import {
  AccordionDetails,
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";

import Accordion from "./Accordion";
import React from "react";
import Room from "./Room";
import useScenes from "../queries/scenes";
import { useRooms } from "../domain/room";

const Scenes = () => {
  const [expanded, setExpanded] = React.useState<number | false>(false);
  const { activate } = useScenes();
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
            <List
              aria-label="secondary"
              color="default"
              style={{
                width: "100%",
                fontSize: "1.25em",
              }}
            >
              {room.scenes.map((scene) => (
                <React.Fragment key={scene.id}>
                  <ListItem
                    key={scene.id}
                    style={{
                      flexDirection: "column",
                      margin: 0,
                      padding: 0,
                    }}
                  >
                    <Box width="100%" display="flex" flexDirection="row">
                      <Box display="flex" flexGrow={1}>
                        <ListItemText primary={scene.name} />
                      </Box>
                      <Box>
                        <Button
                          size="small"
                          variant="outlined"
                          onClick={() => activate(scene)}
                        >
                          Activate
                        </Button>
                      </Box>
                    </Box>
                  </ListItem>
                  <Divider style={{ marginBottom: 13, marginTop: 14 }} />
                </React.Fragment>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
};
export default Scenes;
