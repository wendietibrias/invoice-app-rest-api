import { Request,Response,NextFunction } from "express";
import jwt , { JwtPayload } from "jsonwebtoken";
import ResponseError from "../utils/ResponseError";
import { IRequest } from "../interfaces/ExpressInterface";
import {  findUserById } from "../schemas/User";

const CheckIfAuthenticated = (req : IRequest  , res : Response , next : NextFunction) => {
   const token : string | undefined = req.headers.authorization;

   if(token) {
       const actualToken = token.split(" ")[1];

       
       return  jwt.verify(actualToken, `${process.env.SECRET_JWT}` , { algorithms:["HS256"] } , async (err,decoded : any) => {

            if(err) {
                return ResponseError(500 , res, err.message);
            }
            
            const findUser = await findUserById(decoded?._id);

            if(!findUser) {
                return ResponseError(401 , res, "Access denied!");
            }

            req.userId = decoded?._id;
            return next();
       });
   }

   return ResponseError(401, res, "Unauthorized");
}

export default CheckIfAuthenticated;