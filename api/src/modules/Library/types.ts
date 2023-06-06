export interface TextMetadata {
    type : string;
}

export interface SearchRequest extends Partial<TextMetadata> {
    term : string;
}

export interface ViewRequest extends Partial<TextMetadata> {
    title : string;
}