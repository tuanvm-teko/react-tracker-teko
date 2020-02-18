var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { useContext, useEffect } from "react";
import TrackerContext from "./TrackerContext";
var defaultOptions = {
    host: "https://dev-tracking.teko.vn",
    urlServeJsFile: "https://dev-tracking.teko.vn/track/libs/tracker-v1.0.0.full.min.js"
};
var init = function (f, b, e, v, i, r, t, s) {
    // Stop if tracker already exists
    if (f[i])
        return;
    // Initialise the 'GlobalTrackerNamespace' array
    f["GlobalTrackerNamespace"] = f["GlobalTrackerNamespace"] || [];
    // Add the new Tracker namespace to the global array so tracker.js can find it
    f["GlobalTrackerNamespace"].push(i);
    // Add endpoint
    f["GlobalTrackerNamespace"].push(r);
    // Create the Snowplow function
    f[i] = function () {
        (f[i].q = f[i].q || []).push(arguments);
    };
    // Initialise the asynchronous queue
    f[i].q = f[i].q || [];
    // Create a new script element
    t = b.createElement(e);
    // The new script should load asynchronously
    t.async = !0;
    // Load Tracker-js
    t.src = v;
    // Get the first script on the page
    s = b.getElementsByTagName(e)[0];
    // Insert the Snowplow script before every other script so it executes as soon as possible
    s.parentNode.insertBefore(t, s);
    // add listener error
    // @ts-ignore
    window.onerror = function (msg, url, lineNo, columnNo, error) {
        f[i]("error", { msg: msg, error: error });
        return false;
    };
};
export var getProtocal = function (loc) {
    // Protocol may or may not contain a colon
    var protocol = loc.protocol;
    if (protocol.slice(-1) !== ":") {
        protocol += ":";
    }
    return protocol;
};
export var getPath = function (loc) {
    var _loc = window.location;
    var protocol = getProtocal(_loc);
    return protocol + "//" + _loc.host + loc.pathname;
};
var ReactTracker = /** @class */ (function () {
    function ReactTracker(setupOptions) {
        var options = __assign({}, defaultOptions, setupOptions);
        var host = options.host, urlServeJsFile = options.urlServeJsFile;
        init(window, document, "script", urlServeJsFile, "track", host);
        if (options.appId) {
            window.track("init", options.appId);
        }
        window.track("enableUnloadPageView");
    }
    ReactTracker.prototype.connectToHistory = function (history) {
        var _this = this;
        var prevLoc = typeof history.getCurrentLocation === "undefined"
            ? history.location
            : history.getCurrentLocation();
        this.previousPath = getPath(prevLoc);
        window.track("setReferrerUrl", this.previousPath);
        window.track("trackLoadPageView");
        this.unlistenFromHistory = history.listen(function (loc) {
            _this.track(loc);
        });
        return history;
    };
    ReactTracker.prototype.disconnectFromHistory = function () {
        if (this.unlistenFromHistory) {
            this.unlistenFromHistory();
            return true;
        }
        return false;
    };
    ReactTracker.prototype.track = function (loc) {
        if (typeof window === "undefined") {
            return;
        }
        var currentPath = getPath(loc);
        if (this.previousPath === currentPath) {
            return;
        }
        window.track("setCurrentUrl", this.previousPath);
        window.track("trackUnLoadPageView");
        window.track("setReferrerUrl", this.previousPath);
        window.track("setCurrentUrl", currentPath);
        window.track("trackLoadPageView");
        this.previousPath = currentPath;
    };
    return ReactTracker;
}());
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
        callTrackUnLoadPage: callTrackUnLoadPage
    };
};
export * from "./TrackerContext";
export * from "./TrackerProvider";
export default ReactTracker;
//# sourceMappingURL=index.jsx.map