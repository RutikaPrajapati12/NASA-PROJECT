const express=require("express");
const {launches}=require("../../models/launches.model");
const {httpgetAlllaunches,httpAddNewLaunch, httpAbortLaunch,}=require("./launches.controller");
const launchesRouter=express.Router();
launchesRouter.get("/",httpgetAlllaunches);
launchesRouter.post("/",httpAddNewLaunch);
launchesRouter.delete("/:id", httpAbortLaunch);

module.exports=launchesRouter;