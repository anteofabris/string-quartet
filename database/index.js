require('dotenv').config()
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(`postgres://${process.env.USERNAME}:${process.env.PASSWORD}@localhost:5432/${process.env.DATABASE}`)
// const sequelize = new Sequelize ('stringquartet', process.env.USERNAME, process.env.PASSWORD)

const models = {
  sample: sequelize.import('./models/sample.js')
}

