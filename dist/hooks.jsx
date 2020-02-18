"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
exports.__esModule = true;
var TrackerContext_1 = require("./TrackerContext");
var react_1 = require("react");
exports.useAutoPageView = function (props) {
    var _a = react_1.useContext(TrackerContext_1["default"]), callTrackLoadPage = _a.callTrackLoadPage, callTrackUnLoadPage = _a.callTrackUnLoadPage;
    react_1.useEffect(function () {
        callTrackLoadPage(props);
        return function () {
            callTrackUnLoadPage(props);
        };
    }, []);
};
exports.useTrackPageView = function () {
    var _a = react_1.useContext(TrackerContext_1["default"]), callTrackLoadPage = _a.callTrackLoadPage, callTrackUnLoadPage = _a.callTrackUnLoadPage;
    return {
        callTrackLoadPage: callTrackLoadPage,
        callTrackUnLoadPage: callTrackUnLoadPage
    };
};
__export(require("./TrackerContext"));
__export(require("./TrackerProvider"));
