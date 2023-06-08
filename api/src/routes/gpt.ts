import { createViewPrompt } from "@modules/Library/prompts";
import { makeRelatedStream, makeSearchStream } from "@modules/Library/streamed";
import { createCompletionStream } from "@modules/OpenAI";
import { recordRequest } from "@modules/Tracking/TrackRequest";
import express from "express";

const GPTRoutes = express.Router();

GPTRoutes.use((req, res, next) => {
    res.setHeader('Content-type', 'text/event-stream');
    res.setHeader('Transfer-Encoding', 'chunked');
    res.setHeader('X-Accel-Buffering', 'no');
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
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

    const finalResults : string[] = [];

    emitter.on('item', item => {
        res.write(item + '\n');
        finalResults.push(item);
    });

    emitter.on('end', async () => {
        await recordRequest(req, finalResults);
        res.end();
    });
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
    
    const emitter = await makeRelatedStream(req.body);

    const finalResults : string[] = [];

    emitter.on('item', item => {
        res.write(item + '\n');
        finalResults.push(item);
    });

    emitter.on('end', async () => {
        await recordRequest(req, finalResults);
        res.end();
    });
})

/*
curl -N --location --request POST 'localhost:8080/view' \
--header 'Content-Type: application/json' \
--data-raw '{
    "title": "Joe Biden and the Race for the White House",
    "type": "Fiction"
}'
*/

// RPM = 3,000	
// TPM = 250,000

GPTRoutes.post('/view', async (req, res) => {
    res.statusCode = 200;

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

    let finalResult = "";

    emitter.on('data', data => {
        res.write(data);
        finalResult += data;
    });

    emitter.on('end', async () => {
        await recordRequest(req, finalResult);
        res.end();
    });
})

export default GPTRoutes;