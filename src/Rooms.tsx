import {
  AccordionDetails,
  Box,
  Grid,
  Icon,
  List,
  ListItem,
  ListItemText,
  Switch,
  Typography,
} from "@material-ui/core";

import Accordion from "./Accordion";
import AccordionSummary from "./AccordionSummary";
import { RawGroupsResponse } from "./Common";
import React from "react";
import { baseUrl } from "./API";

const getScenes = (scenes: any, id: string) => {
  return Object.keys(scenes)
    .map((key) => ({
      key,
      ...scenes[key],
    }))
    .filter(
      (scene) =>
        scene.group &&
        scene.group === id &&
        scene.type === "GroupScene" &&
        !scene.recycle
    );
};

//@todo move to api
const activateScene = (scene: any, id: string, refresh: () => void) => {
  const payload = { scene: scene.key };

  fetch(`${baseUrl}/groups/${id}/action`, {
    method: "put",
    body: JSON.stringify(payload),
  }).then(() => refresh());
};

//@todo move mapping to config, based on group names only

const hueToFa = (hue: string) => {
  switch (hue) {
    case "Living room":
      return "fa-tv";
    case "Bathroom":
      return "fa-toilet-paper";
    case "Bedroom":
      return "fa-bed";
    case "Balcony":
      return "fa-tree";
    case "Garden":
      return "fa-seedling";
    case "Kitchen":
      return "fa-coffee";
    case "Front door":
      return "fa-shoe-prints";
    case "Reading":
      return "fa-laptop-house";
  }
  console.error("no icon for class:" + hue);
};

//@todo rename to Scenes
const Rooms = (props: {
  groups: RawGroupsResponse;
  lights: any;
  scenes: any;
  refresh: () => void;
}) => {
  const [expanded, setExpanded] = React.useState<number | false>(false);

  const toggleRoom = React.useCallback(
    (elem: any) => {
      const payload = { on: !elem.state.any_on };

      fetch(`${baseUrl}/groups/${elem.key}/action`, {
        method: "put",
        body: JSON.stringify(payload),
      }).then(() => props.refresh());
    },
    [props]
  );

  return (
    <>
      {Object.keys(props.groups)
        .map((key) => ({ key: key, ...props.groups[parseInt(key)] }))
        .map((elem, id) => (
          <Accordion
            square
            expanded={expanded === parseInt(elem.key)}
            onChange={(e, newExpanded) =>
              setExpanded(newExpanded ? parseInt(elem.key) : false)
            }
          >
            <AccordionSummary
              aria-controls="panel1d-content"
              id="panel1d-header"
            >
              <Grid style={{ width: "100%" }} container>
                <Box display="flex" flexGrow={1} style={{ margin: "auto" }}>
                  <Icon
                    className={`fa ${hueToFa(elem.class)}`}
                    style={{ width: 45 }}
                  />
                  <Typography>{elem.name}</Typography>
                </Box>

                <Box>
                  <Switch
                    checked={elem.state.any_on}
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => {
                      e.stopPropagation();
                      toggleRoom(elem);
                    }}
                    color="primary"
                    name="checkedB"
                    inputProps={{ "aria-label": "primary checkbox" }}
                  />
                </Box>
              </Grid>
            </AccordionSummary>
            <AccordionDetails>
              <List
                aria-label="secondary"
                color="default"
                style={{
                  width: "100%",
                  fontSize: "1.25em",
                }}
              >
                {getScenes(props.scenes, elem.key).map((scene, si) => (
                  <ListItem
                    button
                    key={si}
                    onClick={() =>
                      activateScene(scene, elem.key, props.refresh)
                    }
                  >
                    <ListItemText primary={scene.name} />
                  </ListItem>
                ))}
              </List>
            </AccordionDetails>
          </Accordion>
        ))}
    </>
  );
};
export default Rooms;
