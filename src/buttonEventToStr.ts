const buttonEventToStr = (buttonevent: number) => {
  if (buttonevent === 1002) return "on";
  if (buttonevent === 2002) return "dim +";
  if (buttonevent === 3002) return "dim -";
  if (buttonevent === 4002) return "off";
  //@todo map tap switch button events
  return "";
};
export default buttonEventToStr;
