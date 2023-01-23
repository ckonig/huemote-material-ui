import { Switch } from "@material-ui/core";
import { Room } from "../domain/models";
import useGroups from "../queries/groups";

const RoomSwitch = ({ room }: { room: Room }) => {
  const { toggle } = useGroups();
  return (
    <Switch
      checked={room.state.any_on}
      onClick={(e) => e.stopPropagation()}
      onChange={(e) => {
        e.stopPropagation();
        toggle(room);
      }}
      color="primary"
      inputProps={{ "aria-label": "primary checkbox" }}
    />
  );
};

export default RoomSwitch;
