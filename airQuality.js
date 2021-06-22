const axios = require('axios');

axios.get('https://data.cityofnewyork.us/resource/c3uy-2p5r.json')
  .then((response) => {

    var chels = {}
    for (var i = 0; i < response.data.length; i++) {
      var res = response.data[i]
      var place = response.data[i].geo_place_name
      // console.log(place)
      // if (!ref[place]) {
      //   ref[place] = true
      // }
      if (place === 'Chelsea-Village') {
        chels[res.time_period] = res.data_value
      }
    }

   console.log('chels: ', chels)
  })
  .catch((err) => {
    console.log('errr: ', err)
  })