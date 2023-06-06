import { SearchRequest } from "./types";

export const createSearchPrompt = ({ term, type } : SearchRequest) => {
    const lines : string[] = [
        "Welcome to the library of everything. Here contains all texts ever written.\n",
        "You searched for:",
        `Term: ${term}`
    ];

    if(type) lines.push(`Type: ${type}`);

    lines.push(
        "\nSearch results (as a json array of text titles):",
        '["'
    )

    return lines.join('\n');
};