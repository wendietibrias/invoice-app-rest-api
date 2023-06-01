import { Response,Request } from "express";

function ResponseError(httpCode : number, res : Response, message : string) {
    return res.status(httpCode).json({
        message,
        status:httpCode,
        request_time:new Date().toDateString()
    });
}

export default ResponseError;