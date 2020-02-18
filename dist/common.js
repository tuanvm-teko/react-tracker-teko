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
//# sourceMappingURL=common.js.map