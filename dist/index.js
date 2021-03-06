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
import { getPath, getFullPath } from "./common";
var defaultOptions = {
    host: "https://dev-tracking.teko.vn",
    urlServeJsFile: "https://dev-tracking.teko.vn/track/libs/tracker.full.min.js",
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
        f[i]("exception", { msg: msg, error: error });
        return false;
    };
};
var ReactTracker = /** @class */ (function () {
    function ReactTracker(setupOptions) {
        var _this = this;
        this.registerListener = function (history) {
            var prevLoc = typeof history.getCurrentLocation === "undefined"
                ? history.location
                : history.getCurrentLocation();
            _this.previousPath = getPath(prevLoc);
            _this.previousFullPath = getFullPath(prevLoc);
            window.track("setReferrerUrl", _this.previousFullPath);
            window.track("trackLoadPageView");
            _this.unlistenFromHistory = history.listen(function (loc) {
                _this.track(loc);
            });
        };
        var options = __assign(__assign({}, defaultOptions), setupOptions);
        var host = options.host, urlServeJsFile = options.urlServeJsFile;
        init(window, document, "script", urlServeJsFile, "track", host);
        if (options.appId) {
            window.track("init", options.appId);
        }
    }
    ReactTracker.prototype.connectToHistory = function (history) {
        if (this.history) {
            return history;
        }
        window.track("enableUnloadPageView");
        this.history = history;
        this.registerListener(history);
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
        var currentFullPath = getFullPath(loc);
        if (this.previousPath === currentPath) {
            return;
        }
        window.track("setCurrentUrl", this.previousFullPath);
        window.track("trackUnLoadPageView");
        window.track("setReferrerUrl", this.previousFullPath);
        window.track("setCurrentUrl", currentFullPath);
        window.track("trackLoadPageView");
        this.previousPath = currentPath;
    };
    return ReactTracker;
}());
export * from "./hooks";
export default ReactTracker;
//# sourceMappingURL=index.js.map