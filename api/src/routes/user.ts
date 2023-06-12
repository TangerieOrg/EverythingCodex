import { getHistory } from "@modules/Tracking/TrackRequest";
import express from "express";

const UserRoutes = express.Router();

const minmaxFromString = (str : string, min : number, max : number, _default : number) =>
    Math.min(
        Math.max(
            parseInt(str) || _default,
            min
        ),
        max
    )

UserRoutes.get("/history", async (req, res) => {
    const offset = minmaxFromString(req.query.offset as string, 0, Infinity, 0);
    const limit = minmaxFromString(req.query.limit as string, 1, 100, 10);

    const history = await getHistory(req, offset, limit);

    res.json(history);
});

export default UserRoutes;