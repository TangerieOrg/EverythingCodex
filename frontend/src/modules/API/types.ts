export interface TextMetadata {
    format : string;
    category : string;
    length : string;
    summary : string;
}

export interface SearchRequest extends Partial<TextMetadata> {
    term : string;
}

export interface ViewRequest extends Partial<TextMetadata> {
    title : string;
}

export interface RelatedRequest extends Partial<TextMetadata> {
    title : string;
}

export interface HistoryItem<T = any> {
    path : string;
    request : T;
    ts : number;
}

export interface HistoryResponse {
    next : number;
    total : number;
    results : HistoryItem[]
}