const express=require("express");
const {httpgetAllPlanets}=require("../planets/planets.controller");
const planetsRouter=express.Router();
planetsRouter.get("/",httpgetAllPlanets);
module.exports=planetsRouter;