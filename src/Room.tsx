import { Box, Grid, Icon, Switch, Typography } from "@material-ui/core";
import AccordionSummary from "./AccordionSummary";
import { hueToFa } from "./HueIcon";
import { GroupsResponseObj } from "./clip/v1/groups";
import useGroups from "./queries/groups";

const Room = ({ elem }: { elem: GroupsResponseObj }) => {
  const { toggle } = useGroups();
  return (
    <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
      <Grid style={{ width: "100%" }} container>
        <Box display="flex" flexGrow={1} style={{ margin: "auto" }}>
          <Icon className={`fa ${hueToFa(elem.class)}`} style={{ width: 45 }} />
          <Typography>{elem.name}</Typography>
        </Box>
        <Box>
          <Switch
            checked={elem.state.any_on}
            onClick={(e) => e.stopPropagation()}
            onChange={(e) => {
              e.stopPropagation();
              toggle(elem);
            }}
            color="primary"
            inputProps={{ "aria-label": "primary checkbox" }}
          />
        </Box>
      </Grid>
    </AccordionSummary>
  );
};

export default Room;
