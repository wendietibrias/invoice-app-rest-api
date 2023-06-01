import { Express ,Request } from "express"

declare module Express {
    export interface AuthRequest extends Request {
        userId?:string
    }
}