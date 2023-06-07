import { RelatedRequest, SearchRequest, ViewRequest } from "./types";

export const createSearchPrompt = ({ term, format, category } : SearchRequest) => {
    const lines : string[] = [
        "Welcome to the library of everything. Here contains all texts ever written.\n",
        "You searched for:",
        `Term: ${term}`
    ];

    if(format) lines.push(`Format: ${format}`);
    if(category) lines.push(`Category: ${category}`);

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

export const createViewPrompt = ({ title, format, category } : ViewRequest) => {
    const lines : string[] = [
        "Welcome to the library of everything. Here contains all texts ever written.\n",
        `You are currently viewing "${title}"\n`,
        "The content will start with the title of the text using markdown for any required formatting.\n",
        "Text Details:",
        `Title: ${title}`
    ];

    if(format) lines.push(`Format: ${format}`);
    if(category) lines.push(`Category: ${category}`);

    lines.push(
        "\n---\n",
        `# ${title}`
    )

    return lines.join('\n');
}