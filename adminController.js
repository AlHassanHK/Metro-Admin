import stations from "./station.js";
import routes from "./route.js";


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

    res.status(200).json({"Successfully deleted": deletedStation.FID, "Name":deletedStation.stop_name, deleteCount});
  } catch (error) {
    res.status(400).json(error.message);
  }
}

const updateRoute = async (req, res) => {
  try {
    //const options = { upsert: true };
    const updatedRoute= await routes.findOne({
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

    res.status(200).json({"Successfully deleted": deletedRoute.FID, "Name":deletedRoute.route_ID, deleteCount});
  } catch (error) {
    res.status(400).json(error.message);
  }
}


export default {
  getAllStations,
  getStationByName,
  addStation,
  deleteStation,
  deleteRoute,
  updateRoute
};




