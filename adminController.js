import stations from "./station.js";
import routes from "./route.js";
import schedules from "./schedule.js";
import wellknown from 'wellknown';


const getAllStations = async (req, res) => {
  try {
    const allStations = await stations.find({});
    res.status(200).json(allStations);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getStationByName = async (req, res) => {
  try {
    const { stationName } = req.params.stationName;
    const foundStation = await stations.findOne({ "stop_name": req.params.stationName });
    res.status(200).json(foundStation);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const addStation = async (req, res) => {
  try {
    const newStation = await stations.create(req.body);
    res.status(200).json(newStation);

  } catch (error) {
    res.status(400).json(error.message);
  }
}

const deleteStation = async (req, res) => {
  try {
    const deletedStation = await stations.findOne({
      stop_name: req.params.stationName
    })

    const deleteCount = await stations.deleteOne({ stop_name: req.params.stationName });

    res.status(200).json({ "Successfully deleted": deletedStation.FID, "Name": deletedStation.stop_name, deleteCount });
  } catch (error) {
    res.status(400).json(error.message);
  }
}

const updateRoute = async (req, res) => {
  try {
    //const options = { upsert: true };
    const updatedRoute = await routes.findOne({
      route_ID: req.params.route_id
    });

    const newCoordinates = {
      $set: {
        geometry: req.body.geometry
      },
    };

    const result = await updatedRoute.updateOne(newCoordinates, options);

    res.status(200).json(`${result.matchedCount} document matched the route inserted, updated ${result.modifiedCount} the route coordinates`);
  } catch (error) {
    res.status(400).json(error.message);
  }
}

const deleteRoute = async (req, res) => {
  try {
    const deletedRoute = await routes.findOne({
      route_ID: req.params.route_id
    })

    const deleteCount = await routes.deleteOne({ route_ID: req.params.route_id });

    res.status(200).json({ "Successfully deleted": deletedRoute.FID, "Name": deletedRoute.route_ID, deleteCount });
  } catch (error) {
    res.status(400).json(error.message);
  }
}

const jsonToGeoJson = (stations) => {
  return {
    type: 'FeatureCollection',
    features: stations.map(station => ({
      type: 'Feature',
      geometry: wellknown.parse(station.geometry),
      properties: station
    }))
  };
};


const getAllStationsGEOJSON = async (_req, res) =>{
  try {
    const allStations = await stations.find({});
    const geoJsonStations = jsonToGeoJson(allStations);  
    res.status(200).json(geoJsonStations);
  } catch (error) {
    res.status(400).send(error.message);
  }
}



const jsonToGeoJsonRoutes = (routes) => {
  return {
    type: 'FeatureCollection',
    features: routes.map(route => ({
      type: 'Feature',
      geometry: wellknown.parse(route.geometry),
      properties: route
    }))
  };
};



const getAllRoutesGEOJSON = async (req, res)=>{
  try {
    const allRoutes = await routes.find({});
    const geoJsonRoutes = jsonToGeoJsonRoutes(allRoutes);
    res.json(geoJsonRoutes);
  } catch (error) {
  res.send(error); 
  }
}


const getAllSchedules = async (req, res)=>{
  try {
    const allSchedules = await schedules.find({});

    res.status(200).json(allSchedules);
  } catch (error) {
    res.status(400).send(error.message);
  }
}


const getSchedulesByStationName = async (req, res)=>{
try {
  const {station} = req.params;
  const stationSchedules = await schedules.find({stop_name:station});
  res.json(stationSchedules);
} catch (error) {
  res.send(error.message);
}
}
export default {
  getAllStations,
  getStationByName,
  addStation,
  deleteStation,
  deleteRoute,
  updateRoute,
  getAllStationsGEOJSON,
  getAllRoutesGEOJSON,
  getAllSchedules,
  getSchedulesByStationName
};




















// const getAllStationsCSV = async (req, res) => {
//   await writeCSV();

//   res.sendFile("C:\\Users\\alhas\\Desktop\\cairo-metro-backup\\admin\\stations.csv");
// }






// const writeCSV = async () => {
  //   let stationCSV = `FID,fid,geometry,stop_id,stop_name,route_id\n`
  //   const rawData = await axios.get("https://metro-admin-gray.vercel.app/api/admin");
  //   const allStations = rawData.data;
  
//   for (let station of allStations) {
  //     for (let field in station) {
    //       if (field === "route_id") {
      //         stationCSV += `${station[field]}`;
//       } else {
//         stationCSV += `${station[field]},`;

//       }
//     }
//     stationCSV += `\n`

//   }

//   fs.writeFileSync("./stations.csv", stationCSV);

// }