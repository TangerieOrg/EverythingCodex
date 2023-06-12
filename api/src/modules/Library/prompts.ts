import { RelatedRequest, SearchRequest, ViewRequest } from "./types";

export const capitalize = (str : string) => str.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());

export const createMetadataLines = (metadata : Record<string, string>) => {
    const lines : string[] = [];

    for(const key in metadata) {
        lines.push(`${capitalize(key)}: ${metadata[key]}`);
    }

    return lines;
}

export const createSearchPrompt = ({ term, ...metadata } : SearchRequest) => {
    const lines : string[] = [
        "Welcome to the library of everything. Here contains all texts ever written.\n",
        "You searched for:",
        `Term: ${term}`
    ];

    lines.push(...createMetadataLines(metadata));

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

export const createViewPrompt = ({ title, ...metadata } : ViewRequest) => {
    const lines : string[] = [
        "Welcome to the library of everything. Here contains all texts ever written.\n",
        `You are currently viewing "${title}"\n`,
        "The content will start with the title of the text using markdown for any required formatting.\n",
        "Text Details:",
        `Title: ${title}`
    ];

    lines.push(...createMetadataLines(metadata));

    lines.push(
        "\n---\n",
        `# ${title}`
    )

    return lines.join('\n');
}