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

export default TestRoutes;