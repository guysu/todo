import jwt = require("jsonwebtoken");
const uuid = require("uuid");
import { Request, Response, NextFunction } from "express";

export interface UserAuthRequest extends Request {
    userId: string;
}

const secret = "WowWhatASecret";

const getAccessToken = (req: Request) => req.cookies.accessToken;

export const authenticateToken = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    let accessToken = getAccessToken(req);
    jwt.verify(accessToken, secret, (err: any, user: any) => {
        if (err) {
            return res.sendStatus(403);
        }
        (req as UserAuthRequest).userId = user.userId;
    });
    next();
};

export const createToken = async (req: Request, res: Response) => {
    let accessToken = getAccessToken(req);
    if (!accessToken) {
        const userId = uuid.v4();
        accessToken = await jwt.sign({ userId }, secret);
        res.cookie("accessToken", accessToken, { httpOnly: true });
    }
};
