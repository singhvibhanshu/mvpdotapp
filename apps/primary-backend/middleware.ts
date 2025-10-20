import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { use } from "react";

export function authMiddleware(req:Request, res:Response, next:NextFunction) {
    const token = req.headers.authorization;
    if(!token) {
        res.status(401).json({ error: "Unauthorized" });
        return;
    }

    const decoded = jwt.verify(token, process.env.JWT_PUBLIC_KEY!, { algorithms: ["RS256"] });
    if(!decoded) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }

    const userId = (decoded as any).payload.sub;

    if(!userId) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }

    req.userId = userId;
    next();
}