import { randomBytes } from "crypto";
import { NextFunction, Request, Response } from "express";

export const TrackingMiddleware = async (req : Request, res : Response, next : NextFunction) => {
    req.tracking = await getCookie(req, res);
    req.userid = req.signedCookies["userid"] as string | undefined;
    next();
}

async function getCookie(req : Request, res : Response) {
    let cookie = req.signedCookies["tracker"];
    if(!cookie) {
        cookie = randomBytes(20).toString("hex");
        res.cookie("tracker", cookie, {
            signed: true,
            expires: new Date(9999, 1),
            sameSite: 'none',
            path: process.env.NODE_ENV === "development" ? "/" : "/codex"
        });
    }

    return cookie as string;
}