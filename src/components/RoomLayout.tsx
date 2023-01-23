import { List, ListItem } from "@material-ui/core";

export const RoomList = ({ children }: { children: React.ReactNode }) => {
  return (
    <List
      aria-label="secondary"
      color="default"
      style={{
        width: "100%",
        fontSize: "1.25em",
      }}
    >
      {children}
    </List>
  );
};

export const RoomListItem = ({ children }: { children: React.ReactNode }) => {
  return (
    <ListItem
      style={{
        flexDirection: "column",
        margin: 0,
        padding: 0,
      }}
    >
      {children}
    </ListItem>
  );
};
