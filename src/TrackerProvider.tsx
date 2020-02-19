import * as React from "react";
import { useEffect, useState } from "react";
import TrackerContext from "./TrackerContext";
import { getPath, getPropsPageView } from "./common";
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
    const previousPath = getPath(mPrevLoc || loc);
    const currentPath = getPath(loc);

    (window as any).track("setReferrerUrl", previousPath);
    (window as any).track("setCurrentUrl", currentPath);
    (window as any).track(
      "trackLoadPageView",
      getPropsPageView(currentPath, props)
    );
    mPrevLoc = loc;
  };

  const callTrackUnLoadPage = (props?: UseTrackPageViewT) => {
    const previousPath = getPath(mPrevLoc || loc);
    (window as any).track("setCurrentUrl", previousPath);
    (window as any).track(
      "trackUnLoadPageView",
      getPropsPageView(previousPath, props)
    );
  };

  return (
    <Context.Provider value={{ callTrackLoadPage, callTrackUnLoadPage }}>
      {children}
    </Context.Provider>
  );
};
