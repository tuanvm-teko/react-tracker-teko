import * as React from "react";
import { Instance } from "./TrackerProvider";
export const TrackerContext = React.createContext<Instance>({
  callTrackLoadPage: () => {},
  callTrackUnLoadPage: () => {}
});

export default TrackerContext;
