import type {Request,Response,NextFunction, RequestHandler} from "express"
import type { AuthRequest} from "../types/authRequest.js";
import jwt from "jsonwebtoken";

export const authMiddleware: RequestHandler = (req:any, res:Response, next:NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: "Authorization header missing" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const secret = process.env.JWT_SECRET_KEY as string;
        const decoded = jwt.verify(token, secret) as { id: string; role: "ADMIN" | "USER"; };
        (req as AuthRequest).user = decoded;
        next();
    }
    catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
};

export default authMiddleware;