import express from "express";
import { OpenAI, createCompletionStream } from "@modules/OpenAI";

const TestRoutes = express.Router();

TestRoutes.get('/stream', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-type', 'text/plain');
    res.setHeader('Transfer-Encoding', 'chunked');

    let i = 0;
    const handle = setInterval(() => {
        console.log(i);
        res.write(`${i}\n`);
        i++;
        if(i > 10) {
            clearInterval(handle);
            res.end();
        }
    }, 250);
});

const TEST_PROMPT = `Welcome to the library of everything. Here contains all texts ever written.
You are currently viewing "Joe Biden and the Battle for the White House"

Related Texts (as a json array of text titles):
[ "`;


// curl -N http://localhost:8080/test/gpt
TestRoutes.get('/gpt', async (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-type', 'text/plain');
    res.setHeader('Transfer-Encoding', 'chunked');

    const emitter = await createCompletionStream({
        model: "text-davinci-003",
        prompt: TEST_PROMPT,
        temperature: 0.7,
        max_tokens: 100,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0
    });

    emitter.on('data', data => {
        res.write(data)
    });

    emitter.on('end', () => {
        res.end();
    });

    emitter.on('error', () => {
        
    })
});

export default TestRoutes;