import { InitContructor } from "./types";
declare class ReactTracker {
    private previousPath;
    private unlistenFromHistory;
    constructor(setupOptions: InitContructor);
    connectToHistory(history: any): any;
    disconnectFromHistory(): boolean;
    private track;
}
export default ReactTracker;
