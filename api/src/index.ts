import express from "express";
import dotenv from 'dotenv';
import router from "./routes";

dotenv.config();

const app = express();

app.set('trust proxy', true)

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

if(process.env.NODE_ENV === 'production') {
    // Logging
    app.use((req, res, next) => {
        const ip = req.headers['x-real-ip'] || req.connection.remoteAddress;
        console.log(`[${ip}] ${req.url}`);
        next();
    });
}

app.use(router)


const port = process.env.EXPRESS_PORT ?? 80;

app.listen(port, () => {
    console.log("Listening on port", port);
});