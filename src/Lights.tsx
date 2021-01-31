import {
  AccordionDetails,
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Slider,
  Switch,
  TextField,
} from "@material-ui/core";

import Accordion from "./Accordion";
import React from "react";
import RgbPicker from "./RgbPicker";
import Room from "./Room";
import { useHueContext } from "./HueContext";

const Lights = () => {
  const [rgb, setRgb] = React.useState("255-0-0");
  const [expanded, setExpanded] = React.useState<number | false>(false);
  const {
    state: { lights, groups, baseUrl },
    refresh,
  } = useHueContext();

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

  //@todo add switch per light

  const handleSliderChange = (light: any, newval: any) => {
    fetch(`${baseUrl}/lights/${light.key}/state`, {
      method: "put",
      body: JSON.stringify({ bri: newval }),
    }).then(() => refresh());
  };
  const toggleLight = (light: any) => {
    fetch(`${baseUrl}/lights/${light.key}/state`, {
      method: "put",
      body: JSON.stringify({ on: !light.state.on }),
    }).then(() => refresh());
  };

  const productToIcon = (icon: string) => {
    if (icon === "On/Off plug") return "fa fa-plug";
    if (icon === "Hue lightstrip plus") return "fa fa-tape";
    if (icon === "Hue color candle") return "fa fa-fire";
    if (icon === "Hue color lamp") return "fas fa-lightbulb";
    if (icon === "Hue color spot") return "fas fa-lightbulb";
    return "far fa-lightbulb";
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
                            <ListItemIcon
                              style={{ fontSize: "1.5em", margin: "auto" }}
                              className={productToIcon(light.productname)}
                            />
                            <ListItemText
                              primary={light.name}
                              secondary={light.productname}
                            />
                          </Box>
                          <Box>
                            <Switch
                              size="small"
                              checked={!!light.state.on}
                              onChange={() => toggleLight(light)}
                            />
                          </Box>
                        </Box>

                        {/** @todo expand color picker optionally, hide by defaut */}
                        {light.state.xy && <RgbPicker light={light} />}

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
