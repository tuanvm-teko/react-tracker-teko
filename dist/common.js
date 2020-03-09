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
export var getFullPath = function (loc) {
    var windowLoc = window.location;
    return getProtocal(windowLoc) + "//" + windowLoc.host + loc.pathname + loc.search + loc.hash;
};
export var getPropsPageView = function (path, props) { return (__assign({}, (!props
    ? { pageCode: path }
    : __assign(__assign({}, props), (!props.pageCode ? { pageCode: path } : {}))))); };
//# sourceMappingURL=common.js.map