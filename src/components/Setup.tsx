import {
  Checkbox,
  FormHelperText,
  TextField,
  Typography,
} from "@material-ui/core";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import React from "react";
import generateUID from "../generateUID";
import { useHueContext } from "../HueContext";
import { getStepTitle, Steps } from "../useSteps";

export interface ConfirmationDialogRawProps {
  classes: Record<"paper", string>;
  id: string;
  keepMounted: boolean;
  open: boolean;
  onClose: () => void;
  step: number;
  next: () => void;
}

function ConfirmationDialogRaw(props: ConfirmationDialogRawProps) {
  const { onClose, open, ...other } = props;
  const [UID, setUID] = React.useState<string>(generateUID());

  React.useEffect(() => {
    if (!open) setUID(generateUID);
  }, [open]);

  const [ip, setIp] = React.useState<string>("");

  const { initialize, state } = useHueContext();

  //@todo move to API
  React.useEffect(() => {
    if (props.step === Steps.BRIDGE && !ip && !state.baseUrl) {
      fetch("https://discovery.meethue.com/")
        .then((d) => d.json())
        .then((bridges) => {
          if (bridges && bridges.length > 0) {
            setIp(bridges[0].internalipaddress);
          }
        });
    }
  }, [props.step, ip, state.baseUrl]);

  const [consent, setConsent] = React.useState<boolean>(false);

  const getTitle = React.useCallback(() => {
    return getStepTitle(props.step);
  }, [props]);

  //@todo move to API
  const handleOk = React.useCallback(() => {
    if (props.step === Steps.CONNECT && consent && ip) {
      fetch(`http://${ip}/api`, {
        method: "post",
        body: JSON.stringify({ devicetype: "hue-react#" + UID }),
      })
        .then((d) => d.json())
        .then((d) => {
          if (d.length === 1 && d[0].error && d[0].error.type === 101) {
            console.log("ALERT: press connect button! @todo");
          } else if (d.length > 0 && d[0].success && d[0].success.username) {
            initialize(ip, d[0].success.username, "hue-react#" + UID);
            onClose();
          } else {
            console.error("unknown case @todo", d);
          }
        });
    }
    if (props.step === Steps.START) {
      props.next();
    }
    if (props.step === Steps.CONSENT) {
      props.next();
    }
    if (props.step === Steps.BRIDGE) {
      props.next();
    }
  }, [props, UID, initialize, consent, ip, onClose]);

  if (state.baseUrl) {
    return null;
  }

  const Content = () => {
    if (props.step === Steps.START) {
      return (
        <Typography>Press Continue to start the Connection Wizard.</Typography>
      );
    }
    if (props.step === Steps.CONSENT) {
      return (
        <>
          <Typography>
            Your data belongs to you. We need your consent to store it on this
            device.
          </Typography>
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
        </>
      );
    }
    if (props.step === Steps.BRIDGE) {
      return (
        <>
          <TextField
            label=""
            value={ip}
            variant="outlined"
            onChange={(e) => setIp(e.target.value)}
          />
          <FormHelperText>
            Enter the IP address of the Hue Bridge on your local network. Make
            sure your device is connected to the same network.
          </FormHelperText>
        </>
      );
    }
    if (props.step === Steps.CONNECT) {
      return (
        <>
          <Typography>
            Now press the "Connect" hardware button on your Hue Bridge, then
            press "Finish" below.
          </Typography>
          <Typography>
            This will request permissions for this app (<i> react-app-{UID} </i>
            ) in your Hue Bridge.
          </Typography>
        </>
      );
    }
    return null;
  };

  return (
    <Dialog
      disableEscapeKeyDown
      maxWidth="xs"
      aria-labelledby="confirmation-dialog-title"
      open={open}
      {...other}
    >
      <DialogTitle id="confirmation-dialog-title">{getTitle()}</DialogTitle>
      <DialogContent dividers>
        <Content />
      </DialogContent>
      <DialogActions>
        <Button
          disabled={!consent && props.step === Steps.CONSENT}
          onClick={handleOk}
          color="primary"
        >
          {props.step === Steps.CONNECT ? "Finish" : "Continue"}
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

export default function ConfirmationDialog() {
  const classes = useStyles();
  const [state, setState] = React.useState({ open: true, step: Steps.START });
  const {
    state: { baseUrl },
  } = useHueContext();

  React.useEffect(() => {
    if (!baseUrl && !state.open) {
      setState({ step: Steps.START, open: true });
    }
  }, [baseUrl, state]);

  return (
    <ConfirmationDialogRaw
      classes={{
        paper: classes.paper,
      }}
      id="ringtone-menu"
      keepMounted
      step={state.step}
      next={() => setState({ ...state, step: state.step + 1 })}
      open={state.open}
      onClose={() => setState({ ...state, open: false })}
    />
  );
}
