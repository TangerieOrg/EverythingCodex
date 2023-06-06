import express from "express";
import TestRoutes from "./test";
import GPTRoutes from "./gpt";

const router = express.Router();

router.get('/', (req, res) => {
    res.json({ key: "value" })
})

const routers : Record<string, express.Router> = {
    '/': GPTRoutes
};

if(process.env.NODE_ENV === "development") {
    routers['/test'] = TestRoutes;
}

for(const key of Object.keys(routers)) {
    router.use(key, routers[key])
}

export default router;