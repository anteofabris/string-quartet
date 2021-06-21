const axios = require('axios');

axios.get('https://data.cityofnewyork.us/resource/c3uy-2p5r.json')
.then((response) => {
  //console.log('got response: ', response)
})
.catch((err) => {
  console.log('errr: ', err)
})