export const hueToFa = (hue: string) => {
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
