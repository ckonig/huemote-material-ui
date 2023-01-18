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
import useGroups from "./queries/groups";
import useScenes from "./queries/scenes";

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

const Scenes = () => {
  const [expanded, setExpanded] = React.useState<number | false>(false);
  const { scenes, activate } = useScenes();
  const { groups } = useGroups();

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
                  {getScenes(scenes, elem.key).map((scene, si) => (
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
                            <ListItemText primary={scene.name} />
                          </Box>
                          <Box>
                            <Button
                              size="small"
                              variant="outlined"
                              onClick={() => activate(scene, elem.key)}
                            >
                              Activate
                            </Button>
                          </Box>
                        </Box>
                      </ListItem>
                      <Divider style={{ marginBottom: 13, marginTop: 14 }} />
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
export default Scenes;
