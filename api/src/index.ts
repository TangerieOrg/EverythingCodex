import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import router from "./routes";

dotenv.config();

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

// Logging
if(process.env.NODE_ENV === 'production') {
    app.use((req, res, next) => {
        const ip = req.headers['x-real-ip'] || req.connection.remoteAddress;
        console.log(`[${ip}] ${req.url}`);
        next();
    });
}

// Routes
app.use(router)


const port = process.env.EXPRESS_PORT ?? 80;

app.listen(port, () => {
    console.log("Listening on port", port);
});