"use strict";
const Models = require("../models");
const axios = require("axios");

const options = {
  method: "GET",
  url: "https://flight-radar1.p.rapidapi.com/airports/list",
  headers: {
    "X-RapidAPI-Key": "d5d47b738amsh0218173db374270p186c18jsnae1665f158e0",
    "X-RapidAPI-Host": "flight-radar1.p.rapidapi.com",
  },
};

const getAirports = (res) => {
  Models.Airport.findAll({})
    .then(function (data) {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      throw err;
    });
};

const createAirports = (data, res) => {
  Models.Airport.create(data)
    .then(function (data) {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      throw err;
    });
};

const updateAirports = (req, res) => {
  let airportId = req.params.id;
  Models.Airport.update(req.body, { where: { id: airportId } })
    .then(function (data) {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      throw err;
    });
};

const deleteAirports = (req, res) => {
  let airportId = req.params.id;
  Models.Airport.destroy({ where: { id: airportId } })
    .then(function (data) {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      throw err;
    });
};

const storeAirports = async (req, res) => {
  let data = await axios.request(options);
  let apiData = data.data;
  console.log(apiData);
  let airportData = apiData.map((airport) => {
    return {
      id: airport.id,
      name: airport.name,
      iata: airport.iata,
      city: airport.city,
      lat: airport.lat,
      lon: airport.lon,
      country: airport.country,
      countryId: airport.countryId,
    };
  });
  console.log(airportData);

  airportData.forEach(async (airport) => {
    let created = await Models.Airport.findOrCreate({
      where: { name: airport.name },
      defaults: {
        id: airport.id,
        name: airport.name,
        iata: airport.iata,
        city: airport.city,
        lat: airport.lat,
        lon: airport.lon,
        country: airport.country,
        countryId: airport.countryId,
      },
    });
    created ? console.log("Data being added to database...") : null;
  });
};

module.exports = {
  getAirports,
  createAirports,
  updateAirports,
  deleteAirports,
  storeAirports,
};
