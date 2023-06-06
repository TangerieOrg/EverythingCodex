import { makeSearchStream } from "@modules/Library/search";
import express from "express";

const GPTRoutes = express.Router();

GPTRoutes.post('/search', async (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-type', 'text/plain');
    res.setHeader('Transfer-Encoding', 'chunked');
    
    const emitter = await makeSearchStream(req.body);

    emitter.on('item', item => {
        res.write(item + '\n');
    });

    emitter.on('end', () => res.end());
})

export default GPTRoutes;