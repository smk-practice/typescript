"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var $ = require("jquery");
var showMessage = function (message, displaySelector) {
    if ((displaySelector !== null) && ($(displaySelector).length !== 0))
        $(displaySelector).text(message);
    else
        console.log(message);
};
exports.Lib = {
    showMessage: showMessage
};
exports.default = exports.Lib;
