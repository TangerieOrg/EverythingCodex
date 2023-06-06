import { createViewPrompt } from "@modules/Library/prompts";
import { makeRelatedStream, makeSearchStream } from "@modules/Library/streamed";
import { createCompletionStream } from "@modules/OpenAI";
import express from "express";

const GPTRoutes = express.Router();

GPTRoutes.use((req, res, next) => {
    res.setHeader('Content-type', 'text/event-stream');
    res.setHeader('Transfer-Encoding', 'chunked');
    res.setHeader('X-Accel-Buffering', 'no');
    next();
})

/*
curl -N --location --request POST 'localhost:8080/search' \
--header 'Content-Type: application/json' \
--data-raw '{
    "term": "Joe Biden",
    "type": "Fiction"
}'
*/

GPTRoutes.post('/search', async (req, res) => {
    res.statusCode = 200;
    
    const emitter = await makeSearchStream(req.body);

    emitter.on('item', item => {
        res.write(item + '\n');
    });

    emitter.on('end', () => res.end());
})

/*
curl -N --location --request POST 'localhost:8080/related' \
--header 'Content-Type: application/json' \
--data-raw '{
    "title": "Joe Biden and the Race for the White House"
}'
*/

GPTRoutes.post('/related', async (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-type', 'text/event-stream');
    res.setHeader('Transfer-Encoding', 'chunked');
    res.setHeader('X-Accel-Buffering', 'no');
    
    const emitter = await makeRelatedStream(req.body);

    emitter.on('item', item => {
        res.write(item + '\n');
    });

    emitter.on('end', () => res.end());
})

/*
curl -N --location --request POST 'localhost:8080/view' \
--header 'Content-Type: application/json' \
--data-raw '{
    "title": "Joe Biden and the Race for the White House",
    "type": "Fiction"
}'
*/

GPTRoutes.post('/view', async (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-type', 'text/event-stream');
    res.setHeader('Transfer-Encoding', 'chunked');
    res.setHeader('X-Accel-Buffering', 'no');

    const prompt = createViewPrompt(req.body);
    
    const emitter = await createCompletionStream({
        model: "text-davinci-003",
        prompt,
        temperature: 0.7,
        max_tokens: 2048,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0
    })

    emitter.on('data', data => {
        res.write(data);
    });

    emitter.on('end', () => res.end());
})

export default GPTRoutes;