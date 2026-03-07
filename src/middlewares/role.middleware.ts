import type {Response,Request, NextFunction, RequestHandler} from "express";
import type { AuthRequest } from "../types/authRequest.js";

const authorize = (...allowedRoles:string[]): RequestHandler => {
    return (req:any,res:Response,next:NextFunction) => {
        const user=(req as AuthRequest).user;

        if(!user){
            return res.status(401).json({message:"Unauthorized"});
        }
        if(!allowedRoles.includes(user.role)){
            return res.status(403).json({message:"Forbidden"});
        }

        next();
    };
};

export default authorize;