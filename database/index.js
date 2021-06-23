require('dotenv').config()
const { Sequelize } = require('sequelize');
//const sequelize = new Sequelize('postgres://user:pw@localhost:5432/stringquartet')
const sequelize = new Sequelize ('stringquartet', process.env.USERNAME, process.env.PASSWORD)

const models = {
  sample: sequelize.import('./models/sample.js')
}