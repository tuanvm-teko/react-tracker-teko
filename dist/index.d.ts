import { InitContructor } from "./types";
declare class ReactTracker {
    private previousPath;
    private unlistenFromHistory;
    private history;
    constructor(setupOptions: InitContructor);
    connectToHistory(history: any): any;
    disconnectFromHistory(): boolean;
    private registerListener;
    private track;
}
export * from "./hooks";
export default ReactTracker;
