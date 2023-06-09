import { createViewPrompt } from "@modules/Library/prompts";
import { makeRelatedStream, makeSearchStream } from "@modules/Library/streamed";
import { createCompletionStream } from "@modules/OpenAI";
import { recordRequest } from "@modules/Tracking/TrackRequest";
import express from "express";

const FakeGPTRoutes = express.Router();

FakeGPTRoutes.use((req, res, next) => {
    res.setHeader('Content-type', 'text/event-stream');
    res.setHeader('Transfer-Encoding', 'chunked');
    res.setHeader('X-Accel-Buffering', 'no');
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

/*
curl -N --location --request POST 'localhost:8080/fake/search' \
--header 'Content-Type: application/json' \
--data-raw '{
    "term": "Joe Biden",
    "type": "Fiction"
}'

curl -N --location --request POST 'https://tangerie.xyz/codex/api/search' \
--header 'Content-Type: application/json' \
--data-raw '{
    "term": "Joe Biden",
    "type": "Fiction"
}'
*/

const sleep = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

const EXAMPLE_SEARCH_RESULTS = [
    "Joe Biden: The Life and Career of the 47th President of the United States",
    "Joe Biden: An American Journey",
    "Joe Biden: The Path to the White House",
    "Joe Biden: A Biography",
    "Joe Biden: A Political Biography",
    "Joe Biden: The Life and Career of the 47th President of the United States",
    "Joe Biden: An American Journey",
    "Joe Biden: The Path to the White House",
    "Joe Biden: A Biography",
    "Joe Biden: A Political Biography"
]

FakeGPTRoutes.post('/search', async (req, res) => {
    res.statusCode = 200;

    const finalResults: string[] = [];

    for (const item of EXAMPLE_SEARCH_RESULTS) {
        await sleep(100);
        res.write(item + '\n')
        finalResults.push(item);
    }

    await recordRequest(req, "", finalResults);

    res.end();
})

/*
curl -N --location --request POST 'localhost:8080/fake/related' \
--header 'Content-Type: application/json' \
--data-raw '{
    "title": "Joe Biden and the Race for the White House"
}'
*/

const EXAMPLE_RELATED_RESULTS = [
    "The Democratic Party in 2020",
    "The History of the US Presidential Election",
    "The Political Landscape of the United States",
    "Joe Biden's Vision for America",
    "Donald Trump's Presidency",
    "The Role of the Media in Elections"
]

FakeGPTRoutes.post('/related', async (req, res) => {
    res.statusCode = 200;

    const finalResults: string[] = [];

    for (const item of EXAMPLE_RELATED_RESULTS) {
        await sleep(10);
        res.write(item + '\n');
        finalResults.push(item);
    }

    await recordRequest(req, "", finalResults);

    res.end();
})

/*
curl -N --location --request POST 'localhost:8080/fake/view' \
--header 'Content-Type: application/json' \
--data-raw '{
    "title": "Joe Biden and the Race for the White House",
    "type": "Fiction"
}'
*/

const EXAMPLE_VIEW_PAGE = `Joe Biden was a man with a mission: to become the President of the United States of America. He had been in politics for many years and had served as both Senator and Vice President. Now, he was ready to take on the challenge of a lifetime: running for the highest office in the land.
## Chapter 1
He had the support of the Democratic Party, and his platform was one of unity and progress. He promised to bring the country together and to tackle the big issues facing the nation. But to reach the White House, he would have to defeat the incumbent, President Donald Trump.

### Chapter 1.1
The race for the White House was a grueling one. Biden had to battle through a crowded primary field and then take on Trump in the general election. He had to fight against the forces of division and negative campaigning. But in the end, he prevailed.

## Summary
On November 3rd, 2020, Joe Biden was declared the President-elect. He had won the election with a clear
`

function randomInteger(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

FakeGPTRoutes.post('/view', async (req, res) => {
    res.statusCode = 200;

    let finalResult = ""

    let i = 0;
    while (i < EXAMPLE_VIEW_PAGE.length) {
        await sleep(10)
        const l = randomInteger(15, 25);
        const toSend = EXAMPLE_VIEW_PAGE.slice(
            i, i + l
        );
        res.write(toSend);
        finalResult += toSend;
        i += l;
    }
    await recordRequest(req, "", finalResult);
    res.end();
})

export default FakeGPTRoutes;