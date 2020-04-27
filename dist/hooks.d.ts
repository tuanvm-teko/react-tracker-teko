import { UseTrackPageViewT } from "./types";
export declare const useAutoPageView: (props: UseTrackPageViewT) => void;
export declare const useTrackPageView: () => {
    callTrackLoadPage: (props: UseTrackPageViewT) => void;
    callTrackUnLoadPage: (props: UseTrackPageViewT) => void;
};
export * from "./TrackerContext";
export * from "./TrackerProvider";
