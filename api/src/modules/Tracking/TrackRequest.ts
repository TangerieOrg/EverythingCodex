import { Request } from "express";

export const recordRequest = async (req : Request, result : any) => {
    if(!await req.redis.exists(`${req.tracking}`)) {
        await req.redis.json.set(`${req.tracking}`, ".", {
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