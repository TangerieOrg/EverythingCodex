import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import router from "./routes";
import { createClient } from 'redis';
import path from "path";

dotenv.config({
    path: path.join(process.cwd(), process.env.NODE_ENV === 'development' ? ".env.development" : ".env")
});

// const redis = createClient({
//     url: process.env.REDIS_URL
// })

const app = express();

// Forward IP
app.set('trust proxy', true)

// CORS
app.use(cors())
app.options('*', cors());

// Body Parsing
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

const LOG_REQUESTS = true //process.env.NODE_ENV === 'production';

// Logging
if(LOG_REQUESTS) {
    app.use((req, res, next) => {
        const ip = req.headers['x-real-ip'] || req.connection.remoteAddress;
        console.log(`[${ip}] ${req.url} (${JSON.stringify(req.body)})`);
        next();
    });
}

// Routes
app.use(router)


const port = process.env.EXPRESS_PORT ?? 80;

app.listen(port, () => {
    console.log("Listening on port", port);
});