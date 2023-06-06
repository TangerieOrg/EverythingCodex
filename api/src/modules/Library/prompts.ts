import { RelatedRequest, SearchRequest, ViewRequest } from "./types";

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

export const createRelatedPrompt = ({ title } : RelatedRequest) => `Welcome to the library of everything. Here contains all texts ever written.
You are currently viewing "${title}"

Related Texts (as a json array of text titles):
[ "`;

export const createViewPrompt = ({ title, type } : ViewRequest) => {
    const lines : string[] = [
        "Welcome to the library of everything. Here contains all texts ever written.\n",
        `You are currently viewing "${title}"\n`,
        "The content will start with the title of the text using markdown for any required formatting.\n",
        "Text Details:",
        `Title: ${title}`
    ];

    if(type) lines.push(`Type: ${type}`);

    lines.push(
        "\n---\n",
        `# ${title}`
    )

    return lines.join('\n');
}