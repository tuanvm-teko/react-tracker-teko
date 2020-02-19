import * as React from "react";
import { useEffect, useState } from "react";
import TrackerContext from "./TrackerContext";
import { getPath } from "./common";
var mPrevLoc;
export var TrackerProvider = function (_a) {
    var children = _a.children, history = _a.history;
    var Context = TrackerContext;
    var _b = useState(history.location), loc = _b[0], setLoc = _b[1];
    useEffect(function () {
        var unregister = history.listen(function (newLoc) {
            setLoc(newLoc);
        });
        return function () {
            unregister();
        };
    });
    var callTrackLoadPage = function (props) {
        var previousPath = getPath(mPrevLoc || loc);
        var currentPath = getPath(loc);
        window.track("setReferrerUrl", previousPath);
        window.track("setCurrentUrl", currentPath);
        window.track("trackLoadPageView", props);
        mPrevLoc = loc;
    };
    var callTrackUnLoadPage = function (props) {
        var previousPath = getPath(mPrevLoc || loc);
        window.track("setCurrentUrl", previousPath);
        window.track("trackUnLoadPageView", props);
    };
    return (React.createElement(Context.Provider, { value: { callTrackLoadPage: callTrackLoadPage, callTrackUnLoadPage: callTrackUnLoadPage } }, children));
};
//# sourceMappingURL=TrackerProvider.js.map