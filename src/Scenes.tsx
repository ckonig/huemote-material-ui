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
  const {
    state: { baseUrl, groups, scenes },
    refresh,
  } = useHueContext();

  const activateScene = React.useCallback(
    (scene: any, id: string, refresh: () => void) => {
      const payload = { scene: scene.key };
      //@todo move to api
      fetch(`${baseUrl}/groups/${id}/action`, {
        method: "put",
        body: JSON.stringify(payload),
      }).then(() => refresh());
    },
    [baseUrl]
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
                  {getScenes(scenes, elem.key).map((scene, si) => (
                    <ListItem
                      button
                      key={si}
                      onClick={() => activateScene(scene, elem.key, refresh)}
                    >
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
export default Scenes;
