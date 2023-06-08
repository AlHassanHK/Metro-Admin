import express from "express";
import userController from "./adminController.js";
const router = express.Router();

//define function logic in controller
router.route("/").get(userController.getAllStations);
router.route("/geoJSON").get(userController.getAllStationsGEOJSON)
router.route("/routesGeoJSON").get(userController.getAllRoutesGEOJSON)
router.route("/find/:stationName").get(userController.getStationByName);
router.route("/addStation").post(userController.addStation);
router.route("/delete/:stationName").delete(userController.deleteStation);
router.route("/delete/:route_id").delete(userController.deleteRoute);
router.route("/updateRoute/:route_id").patch(userController.updateRoute);


export default router;  