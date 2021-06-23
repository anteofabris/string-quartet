const axios = require('axios');

axios.get('https://data.cityofnewyork.us/resource/c3uy-2p5r.json')
  .then((response) => {

    var chels = {}
    for (var i = 0; i < response.data.length; i++) {
      var res = response.data[i]
      var place = response.data[i].geo_place_name

      if (place === 'Chelsea-Village') {
        if (!res.time_period.includes('Annual')) {
          chels[res.time_period] = res.data_value
        }
      }
    }

    console.log(chels)
    var keys = Object.keys(chels)

    var sorted = keys.sort((a, b) => {

      var aNum = a.includes('Winter') ? Number(a.split(' ')[1].split('-')[0]) : Number(a.split(' ')[1])
      var bNum = b.includes('Winter') ? Number(b.split(' ')[1].split('-')[0]) : Number(b.split(' ')[1])
      return aNum - bNum;

    })

    var levels = []
    for (var i = 0; i < sorted.length; i ++) {
      levels.push([sorted[i], Math.round ( Number(chels[sorted[i]])) ]  )
    }
    console.log(levels)
  })
  .catch((err) => {
    console.log('errr: ', err)
  })