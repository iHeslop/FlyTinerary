"use strict";
const Airport = require("./Airport");
const User = require("./User");

async function init() {
  await Airport.sync();
  await User.sync();
}
init();

module.exports = { Airport, User };
