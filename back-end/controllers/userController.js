"use strict";
const Models = require("../models");

const getUsers = (res) => {
  Models.User.findAll({})
    .then(function (data) {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      throw err;
    });
};

const createUsers = (data, res) => {
  Models.User.create(data)
    .then(function (data) {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      throw err;
    });
};

const updateUsers = (req, res) => {
  let airportId = req.params.id;
  Models.Airport.update(req.body, { where: { id: airportId } })
    .then(function (data) {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      throw err;
    });
};

const deleteUsers = (req, res) => {
  let airportId = req.params.id;
  Models.Airport.destroy({ where: { id: airportId } })
    .then(function (data) {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      throw err;
    });
};

module.exports = {
  getUsers,
  createUsers,
  updateUsers,
  deleteUsers,
};
