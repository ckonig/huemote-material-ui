import { Icon } from "@material-ui/core";
import { Room } from "../domain/models";

export const hueClassToFaIcon = (hue: string) => {
  //@todo move to json config
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

const RoomIcon = ({ room }: { room: Room }) => {
  return (
    <Icon
      className={`fa ${hueClassToFaIcon(room.class)}`}
      style={{ width: 45 }}
    />
  );
};

export default RoomIcon;
