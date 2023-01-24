import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";

const Accordion = (props: AccordionProps) => {
  const sx = {
    ...props.sx,
    border: "1px solid rgba(0, 0, 0, .125)",
    boxShadow: "none",
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
    "&$expanded": {
      margin: "auto",
    },
  };
  return (
    <MuiAccordion {...props} sx={sx}>
      {props.children}
    </MuiAccordion>
  );
};

export default Accordion;
