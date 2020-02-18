"use strict";
exports.__esModule = true;
var React = require("react");
var react_1 = require("react");
var TrackerContext_1 = require("./TrackerContext");
var index_1 = require("./index");
var mPrevLoc;
exports.TrackerProvider = function (_a) {
    var children = _a.children, history = _a.history;
    var Context = TrackerContext_1["default"];
    var _b = react_1.useState(history.location), loc = _b[0], setLoc = _b[1];
    react_1.useEffect(function () {
        var unregister = history.listen(function (newLoc) {
            setLoc(newLoc);
        });
        return function () {
            unregister();
        };
    });
    var callTrackLoadPage = function () {
        var previousPath = index_1.getPath(mPrevLoc || loc);
        var currentPath = index_1.getPath(loc);
        window.track("setReferrerUrl", previousPath);
        window.track("setCurrentUrl", currentPath);
        window.track("trackLoadPageView");
        mPrevLoc = loc;
    };
    var callTrackUnLoadPage = function () {
        var previousPath = index_1.getPath(mPrevLoc || loc);
        window.track("setCurrentUrl", previousPath);
        window.track("trackUnLoadPageView");
    };
    return (<Context.Provider value={{ callTrackLoadPage: callTrackLoadPage, callTrackUnLoadPage: callTrackUnLoadPage }}>
      {children}
    </Context.Provider>);
};
