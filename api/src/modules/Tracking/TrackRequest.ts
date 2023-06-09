import { Request } from "express";

export const recordToLargeLog = async (req : Request, result : any) => {
    if(!await req.redis.exists("all")) {
        await req.redis.json.set("all", ".", {
            requests: []
        });
    }

    await req.redis.json.arrAppend(
        "all", 
        ".requests", 
        {
            by: req.tracking,
            path: req.path,
            request: req.body,
            result
        }
    );
} 

export const recordRequest = async (req : Request, result : any) => {
    if(!await req.redis.exists(`users.${req.tracking}`)) {
        await req.redis.json.set(`users.${req.tracking}`, ".", {
            requests: []
        });
    }

    await req.redis.json.arrAppend(
        `${req.tracking}`, 
        ".requests", 
        {
            path: req.path,
            request: req.body,
            result
        }
    );
}