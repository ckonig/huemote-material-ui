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
import generateUID from "../../generateUID";
import { useHueContext } from "../../HueContext";
import { getStepTitle, Steps } from "./useSteps";
import { useBridgeDiscovery } from "../../queries/setup";

export default function ConfirmationDialog() {
  const [state, setState] = React.useState({
    open: true,
    step: Steps.START,
    UID: generateUID(),
    ip: "",
    consent: false,
  });

  const {
    state: { baseUrl },
  } = useHueContext();

  React.useEffect(() => {
    if (!baseUrl && !state.open) {
      setState({ ...state, step: Steps.START, open: true });
    }
  }, [baseUrl, state]);

  const classes = {
    paper: useStyles().paper,
  };

  React.useEffect(() => {
    if (!state.open) setState({ ...state, UID: generateUID() });
  }, [state]);

  const { initialize } = useHueContext();

  const { bridges } = useBridgeDiscovery();

  React.useEffect(() => {
    if (
      state.step === Steps.BRIDGE &&
      !state.ip &&
      !baseUrl &&
      bridges.length
    ) {
      setState({ ...state, ip: bridges[0].internalipaddress });
    }
  }, [state, baseUrl, bridges]);

  const getTitle = React.useCallback(() => {
    return getStepTitle(state.step);
  }, [state.step]);

  //@todo move to API
  const handleOk = React.useCallback(() => {
    const onClose = () => setState({ ...state, open: false });
    const next = () => setState({ ...state, step: state.step + 1 });
    if (state.step === Steps.CONNECT && state.consent && state.ip) {
      fetch(`http://${ip}/api`, {
        method: "post",
        body: JSON.stringify({ devicetype: "hue-react#" + state.UID }),
      })
        .then((d) => d.json())
        .then((d) => {
          if (d.length === 1 && d[0].error && d[0].error.type === 101) {
            console.log("ALERT: press connect button! @todo");
          } else if (d.length > 0 && d[0].success && d[0].success.username) {
            initialize(
              state.ip,
              d[0].success.username,
              "hue-react#" + state.UID
            );
            onClose();
          } else {
            console.error("unknown case @todo", d);
          }
        });
    }
    if (state.step === Steps.START) {
      next();
    }
    if (state.step === Steps.CONSENT) {
      next();
    }
    if (state.step === Steps.BRIDGE) {
      next();
    }
  }, [state, initialize]);

  if (baseUrl) {
    return null;
  }

  const Content = () => {
    if (state.step === Steps.START) {
      return (
        <Typography>Press Continue to start the Connection Wizard.</Typography>
      );
    }
    if (state.step === Steps.CONSENT) {
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
                checked={state.consent}
                onChange={(e, v) => setState({ ...state, consent: v })}
                name="consent"
              />
            }
            label="Allow Data Storage"
          />
        </>
      );
    }
    if (state.step === Steps.BRIDGE) {
      return (
        <>
          <TextField
            label=""
            value={state.ip}
            variant="outlined"
            onChange={(e) => setState({ ...state, ip: e.target.value })}
          />
          <FormHelperText>
            Enter the IP address of the Hue Bridge on your local network. Make
            sure your device is connected to the same network.
          </FormHelperText>
        </>
      );
    }
    if (state.step === Steps.CONNECT) {
      return (
        <>
          <Typography>
            Now press the "Connect" hardware button on your Hue Bridge, then
            press "Finish" below.
          </Typography>
          <Typography>
            This will request permissions for this app (
            <i> react-app-{state.UID} </i>) in your Hue Bridge.
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
      open={state.open}
      id="ringtone-menu"
      keepMounted
      classes={classes}
    >
      <DialogTitle id="confirmation-dialog-title">{getTitle()}</DialogTitle>
      <DialogContent dividers>
        <Content />
      </DialogContent>
      <DialogActions>
        <Button
          disabled={!state.consent && state.step === Steps.CONSENT}
          onClick={handleOk}
          color="primary"
        >
          {state.step === Steps.CONNECT ? "Finish" : "Continue"}
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
