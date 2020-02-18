import { UseTrackPageViewT } from "./types";
export declare const useAutoPageView: (props?: UseTrackPageViewT | undefined) => void;
export declare const useTrackPageView: () => {
    callTrackLoadPage: (props?: UseTrackPageViewT | undefined) => void;
    callTrackUnLoadPage: (props?: UseTrackPageViewT | undefined) => void;
};
export * from "./TrackerContext";
export * from "./TrackerProvider";
