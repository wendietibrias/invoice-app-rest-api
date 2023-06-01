"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function ResponseError(httpCode, res, message) {
    return res.status(httpCode).json({
        message,
        status: httpCode,
        request_time: new Date().toDateString()
    });
}
exports.default = ResponseError;
