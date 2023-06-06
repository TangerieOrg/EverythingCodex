import { Configuration, OpenAIApi } from "openai";

const config = new Configuration({
    apiKey: process.env.OPENAI_KEY
});

export const OpenAI = new OpenAIApi(config);

/*
const createResponse = async (path: string, extraData = "") => {
    const data = (await openai.createCompletion({
        model: "text-davinci-003",
        prompt: createPrompt(path, extraData),
        temperature: 0.7,
        max_tokens: 2048,
        n: 1,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0
    })).data.choices[0].text!;

    const lines = data.split("\n");
    const contentType = lines.shift()!;
    const text = lines.join("\n");

    return {
        contentType, text
    }
}

*/