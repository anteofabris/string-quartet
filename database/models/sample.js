const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  sequelize.define('sample', {
    date
    salinity
    ph
    oxygen
    temperatures

  })
}