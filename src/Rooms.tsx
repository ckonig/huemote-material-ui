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
  withStyles,
} from "@material-ui/core";

import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
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

const toggleScene = (scene: any, id: string, refresh: () => void) => {
  const payload = { scene: scene.key };

  fetch(`${baseUrl}/groups/${id}/action`, {
    method: "put",
    body: JSON.stringify(payload),
  }).then(() => refresh());
};

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

const Accordion = withStyles({
  root: {
    border: "1px solid rgba(0, 0, 0, .125)",
    boxShadow: "none",
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
    "&$expanded": {
      margin: "auto",
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    backgroundColor: "rgba(0, 0, 0, .03)",
    borderBottom: "1px solid rgba(0, 0, 0, .125)",
    marginBottom: -1,
    minHeight: 56,
    "&$expanded": {
      minHeight: 56,
    },
  },
  content: {
    "&$expanded": {
      margin: "12px 0",
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const Rooms = (props: {
  groups: RawGroupsResponse;
  lights: any;
  scenes: any;
  refresh: () => void;
}) => {
  const [expanded, setExpanded] = React.useState<number | false>(false);

  const handleChange = (panel: number) => (
    event: React.ChangeEvent<{}>,
    newExpanded: boolean
  ) => {
    setExpanded(newExpanded ? panel : false);
  };

  const toggle = React.useCallback(
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
            onChange={handleChange(parseInt(elem.key))}
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
                      toggle(elem);
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
                    onClick={() => toggleScene(scene, elem.key, props.refresh)}
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
