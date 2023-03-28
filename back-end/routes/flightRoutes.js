const express = require("express");

const router = express.Router();
const Controllers = require("../controllers");

router.get("/", (req, res) => {
  Controllers.flightController.getFlights(res);
});

router.post("/create", (req, res) => {
  Controllers.flightController.createFlights(req.body, res);
});

router.put("/:id", (req, res) => {
  Controllers.flightController.updateFlights(req, res);
});

router.delete("/:id", (req, res) => {
  Controllers.flightController.deleteFlights(req, res);
});

module.exports = router;
