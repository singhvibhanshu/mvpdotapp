import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function authMiddleware(req:Request, res:Response, next:NextFunction) {
    const token = req.headers.authorization;
    if(!token) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_PUBLIC_KEY);
    if(!decoded) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    req.userId = decoded.sub;
    next();
}