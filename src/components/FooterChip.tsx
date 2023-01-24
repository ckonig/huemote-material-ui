import { Chip, Icon } from "@mui/material";

const iconStyle = {
  width: "auto",
  height: "auto",
  margin: "auto",
  fontSize: "0.8em",
  paddingLeft: "10px",
};

const FooterChip = (props: {
  icon: string;
  label: number | string;
  opacity?: number;
}) => {
  return (
    <Chip
      style={{ backgroundColor: `rgba(144,202,253,${props.opacity})` }}
      variant="outlined"
      size="small"
      icon={<Icon style={iconStyle} className={`fa fa-${props.icon}`} />}
      label={props.label}
    />
  );
};

export default FooterChip;
