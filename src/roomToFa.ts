//@todo move to json
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
