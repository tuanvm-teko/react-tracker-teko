/// <reference types="react" />
import { History } from "history";
export interface PropsProviderT {
    children: React.ReactNode;
    history: History<any>;
}
export interface InitContructor {
    appId: string;
    host: string;
    urlServeJsFile: string;
}
export interface UseTrackPageViewT {
    pageCode?: string;
}
export interface Instance {
    callTrackLoadPage: (props?: UseTrackPageViewT) => void;
    callTrackUnLoadPage: (props?: UseTrackPageViewT) => void;
}
