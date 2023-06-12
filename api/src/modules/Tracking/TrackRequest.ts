import { Request } from "express";
import { HistoryResponse, RequestInfo } from "./types";
import { getTS } from "./Util";
import { omit } from "lodash";
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

export const recordRequest = async (req : Request, result : any) => {
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