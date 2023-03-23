"use strict";
const Airport = require("./Airport");

async function init() {
  await Airport.sync();
}
init();

module.exports = { Airport };
