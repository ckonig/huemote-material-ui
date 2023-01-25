export const Steps = {
  START: 0,
  CONSENT: 1,
  BRIDGE: 2,
  CONNECT: 3,
};

//@todo move to ui
export const getStepTitle = (step: number) => {
  if (step === Steps.START) {
    return "Setup";
  }
  if (step === Steps.CONSENT) {
    return "Data Storage";
  }
  if (step === Steps.BRIDGE) {
    return "Hue Bridge";
  }
  if (step === Steps.CONNECT) {
    return "Finish";
  }
  return null;
};
