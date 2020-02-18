import * as React from "react";
import { UseTrackPageViewT } from "./index";
import { History } from "history";
export interface Instance {
    callTrackLoadPage: (props?: UseTrackPageViewT) => void;
    callTrackUnLoadPage: (props?: UseTrackPageViewT) => void;
}
interface PropsT {
    children: React.ReactNode;
    history: History<any>;
}
export declare const TrackerProvider: React.FC<PropsT>;
export {};
