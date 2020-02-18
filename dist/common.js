"use strict";
exports.__esModule = true;
exports.getProtocal = function (loc) {
    // Protocol may or may not contain a colon
    var protocol = loc.protocol;
    if (protocol.slice(-1) !== ":") {
        protocol += ":";
    }
    return protocol;
};
exports.getPath = function (loc) {
    var _loc = window.location;
    var protocol = exports.getProtocal(_loc);
    return protocol + "//" + _loc.host + loc.pathname;
};
