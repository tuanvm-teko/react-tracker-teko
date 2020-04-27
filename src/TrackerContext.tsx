import * as React from "react";
import { Instance } from "./types";
export const TrackerContext = React.createContext<Instance>({
  callTrackLoadPage: () => {},
  callTrackUnLoadPage: () => {},
});

export default TrackerContext;
