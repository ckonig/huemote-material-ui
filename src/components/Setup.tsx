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
import { useCallback, useEffect, useState } from "react";
import generateUID from "../helpers/generateUID";
import { getStepTitle, Steps } from "./useSteps";
import { useBridgeDiscovery } from "../queries/useBridgeDiscovery";
import useConnection from "../queries/useConnection";

export default function ConfirmationDialog() {
  const { baseUrl, initialize } = useConnection();

  const [state, setState] = useState({
    open: true,
    step: Steps.START,
    UID: generateUID(),
    ip: "",
    consent: false,
  });

  useEffect(() => {
    if (!baseUrl && !state.open) {
      setState({ ...state, step: Steps.START, open: true });
    }
  }, [baseUrl, state]);

  const classes = {
    paper: useStyles().paper,
  };

  const bridges = useBridgeDiscovery();
  useEffect(() => {
    if (
      state.open &&
      state.step === Steps.BRIDGE &&
      !state.ip &&
      !baseUrl &&
      !bridges.isFetched
    ) {
      bridges.refetch();
      if (
        bridges.isSuccess &&
        bridges.data?.length &&
        bridges.data[0].internalipaddress
      ) {
        setState({
          ...state,
          ip: bridges.data[0].internalipaddress || "could not retrieve",
        });
      }
    }
  }, [state, baseUrl, bridges]);

  const getTitle = useCallback(() => {
    return getStepTitle(state.step);
  }, [state.step]);

  const handleOk = useCallback(() => {
    const onClose = () => setState({ ...state, open: false });
    const next = () => setState({ ...state, step: state.step + 1 });
    //@todo move to API
    if (state.step === Steps.CONNECT && state.consent && state.ip) {
      fetch(`http://${state.ip}/api`, {
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
    if (state.step === Steps.CONSENT && state.consent) {
      next();
    }
    if (state.step === Steps.BRIDGE && state.ip) {
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
