export const getProtocal = (loc: any) => {
  // Protocol may or may not contain a colon
  let protocol = loc.protocol;
  if (protocol.slice(-1) !== ":") {
    protocol += ":";
  }

  return protocol;
};

export const getPath = (loc: any) => {
  const _loc = window.location;
  const protocol = getProtocal(_loc);
  return protocol + "//" + _loc.host + loc.pathname;
};
