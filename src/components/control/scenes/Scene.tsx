import { Box, Button, Divider, ListItemText } from "@mui/material";
import { Scene as SceneModel } from "../../../domain/models";
import useScenes from "../../../queries/useScenes";
import { RoomListItem } from "../RoomLayout";

const Scene = ({ scene }: { scene: SceneModel }) => {
  const { activate } = useScenes();
  return (
    <Box key={scene.id}>
      <RoomListItem>
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
      </RoomListItem>
      <Divider style={{ marginBottom: 13, marginTop: 14 }} />
    </Box>
  );
};

export default Scene;
