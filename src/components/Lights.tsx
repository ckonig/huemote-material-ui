import Light from "./Light";
import Rooms from "./Rooms";
import { Room } from "../domain/models";

const Lights = () => {
  return (
    <Rooms
      handler={(room: Room) =>
        room.lights.map((light) => <Light light={light} />)
      }
    />
  );
};
export default Lights;
