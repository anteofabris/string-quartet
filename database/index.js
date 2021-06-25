require('dotenv').config()
const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize(`postgres://${process.env.USERNAME}:${process.env.PASSWORD}@localhost:5432/${process.env.DATABASE}`)
// const sequelize = new Sequelize ('stringquartet', process.env.USERNAME, process.env.PASSWORD)

// const models = {
//   sample: sequelize.import('./models/sample.js')
// }

sequelize.authenticate()
  .then(() => {
    console.log('athenticated!!')
  })
  .catch((err) => {
    console.log('err: ', err)
  })


class Sample extends Model { }

Sample.init({
  date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  salinity: {
    type: DataTypes.NUMBER,
    allowNull: false
  },
  ph: {
    type: DataTypes.NUMBER,
    allowNull: false
  },
  oxygen: {
    type: DataTypes.NUMBER,
    allowNull: false
  },
  temperatures: {
    type: DataTypes.NUMBER,
    allowNull: false
  }

},
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'Sample' // We need to choose the model name
  });

console.log(Sample === sequelize.models.Sample)

module.exports = { Sample }