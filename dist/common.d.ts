import { UseTrackPageViewT } from "./types";
import { Location } from "history";
export declare const getProtocal: (loc: any) => any;
export declare const getPath: (loc: any) => string;
export declare const getFullPath: (loc: Location<{} | null | undefined>) => string;
export declare const getPropsPageView: (path: string, props?: UseTrackPageViewT | undefined) => {
    pageCode?: string | undefined;
    sku?: string | undefined;
};
