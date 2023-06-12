import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import router from "./routes";
import cookieMiddleware from "cookie-parser";
import path from "path";
import { TrackingMiddleware } from "@modules/Tracking/Middleware";
import { DatabaseMiddleware } from "@modules/Database/Middleware";

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

app.use(cookieMiddleware(process.env.COOKIE_SECRET || "cookie_secret"));
app.use(TrackingMiddleware);
app.use(DatabaseMiddleware);

// Disable cache
app.use((req, res, next) => {
    res.setHeader("Surrogate-Control", "no-store");
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
    res.setHeader("Expires", "0");

    next();
})

const LOG_REQUESTS = true //process.env.NODE_ENV === 'production';

// Logging
if(LOG_REQUESTS) {
    app.use((req, res, next) => {
        const ip = req.headers['x-real-ip'] || req.connection.remoteAddress;
        console.log(`[${ip} - ${req.tracking}] ${req.url} (${JSON.stringify(req.body)})`);
        next();
    });
}

// Routes
app.use(router);


const port = process.env.EXPRESS_PORT ?? 80;

app.listen(port, () => {
    console.log("Listening on port", port);
});