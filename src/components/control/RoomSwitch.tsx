import { Switch, SwitchProps } from "@mui/material";
import { Room } from "../../domain/models";
import useGroups from "../../queries/useGroups";

interface RoomSwitchProps extends SwitchProps {
  room: Room;
}
const RoomSwitch = (props: RoomSwitchProps) => {
  const { toggle } = useGroups();
  return (
    <Switch
      disabled={props.disabled}
      checked={props.room.state.any_on}
      onClick={(e) => e.stopPropagation()}
      onChange={(e) => {
        e.stopPropagation();
        toggle(props.room);
      }}
      color="primary"
      inputProps={{ "aria-label": "primary checkbox" }}
    />
  );
};

export default RoomSwitch;
