//https://stackoverflow.com/a/6248722/1216242

function generateUID() {
  // I generate the UID from two parts here
  // to ensure the random number provide enough bits.
  const random = () => window.crypto.getRandomValues(new Uint32Array(1))[0];
  let one = (random() * 46656) | 0;
  let two = (random() * 46656) | 0;
  let firstPart = ("000" + one.toString(36)).slice(-3);
  let secondPart = ("000" + two.toString(36)).slice(-3);
  return firstPart + "" + secondPart;
}
export default generateUID;
