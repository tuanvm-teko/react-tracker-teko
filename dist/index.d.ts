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
    private protocol;
    constructor(setupOptions: InitContructor);
    connectToHistory(history: any): any;
    disconnectFromHistory(): boolean;
    private track;
    private setProtocal;
}
export interface UseTrackPageViewT {
    pageCode?: string;
}
export declare const useAutoPageView: (props?: UseTrackPageViewT) => void;
export declare const useTrackPageView: () => {
    callTrackLoadPage: any;
    callTrackUnLoadPage: any;
};
export * from "./TrackerContext";
export * from "./TrackerProvider";
export default ReactTracker;
