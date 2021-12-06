import { Request, Response, NextFunction } from "express";

export default (req: Request, res: Response, next: NextFunction)=>{
    console.log(`URL: [ ${req.url} ], IP: [ ${req.ip} ], TIMESTAMP: [ ${Date.now()} ]`);
    next();
}
