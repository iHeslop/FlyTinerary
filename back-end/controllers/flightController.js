"use strict";
const Models = require("../models");

const getFlights = (res) => {
  Models.Flight.findAll({})
    .then(function (data) {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      throw err;
    });
};

const getUserFlights = (req, res) => {
  Models.Flight.findAll({
    where: { userId: req.params.id },
  })
    .then(function (data) {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      throw err;
    });
};

const createFlights = (data, res) => {
  Models.Flight.create(data)
    .then(function (data) {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      throw err;
    });
};

const updateFlights = (req, res) => {
  let flightId = req.params.id;
  Models.Flight.update(req.body, { where: { id: flightId } })
    .then(function (data) {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      throw err;
    });
};

const deleteFlights = (req, res) => {
  let flightId = req.params.flightId;
  Models.Flight.destroy({ where: { flightId: flightId } })
    .then(function (data) {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      throw err;
    });
};

module.exports = {
  getFlights,
  createFlights,
  updateFlights,
  deleteFlights,
  getUserFlights,
};
