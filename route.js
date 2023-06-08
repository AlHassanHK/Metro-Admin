import mongoose from "mongoose";

const routeSchema = new mongoose.Schema({
  FID: {
    type: String,
    required: true,
  },
  fid: {
    type: Number,
    required: true,
  },
  geometry: {
    type: String,
    required: true,
  },
  route_id: {
    type: String,
    required: true,
  },
  route_short_name: {
    type: String,
    required: true,
  },
  route_long_name: {
    type: String,
    required: true,
  },
  route_headsign: {
    type: String,
    required: true,
  },
  trip_id: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  direction: {
    type: Number,
    required: true,
  },
});

const Route = mongoose.model('route', routeSchema);

export default Route;
