import {Request, Response, NextFunction} from "express";

export default function (fn: (req: Request, res: Response, next: NextFunction) => any){
    return (req: Request, res: Response, next: NextFunction) => {
        fn(req, res, next)
            .catch(next);
    }
}
