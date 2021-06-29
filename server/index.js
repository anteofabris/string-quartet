const express = require('express');
const app = express();
const path = require('path');
const harborWaterQuality = require('../dataCollection/harborWaterQuality')

const port = 3000;

app.use(express.static(path.join(__dirname, '..')));
app.use(express.json());

app.get('/samples', (req, res) => {
  console.log('in app.get for samples')

  harborWaterQuality.getSamples((err, data) => {
    if (err) {
      console.log('err getting samples: ', err)
    } else {
      console.log('success getting samples: ', Object.keys(data).length)
      res.send(data)
    }
  })

})

app.listen(port, () => {
  console.log(`Server listening at localhost:${port}!`);
});