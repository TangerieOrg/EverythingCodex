import { AdvancedSearchOptions } from "./Search";

export interface TextMetadata {
    format : typeof AdvancedSearchOptions["Format"][number];
    category? : string;
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