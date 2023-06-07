import { SearchFormatOptions } from "./Search";

export interface TextMetadata {
    format : typeof SearchFormatOptions[number];
    category : string;
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