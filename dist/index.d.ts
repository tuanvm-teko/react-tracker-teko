interface InitContructor {
    appId: string;
    host: string;
    urlServeJsFile: string;
}
export declare const getProtocal: (loc: any) => any;
export declare const getPath: (loc: any) => string;
declare class ReactTracker {
    private previousPath;
    private unlistenFromHistory;
    constructor(setupOptions: InitContructor);
    connectToHistory(history: any): any;
    disconnectFromHistory(): boolean;
    private track;
}
export interface UseTrackPageViewT {
    pageCode?: string;
}
export declare const useAutoPageView: (props?: UseTrackPageViewT | undefined) => void;
export declare const useTrackPageView: () => {
    callTrackLoadPage: (props?: UseTrackPageViewT | undefined) => void;
    callTrackUnLoadPage: (props?: UseTrackPageViewT | undefined) => void;
};
export * from "./TrackerContext";
export * from "./TrackerProvider";
export default ReactTracker;
