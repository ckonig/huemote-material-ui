const productToIcon = (icon: string) => {
  if (icon === "On/Off plug") return "fa fa-plug";
  if (icon === "Hue lightstrip plus") return "fa fa-tape";
  if (icon === "Hue color candle") return "fa fa-fire";
  if (icon === "Hue color lamp") return "fas fa-lightbulb";
  if (icon === "Hue color spot") return "fas fa-lightbulb";
  return "far fa-lightbulb";
};

export default productToIcon;
