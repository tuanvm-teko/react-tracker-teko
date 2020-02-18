import * as React from "react";
import { useEffect, useState } from "react";
import TrackerContext from "./TrackerContext";
import { getPath } from "./index";
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
    var callTrackLoadPage = function () {
        var previousPath = getPath(mPrevLoc || loc);
        var currentPath = getPath(loc);
        window.track("setReferrerUrl", previousPath);
        window.track("setCurrentUrl", currentPath);
        window.track("trackLoadPageView");
        mPrevLoc = loc;
    };
    var callTrackUnLoadPage = function () {
        var previousPath = getPath(mPrevLoc || loc);
        window.track("setCurrentUrl", previousPath);
        window.track("trackUnLoadPageView");
    };
    return (<Context.Provider value={{ callTrackLoadPage: callTrackLoadPage, callTrackUnLoadPage: callTrackUnLoadPage }}>
      {children}
    </Context.Provider>);
};
//# sourceMappingURL=TrackerProvider.jsx.map