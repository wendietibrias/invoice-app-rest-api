
import { Response } from "express";

function ResponseSuccess(httpCode : number, res : Response , message : string) {
     return res.status(200).json({
          status:httpCode,
          message,
          request_time:new Date().toDateString()
     })
}

export default ResponseSuccess;