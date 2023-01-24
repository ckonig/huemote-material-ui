import { Icon } from "@mui/material";
import { Room } from "../domain/models";
import hueClassToFaIcon from "../helpers/hueClassToFaIcon";

const RoomIcon = ({ room }: { room: Room }) => {
  return (
    <Icon
      className={`fa ${hueClassToFaIcon(room.class)}`}
      style={{ width: 45 }}
    />
  );
};

export default RoomIcon;
