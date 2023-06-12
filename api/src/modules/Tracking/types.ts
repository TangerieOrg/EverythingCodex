export interface RequestInfo<Request = any, Result = any> {
    path : string;
    request : Request;
    result : Result;
    ts : number;
}

export type UserRequestInfo<Request = any, Result = any> = {
    by : string;
} & RequestInfo<Request, Result>;

export interface HistoryResponse<Request = any, Result = any> {
    total : number;
    next: number;
    results : Omit<RequestInfo<Request, Result>, "result">[];
}
