import { Checkbox, FormHelperText, TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useCallback, useEffect, useState } from "react";
import generateUID from "../../helpers/generateUID";
import { getStepTitle, Steps } from "./useSteps";
import { useBridgeDiscovery } from "../../queries/useBridgeDiscovery";
import useConnection from "../../queries/useConnection";
//@todo figure out absolute paths
import useApi from "../../clip/v1/api";

export default function ConfirmationDialog() {
  const { connected, initialize } = useConnection();
  const api = useApi();

  const [state, setState] = useState({
    open: true,
    step: Steps.START,
    UID: generateUID(),
    ip: "",
    consent: false,
  });

  //@todo move state machine and logic to domain layer
  //domain has api too (need better name than api tho)
  //it can be connected or not yet
  //if connected it initialized and exposes the useQuery hooks (from separate hook)
  //if not connected it exposes the setup state & step (from separate hook)
  //domain api recognizes once setup is finished and switches state
  useEffect(() => {
    if (!connected && !state.open) {
      setState({ ...state, step: Steps.START, open: true });
    }
  }, [connected, state]);

  const bridges = useBridgeDiscovery();
  useEffect(() => {
    if (
      state.open &&
      state.step === Steps.BRIDGE &&
      !state.ip &&
      !connected &&
      !bridges.isFetched
    ) {
      //@todo this call is async and will trigger state updates
      bridges.refetch();
      //@todo following code is executed too early
      if (
        bridges.isSuccess &&
        bridges.data?.length &&
        bridges.data[0].internalipaddress
      ) {
        setState({
          ...state,
          ip: bridges.data[0].internalipaddress,
        });
      }
    }
  }, [state, connected, bridges]);

  const getTitle = useCallback(() => {
    return getStepTitle(state.step);
  }, [state.step]);

  const handleOk = useCallback(() => {
    const onClose = () => setState({ ...state, open: false });
    const next = () => setState({ ...state, step: state.step + 1 });
    if (state.step === Steps.CONNECT && state.consent && state.ip) {
      api.connect(state.ip, state.UID).then((d) => {
        if (d.length === 1 && d[0].error && d[0].error.type === 101) {
          //@todo throw and handle in UI
          console.log("ALERT: press connect button! @todo");
        } else if (d.length > 0 && d[0].success && d[0].success.username) {
          initialize(state.ip, d[0].success.username, "hue-react#" + state.UID);
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
  }, [state, api, initialize]);

  if (connected) {
    return null;
  }

  const Content = () => {
    //@todo move to separate component
    if (state.step === Steps.START) {
      return (
        <Typography>Press Continue to start the Connection Wizard.</Typography>
      );
    }
    //@todo move to separate component
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
    //@todo move to separate component
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
    //@todo move to separate component
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
      aria-labelledby="confirmation-dialog-title"
      open={state.open}
      id="ringtone-menu"
      keepMounted
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
