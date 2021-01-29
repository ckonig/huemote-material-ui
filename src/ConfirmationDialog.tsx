import { Checkbox, FormHelperText, TextField } from "@material-ui/core";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import React from "react";
import { createBaseUrl } from "./API";
import { useHueContext } from "./HueContext";

export interface ConfirmationDialogRawProps {
  classes: Record<"paper", string>;
  id: string;
  keepMounted: boolean;
  value: string;
  open: boolean;
  onClose: (value?: string) => void;
}

function ConfirmationDialogRaw(props: ConfirmationDialogRawProps) {
  const { onClose, value: valueProp, open, ...other } = props;
  const [value, setValue] = React.useState(valueProp);
  const radioGroupRef = React.useRef<HTMLElement>(null);

  const fetchLocalBridges = () =>
    fetch("https://discovery.meethue.com/").then((d) => d.json());

  const getFirstLocalBridge = () =>
    fetchLocalBridges().then((bridges) => {
      if (bridges && bridges.length > 0) {
        setIp(bridges[0].internalipaddress);
      }
    });

  React.useEffect(() => {
    if (!ip) {
      getFirstLocalBridge();
    }
  }, []);

  React.useEffect(() => {
    if (!open) {
      setValue(valueProp);
    }
  }, [valueProp, open]);

  const handleEntering = () => {
    if (radioGroupRef.current != null) {
      radioGroupRef.current.focus();
    }
  };

  const { initialize } = useHueContext();

  const handleOk = () => {
    //@todo validate input
    if (consent && ip) {
      fetch(`http://${ip}/api`, {
        method: "post",
        body: JSON.stringify({ devicetype: "react-app" }),
      })
        .then((d) => d.json())
        .then((d) => {
          if (d.length === 1 && d[0].error && d[0].error.type === 101) {
            console.log("ALERT: press connect button!");
          } else if (d.length > 0 && d[0].success && d[0].success.username) {
            initialize(createBaseUrl(ip, d[0].success.username));
            onClose(value);
          } else {
            console.error("unknown case", d);
          }
        });
    }
  };

  const [consent, setConsent] = React.useState<boolean>(false);
  const [ip, setIp] = React.useState<string>("");

  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      maxWidth="xs"
      onEntering={handleEntering}
      aria-labelledby="confirmation-dialog-title"
      open={open}
      {...other}
    >
      <DialogTitle id="confirmation-dialog-title">
        Connect to Hue Bridge
      </DialogTitle>
      <DialogContent dividers>
        <FormControlLabel
          control={
            <Checkbox
              required
              checked={consent}
              onChange={(e, v) => setConsent(v)}
              name="consent"
            />
          }
          label="Allow Data Storage"
        />

        <TextField
          label=""
          value={ip}
          variant="outlined"
          onChange={(e) => setIp(e.target.value)}
        />
        <FormHelperText>Local Hue Bridge IP Address</FormHelperText>
      </DialogContent>
      <DialogActions>
        <Button disabled={!consent} onClick={handleOk} color="primary">
          Connect
        </Button>
      </DialogActions>
    </Dialog>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    paper: {
      width: "80%",
      maxHeight: 435,
    },
  })
);

export default function ConfirmationDialog(props: { open: boolean }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(props.open);
  const [value, setValue] = React.useState("Dione");

  const handleClose = (newValue?: string) => {
    setOpen(false);

    if (newValue) {
      setValue(newValue);
    }
  };

  return (
    <ConfirmationDialogRaw
      classes={{
        paper: classes.paper,
      }}
      id="ringtone-menu"
      keepMounted
      open={open}
      onClose={handleClose}
      value={value}
    />
  );
}
