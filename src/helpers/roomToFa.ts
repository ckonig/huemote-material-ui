//This helper maps names (from sensors and switches) to fa-icons
//it uses the first word from the name of the sensor to find out the matching icon
//@todo make configurability more obvious
const roomToFa = (room: string) => {
  switch (room) {
    case "Living":
    case "Living room":
      return "fa-tv";
    case "Bathroom":
    case "Bath":
      return "fa-toilet-paper";
    case "Bed":
    case "Bedroom":
      return "fa-bed";
    case "Balcony":
      return "fa-tree";
    case "Plants":
    case "Greenhouse":
      return "fa-seedling";
    case "Kitchen":
      return "fa-coffee";
    case "Entrance":
    case "entrance":
      return "fa-shoe-prints";
    case "Office":
    case "Bib":
      return "fa-laptop-house";
  }
  console.error("no icon for room:" + room);
};

export default roomToFa;
