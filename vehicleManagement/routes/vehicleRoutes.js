const express = require("express");
const router = express.Router();
const {
  createVehicle,
  getAllVehicles,
  updateVehicle,
  deleteVehicle,
  addTripToVehicle,
  updateTrip,
  deleteTrip,
  getVehiclesWithLongTrips,
  getVehiclesFromCities,
  getVehiclesWithFutureTrips,
  getCarsOrTrucks,
} = require("../controllers/vehicleController");

// Vehicle CRUD
router.post("/vehicles", createVehicle);
router.get("/vehicles", getAllVehicles);
router.put("/vehicles/:id", updateVehicle);
router.delete("/vehicles/:id", deleteVehicle);


router.post("/vehicles/:id/trips", addTripToVehicle);
router.put("/vehicles/:id/trips/:tripId", updateTrip);
router.delete("/vehicles/:id/trips/:tripId", deleteTrip);


router.get("/vehicles/trips/long", getVehiclesWithLongTrips);
router.get("/vehicles/trips/from-cities", getVehiclesFromCities);
router.get("/vehicles/trips/after-date", getVehiclesWithFutureTrips);
router.get("/vehicles/type/filter", getCarsOrTrucks);

module.exports = router;