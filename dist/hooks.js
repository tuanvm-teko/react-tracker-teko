import TrackerContext from "./TrackerContext";
import { useContext, useEffect } from "react";
export var useAutoPageView = function (props) {
    var _a = useContext(TrackerContext), callTrackLoadPage = _a.callTrackLoadPage, callTrackUnLoadPage = _a.callTrackUnLoadPage;
    useEffect(function () {
        callTrackLoadPage(props);
        return function () {
            callTrackUnLoadPage(props);
        };
    }, []);
};
export var useTrackPageView = function () {
    var _a = useContext(TrackerContext), callTrackLoadPage = _a.callTrackLoadPage, callTrackUnLoadPage = _a.callTrackUnLoadPage;
    return {
        callTrackLoadPage: callTrackLoadPage,
        callTrackUnLoadPage: callTrackUnLoadPage,
    };
};
export * from "./TrackerContext";
export * from "./TrackerProvider";
//# sourceMappingURL=hooks.js.map