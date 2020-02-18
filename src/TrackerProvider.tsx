import * as React from "react";
import { useEffect, useState } from "react";
import TrackerContext from "./TrackerContext";
import { getPath, UseTrackPageViewT } from "./index";
import { History } from "history";

export interface Instance {
  callTrackLoadPage: (props?: UseTrackPageViewT) => void;
  callTrackUnLoadPage: (props?: UseTrackPageViewT) => void;
}
interface PropsT {
  children: React.ReactNode;
  history: History<any>;
}

let mPrevLoc: any;

export const TrackerProvider: React.FC<PropsT> = ({ children, history }) => {
  const Context = TrackerContext;
  const [loc, setLoc] = useState(history.location);
  useEffect(() => {
    const unregister = history.listen((newLoc) => {
      setLoc(newLoc);
    });

    return () => {
      unregister();
    };
  });

  const callTrackLoadPage = () => {
    const previousPath = getPath(mPrevLoc || loc);
    const currentPath = getPath(loc);

    (window as any).track("setReferrerUrl", previousPath);
    (window as any).track("setCurrentUrl", currentPath);
    (window as any).track("trackLoadPageView");
    mPrevLoc = loc;
  };

  const callTrackUnLoadPage = () => {
    const previousPath = getPath(mPrevLoc || loc);
    (window as any).track("setCurrentUrl", previousPath);
    (window as any).track("trackUnLoadPageView");
  };

  return (
    <Context.Provider value={{ callTrackLoadPage, callTrackUnLoadPage }}>
      {children}
    </Context.Provider>
  );
};
