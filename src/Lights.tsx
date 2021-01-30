import {
  AccordionDetails,
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  Slider,
} from "@material-ui/core";

import Accordion from "./Accordion";
import { RawLightsResponse } from "./Common";
import React from "react";
import Room from "./Room";
import { useHueContext } from "./HueContext";

const getLights = (
  lights: RawLightsResponse,
  roomLights: string[],
  id: string
) => {
  return Object.keys(lights)
    .map((key: string) => ({
      key,
      ...lights[parseInt(key)],
    }))
    .filter((light) => roomLights.indexOf(`${light.key}`) > -1);
};

const Lights = () => {
  const [expanded, setExpanded] = React.useState<number | false>(false);
  const {
    state: { lights, groups, baseUrl },
    refresh,
  } = useHueContext();

  //@todo add switch per light
  
  const handleSliderChange = (light: any, newval: any) => {
    console.log("new brightness:", newval, light);
    fetch(`${baseUrl}/lights/${light.key}/state`, {
      method: "put",
      body: JSON.stringify({ bri: newval }),
    }).then(() => refresh());
  };
  return (
    <>
      {Object.keys(groups)
        .map((key) => ({ key: key, ...groups[parseInt(key)] }))
        .map((elem, id) =>
          !elem || !elem.state ? null : (
            <Accordion
              key={id}
              square
              expanded={expanded === parseInt(elem.key)}
              onChange={(e, newExpanded) =>
                setExpanded(newExpanded ? parseInt(elem.key) : false)
              }
            >
              <Room elem={elem} />
              <AccordionDetails>
                <List
                  aria-label="secondary"
                  color="default"
                  style={{
                    width: "100%",
                    fontSize: "1.25em",
                  }}
                >
                  {getLights(lights, elem.lights, elem.key).map((light, si) => (
                    <ListItem
                      key={si}
                      style={{ flexDirection: "column", margin: 0, padding: 0 }}
                    >
                      <ListItemText
                        style={{ width: "100%" }}
                        primary={light.name}
                      />

                      {light.state.bri && (
                        <Slider
                          disabled={!light.state.on}
                          min={1}
                          max={254}
                          value={light.state.bri}
                          onChange={(e, v) => console.log(v)}
                          onChangeCommitted={(e, val) =>
                            handleSliderChange(light, val)
                          }
                          aria-labelledby="continuous-slider"
                        />
                      )}
                    </ListItem>
                  ))}
                </List>
              </AccordionDetails>
            </Accordion>
          )
        )}
    </>
  );
};
export default Lights;
