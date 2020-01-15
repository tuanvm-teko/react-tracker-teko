interface InitContructor {
    appId: string;
    host: string;
    urlServeJsFile: string;
}
declare class ReactTracker {
    private previousPath;
    private unlistenFromHistory;
    private protocol;
    constructor(setupOptions: InitContructor);
    connectToHistory(history: any): any;
    disconnectFromHistory(): boolean;
    track(loc: any): void;
    private initProtocal;
    private getPath;
}
export default ReactTracker;
