import * as React from "react";
import { useEffect, useState } from "react";
import TrackerContext from "./TrackerContext";
import { getPropsPageView, getFullPath } from "./common";
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
        var previousFullPath = getFullPath(mPrevLoc || loc);
        var currentFullPath = getFullPath(loc);
        window.track("setReferrerUrl", previousFullPath);
        window.track("setCurrentUrl", currentFullPath);
        window.track("trackLoadPageView", getPropsPageView(currentFullPath, props));
        mPrevLoc = loc;
    };
    var callTrackUnLoadPage = function (props) {
        var previousFullPath = getFullPath(mPrevLoc || loc);
        window.track("setCurrentUrl", previousFullPath);
        window.track("trackUnLoadPageView", getPropsPageView(previousFullPath, props));
    };
    return (React.createElement(Context.Provider, { value: { callTrackLoadPage: callTrackLoadPage, callTrackUnLoadPage: callTrackUnLoadPage } }, children));
};
//# sourceMappingURL=TrackerProvider.js.map