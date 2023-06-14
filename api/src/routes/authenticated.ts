import express from "express";
import asyncHandler from "express-async-handler";
import * as Authenticator from "@tangerie/authenticator-api";

Authenticator.configure({
    url: process.env.AUTHENTICATOR_URL
})

const AuthenticatedRoutes = express.Router();

AuthenticatedRoutes.use(asyncHandler(async (req, res, next) => {
    if(!req.userid) throw new Error("Not Logged In");
    console.log(await Authenticator.getGithubUser(req.userid!));
    next();
}));

AuthenticatedRoutes.get("/", asyncHandler(async (req, res) => {
    res.json(req.userid);
}));

export default AuthenticatedRoutes;