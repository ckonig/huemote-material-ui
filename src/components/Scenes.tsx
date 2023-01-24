import Scene from "./Scene";
import Rooms from "./Rooms";
import { Room } from "../domain/models";

const Scenes = () => {
  return (
    <Rooms
      handler={(room: Room) =>
        room.scenes.map((scene) => <Scene key={scene.id} scene={scene} />)
      }
    />
  );
};
export default Scenes;
