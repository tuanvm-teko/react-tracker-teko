import TrackerContext from "./TrackerContext";
import { UseTrackPageViewT, Instance } from "./types";
import { useContext, useEffect } from "react";

export const useAutoPageView = (props?: UseTrackPageViewT) => {
  const { callTrackLoadPage, callTrackUnLoadPage }: Instance = useContext(
    TrackerContext
  );
  useEffect(() => {
    callTrackLoadPage(props);
    return () => {
      callTrackUnLoadPage(props);
    };
  }, []);
};

export const useTrackPageView = () => {
  const { callTrackLoadPage, callTrackUnLoadPage }: Instance = useContext(
    TrackerContext
  );

  return {
    callTrackLoadPage,
    callTrackUnLoadPage
  };
};
export * from "./TrackerContext";
export * from "./TrackerProvider";
