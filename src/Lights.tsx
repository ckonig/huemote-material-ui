import {
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";

import Accordion from "./Accordion";
import React from "react";
import Room from "./Room";
import { useHueContext } from "./HueContext";

const getLights = (lights: any, roomLights: string[], id: string) => {
  return Object.keys(lights)
    .map((key) => ({
      key,
      ...lights[key],
    }))
    .filter((light) => roomLights.indexOf(`${light.key}`) > -1);
};

const Lights = () => {
  const [expanded, setExpanded] = React.useState<number | false>(false);
  const {
    state: { lights, groups },
  } = useHueContext();

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
                  {getLights(lights, elem.lights, elem.key).map((scene, si) => (
                    <ListItem button key={si}>
                      <ListItemText primary={scene.name} />
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
