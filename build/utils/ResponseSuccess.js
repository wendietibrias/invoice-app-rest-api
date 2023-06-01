"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function ResponseSuccess(httpCode, res, message) {
    return res.status(200).json({
        status: httpCode,
        message,
        request_time: new Date().toDateString()
    });
}
exports.default = ResponseSuccess;
