const launchesDatabase=require("./launches.mongo");
const planets=require("./planets.mongo");

const DEFAULT_FLIGHT_NUMBER=100;
const launch={
    flightNumber:100,
    mission :"Kepler Exploration X",
    rocket : "Explorer IS1",
    launchDate:new Date("December 27,2030"),
    target:"Kepler-442 b",
    customer:["ZTM","NASA"],
    upcoming:true,
    success:true,
};
// launches.set(launch.flightNumber,launch);
saveLaunch(launch);
async function existsLaunchWithId(launchId){
    return await launchesDatabase.findOne({
        flightNumber:launchId,
    });
}
async function getLatestFlightNumber(){
    const latestLaunch=await launchesDatabase
    .findOne()
    .sort("-flightNumber");
if(!latestLaunch){
    return DEFAULT_FLIGHT_NUMBER;
}
    return latestLaunch.flightNumber;
}
async function getalllaunches(){
    return await launchesDatabase.find({},{
        "_id":0,"__v":0
    });
}
async function saveLaunch(launch){
    const planet=await planets.findOne({
        keplerName:launch.target,
    });
    if(!planet){
      throw new Error("No Matching planet found") ;
    }
    await launchesDatabase.findOneAndUpdate({
        flightNumber:launch.flightNumber,
    },launch,{
        upsert:true,
    });

}
async function scheduleNewLaunch(launch){
    console.log(launch)
    const newFlightNumber=await getLatestFlightNumber()+1;
const newLaunch=Object.assign(launch,{
    success:true,
    upcoming:true,
    customers:["zero to Mastery","NASA"],
    flightNumber:newFlightNumber,
});
await saveLaunch(newLaunch);
}
// function addNewLaunch(launch){
//     latestFlightNumber++;
//     launches.set(
//         latestFlightNumber,
//         Object.assign(launch,{
//             success:true,
//             upcoming:true,
//             customers:["zero to Mastery","NASA"],
// flightNumber:latestFlightNumber,
//         })
//         );
// }

async function abortLaunchById(launchId){
 const aborted= await launchesDatabase.updateOne({
        flightNumber:launchId,
    },{
        upcoming:false,
        success:false,
    });
    return aborted.ok===1 && aborted.nModified===1;
    
}
module.exports={
    existsLaunchWithId,
    getalllaunches,
    scheduleNewLaunch,
    abortLaunchById,
    
}