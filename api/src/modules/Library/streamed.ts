import { OpenAI, createCompletionStream } from "@modules/OpenAI";
import { RelatedRequest, SearchRequest } from "./types";
import { createRelatedPrompt, createSearchPrompt } from "./prompts";
import EventEmitter from "@modules/EventEmitter";

type SearchEventMap = {
    item: [item : string],
    end: []
}

export const makeSearchStream = async (data : SearchRequest, user?: string) => {
    const prompt = createSearchPrompt(data);

    const gptEmitter = await createCompletionStream({
        model: "text-davinci-003",
        prompt,
        temperature: 0.7,
        max_tokens: 100,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        stop: "]",
        user
    });

    const emitter = new EventEmitter<SearchEventMap>();

    let currentData = `"`;

    gptEmitter.on('data', data => {
        currentData += data;
        const index = currentData.indexOf(",");
        if(index > -1) {
            const [start, end] = currentData.split(",");
            emitter.emit(
                "item", 
                start.trim().slice(1,-1).trim()
            );
            currentData = end
        } 
    });

    gptEmitter.on('end', () => {
        // Also send last data in buffer
        emitter.emit("item", currentData.replace("]", "").trim().slice(1,-1).trim())
        emitter.emit("end")
    });

    return { emitter, prompt };
}


export const makeRelatedStream = async (data : RelatedRequest, user?: string) => {
    const prompt = createRelatedPrompt(data);

    const gptEmitter = await createCompletionStream({
        model: "text-davinci-003",
        prompt,
        temperature: 0.7,
        max_tokens: 100,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        stop: "]",
        user
    });

    const emitter = new EventEmitter<SearchEventMap>();

    let currentData = `"`;

    gptEmitter.on('data', data => {
        currentData += data;
        const index = currentData.indexOf(",");
        if(index > -1) {
            const [start, end] = currentData.split(",");
            emitter.emit(
                "item", 
                start.trim().slice(1,-1).trim()
            );
            currentData = end
        } 
    });

    gptEmitter.on('end', () => {
        // Also send last data in buffer
        emitter.emit("item", currentData.replace("]", "").trim().slice(1,-1).trim())
        emitter.emit("end")
    });

    return { emitter, prompt };
}