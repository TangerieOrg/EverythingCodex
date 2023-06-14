import { Request } from "express";
import { HistoryResponse, RequestInfo } from "./types";
import { getTS } from "./Util";
import { at, omit } from "lodash";
import { minmax } from "@modules/Util";

const baseUserStr = (req : Request) => `users.${req.tracking}`;

export const recordToLargeLog = async (req : Request, info : RequestInfo) => {
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
            ...info
        }
    );
} 

const recordPrompt = async (req : Request, prompt : string, result : any) => {
    const startKey = "prompts";
    const path = `$.${req.path.slice(1)}`;
    if(!await req.redis.exists(startKey)) {
        await req.redis.json.set(startKey, ".", {});
        
    }
    
    if((await req.redis.json.type(startKey, path))?.at(0) == undefined) {
        await req.redis.json.set(startKey, path, []);
    }

    await req.redis.json.arrAppend(
        startKey, 
        path, 
        { prompt, result }
    );
}

export const recordRequest = async (req : Request, prompt : string, result : any) => {
    const startKey = baseUserStr(req);
    if(!await req.redis.exists(startKey)) {
        await req.redis.json.set(startKey, ".", {
            requests: []
        });
    }

    const info : RequestInfo = {
        path: req.path,
        request: req.body,
        result,
        ts: getTS()
    }

    await req.redis.json.arrAppend(
        startKey, 
        ".requests", 
        info as any
    );

    await recordToLargeLog(req, info);
    await recordPrompt(req, prompt, result);
}

export const getHistory = async (req : Request, offset : number, limit : number) : Promise<HistoryResponse> => {
    const startKey = baseUserStr(req);
    if(!await req.redis.exists(startKey)) return {
        results: [],
        total: 0,
        next: -1
    };

    const length = (await req.redis.json.arrLen(
        startKey,
        '$.requests'
    ) as [number])[0]

    const end = minmax(length - offset, 0, length);
    const start = minmax(end - limit, 0, end);

    const results = (await req.redis.json.get(
        startKey,
        {
            path: `$.requests[${start}:${end}]`
        }
    )) as any as RequestInfo[];
    
    let next = offset + limit;
    if(next >= length) next = -1;

    return {
        results: results.reverse().map(item => omit(item, [ "result" ])),
        total: length,
        next
    };
}