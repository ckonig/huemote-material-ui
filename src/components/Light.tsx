import { Box, Divider, ListItemText } from "@mui/material";
import ProductIcon from "./ProductIcon";
import { BrightnessSlider } from "./BrightnessSlider";
import { LightSwitch } from "./LightSwitch";
import { RoomListItem } from "./RoomLayout";
import { Light as LightModel } from "../domain/models";

const Light = ({ light }: { light: LightModel }) => {
  return (
    <Box key={light.id}>
      <RoomListItem>
        <Box width="100%" display="flex" flexDirection="row">
          <Box display="flex" flexGrow={1}>
            <ProductIcon productname={light.productname} />
            <ListItemText primary={light.name} secondary={light.productname} />
          </Box>
          <Box>
            <LightSwitch light={light} />
          </Box>
        </Box>
        <BrightnessSlider light={light} />
      </RoomListItem>
      {!light.state?.bri && (
        <Divider
          key={light.id + "d"}
          style={{ marginBottom: 13, marginTop: 14 }}
        />
      )}
    </Box>
  );
};

export default Light;
