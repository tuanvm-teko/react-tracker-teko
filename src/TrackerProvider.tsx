import * as React from "react";
import { useEffect, useState } from "react";
import TrackerContext from "./TrackerContext";
import { getPropsPageView, getFullPath } from "./common";
import { PropsProviderT, UseTrackPageViewT } from "./types";

let mPrevLoc: any;

export const TrackerProvider: React.FC<PropsProviderT> = ({
  children,
  history
}) => {
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

  const callTrackLoadPage = (props?: UseTrackPageViewT) => {
    const previousFullPath = getFullPath(mPrevLoc || loc);
    const currentFullPath = getFullPath(loc);

    (window as any).track("setReferrerUrl", previousFullPath);
    (window as any).track("setCurrentUrl", currentFullPath);
    (window as any).track(
      "trackLoadPageView",
      getPropsPageView(currentFullPath, props)
    );
    mPrevLoc = loc;
  };

  const callTrackUnLoadPage = (props?: UseTrackPageViewT) => {
    const previousFullPath = getFullPath(mPrevLoc || loc);
    (window as any).track("setCurrentUrl", previousFullPath);
    (window as any).track(
      "trackUnLoadPageView",
      getPropsPageView(previousFullPath, props)
    );
  };

  return (
    <Context.Provider value={{ callTrackLoadPage, callTrackUnLoadPage }}>
      {children}
    </Context.Provider>
  );
};
