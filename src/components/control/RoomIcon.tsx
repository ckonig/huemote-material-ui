import Icon, { IconTypeMap } from "@mui/material/Icon";
import { DefaultComponentProps } from "@mui/material/OverridableComponent";
import { Room } from "../../domain/models";
import hueClassToFaIcon from "../../helpers/hueClassToFaIcon";

interface RoomProps extends DefaultComponentProps<IconTypeMap> {
  room: Room;
}
const RoomIcon = (props: RoomProps) => {
  return (
    <Icon
      {...props}
      className={`fa ${hueClassToFaIcon(props.room.class)}`}
      style={{ width: 45 }}
    />
  );
};

export default RoomIcon;
