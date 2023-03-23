const { DataTypes, Model } = require("sequelize");
let dbConnect = require("../dbConnect");
const sequelizeInstance = dbConnect.Sequelize;

class Airport extends Model {}

Airport.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    name: { type: DataTypes.STRING, allowNull: false, required: true },
    iata: { type: DataTypes.STRING, allowNull: false, required: true },
    city: { type: DataTypes.STRING, allowNull: false, required: true },
    lat: { type: DataTypes.INTEGER, allowNull: false },
    lon: { type: DataTypes.INTEGER, allowNull: false },
    country: { type: DataTypes.STRING, allowNull: false },
    countryId: { type: DataTypes.INTEGER, allowNull: false, required: true },
  },
  {
    sequelize: sequelizeInstance,
    modelName: "airports",
    timestamps: true,
    freezeTableName: true,
  }
);

module.exports = Airport;
