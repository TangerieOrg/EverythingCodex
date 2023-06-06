import express from "express";

const TestRoutes = express.Router();

TestRoutes.get('/stream', (req, res) => {
    res.json({});
});

export default TestRoutes;