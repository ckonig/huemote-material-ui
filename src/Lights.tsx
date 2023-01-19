import {
  AccordionDetails,
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import Accordion from "./Accordion";
import React from "react";
import Room from "./Room";
import ProductIcon from "./ProductIcon";
import { useRooms } from "./domain/models";
import { BrightnessSlider } from "./components/BrightnessSlider";
import { LightSwitch } from "./components/LightSwitch";

const Lights = () => {
  const [expanded, setExpanded] = React.useState<number | false>(false);
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
              {room.lights.map((light) => (
                <React.Fragment key={light.id}>
                  <ListItem
                    style={{
                      flexDirection: "column",
                      margin: 0,
                      padding: 0,
                    }}
                  >
                    <Box width="100%" display="flex" flexDirection="row">
                      <Box display="flex" flexGrow={1}>
                        <ProductIcon productname={light.productname} />
                        <ListItemText
                          primary={light.name}
                          secondary={light.productname}
                        />
                      </Box>
                      <Box>
                        <LightSwitch light={light} />
                      </Box>
                    </Box>

                    <BrightnessSlider light={light} />
                  </ListItem>
                  {!light.state.bri && (
                    <Divider
                      key={light.id + "d"}
                      style={{ marginBottom: 13, marginTop: 14 }}
                    />
                  )}
                </React.Fragment>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
};
export default Lights;
