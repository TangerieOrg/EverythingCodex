import { Configuration, CreateCompletionRequest, OpenAIApi } from "openai";
import EventEmitter from "./EventEmitter";

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

type StreamEventMap = {
    data: [chunk: string],
    end: [],
    error: [message: string, error: any]
}

export const createCompletionStream = async (options: Omit<CreateCompletionRequest, "n" | "stream">) => {
    const res = await OpenAI.createCompletion({
        ...options,
        stream: true,
        n: 1
    }, { responseType: 'stream' });
    const emitter = new EventEmitter<StreamEventMap>();

    // @ts-ignore
    res.data.on('data', data => {
        // @ts-ignore
        const lines = data.toString().split('\n').filter(line => line.trim() !== '');
        for (const line of lines) {
            const message = line.replace(/^data: /, '');
            if (message === '[DONE]') {
                emitter.emit('end');
                return; // Stream finished
            }

            try {
                const parsed = JSON.parse(message);
                emitter.emit('data', parsed.choices[0].text);
            } catch (error) {
                emitter.emit('error', message, error);
                emitter.emit('end');
            }
        }
    });

    return emitter;
}