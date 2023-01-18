import {
  AccordionDetails,
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  Slider,
  Switch,
} from "@material-ui/core";

import Accordion from "./Accordion";
import React from "react";
import Room from "./Room";
import useLights from "./queries/lights";
import ProductIcon from "./ProductIcon";
import useGroups from "./queries/groups";

const Lights = () => {
  const [expanded, setExpanded] = React.useState<number | false>(false);
  const { groups } = useGroups();
  const { lights, toggle, setBrightness } = useLights();

  const getLights = React.useCallback(
    (roomLights: string[], id: string) => {
      return Object.keys(lights)
        .map((key: string) => ({
          key,
          ...lights[parseInt(key)],
        }))
        .filter((light) => roomLights.indexOf(`${light.key}`) > -1);
    },
    [lights]
  );

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
                  {getLights(elem.lights, elem.key).map((light, si) => (
                    <>
                      <ListItem
                        key={si}
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
                            <Switch
                              size="small"
                              checked={!!light.state.on}
                              onChange={() => toggle(light)}
                            />
                          </Box>
                        </Box>

                        {light.state.bri && (
                          <Slider
                            disabled={!light.state.on}
                            min={1}
                            max={254}
                            value={light.state.bri}
                            onChangeCommitted={(e, val) =>
                              setBrightness(light.key, val as any)
                            }
                            aria-labelledby="continuous-slider"
                          />
                        )}
                      </ListItem>
                      {!light.state.bri && (
                        <Divider style={{ marginBottom: 13, marginTop: 14 }} />
                      )}
                    </>
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
