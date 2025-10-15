const Vehicle = require("../models/Vehicle");

// Vehicle CRUD
const createVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.create(req.body);
    res.status(201).json({ message: "Vehicle created", vehicle });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getAllVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.json(vehicles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!vehicle) return res.status(404).json({ message: "Vehicle not found" });
    res.json({ message: "Vehicle updated", vehicle });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findByIdAndDelete(req.params.id);
    if (!vehicle) return res.status(404).json({ message: "Vehicle not found" });
    res.json({ message: "Vehicle deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Trip Operations
const addTripToVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) return res.status(404).json({ message: "Vehicle not found" });
    vehicle.trips.push(req.body);
    await vehicle.save();
    res.status(201).json({ message: "Trip added", vehicle });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateTrip = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) return res.status(404).json({ message: "Vehicle not found" });

    const trip = vehicle.trips.id(req.params.tripId);
    if (!trip) return res.status(404).json({ message: "Trip not found" });

    Object.assign(trip, req.body);
    await vehicle.save();

    res.json({ message: "Trip updated", trip });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteTrip = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) return res.status(404).json({ message: "Vehicle not found" });

    const trip = vehicle.trips.id(req.params.tripId);
    if (!trip) return res.status(404).json({ message: "Trip not found" });

    trip.remove();
    await vehicle.save();
    res.json({ message: "Trip deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Advanced Queries
const getVehiclesWithLongTrips = async (req, res) => {
  try {
    const vehicles = await Vehicle.find({ "trips.distance": { $gt: 200 } });
    res.json(vehicles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getVehiclesFromCities = async (req, res) => {
  try {
    const cities = ["Delhi", "Mumbai", "Bangalore"];
    const vehicles = await Vehicle.find({ "trips.startLocation": { $in: cities } });
    res.json(vehicles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getVehiclesWithFutureTrips = async (req, res) => {
  try {
    const vehicles = await Vehicle.find({ "trips.startTime": { $gte: new Date("2024-01-01") } });
    res.json(vehicles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getCarsOrTrucks = async (req, res) => {
  try {
    const vehicles = await Vehicle.find({ type: { $in: ["car", "truck"] } });
    res.json(vehicles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
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
};