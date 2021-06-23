const axios = require('axios')

axios.get(`https://data.cityofnewyork.us/resource/5uug-f49n.json?$query=SELECT
sample_date,
top_salinity_psu,
bottom_salinity_psu,
top_total_coliform_cells_100_ml,
top_bottom_coliform_cells_100_ml,
winkler_method_top_dissolved_oxygen_mg_l,
winkler_method_bottom_dissolved_oxygen_mg_l,
oakwood_bod_top_sample_mg_l,
oakwood_bod_bottom_sample_mg_l,
top_sample_temperature_c,
bottom_sample_temperature_c`)
  .then((res) => {
    var store = {}
    var data = res.data
    //console.log(data)
    for (var i = 0; i < data.length; i++) {
      if (Object.keys(data[i]).length === 11) {
        store[data[i].sample_date] = data[i]
      }
    }

    //console.log('store length: ', Object.keys(store).length)
    // console.log('stpre: ', store)

    var ranges = {}
    for (var obj in store) {
      for (var key in store[obj]) {
        if (!ranges[key]) {
          ranges[key] = [Number(store[obj][key]), Number(store[obj][key])]
        }
        else {
          if (Number(store[obj][key]) < ranges[key][0]) {
            ranges[key][0] = Number(store[obj][key])
          } else if (Number(store[obj][key] > ranges[key][1])) {
            ranges[key][1] = Number(store[obj][key])
          }
        }
      }
    }

    console.log('ranges: ', ranges)


  })
  .catch((err) => {
    console.log('err! ', err)
  })




// create a ranges finder
// ranges object
// for every obj in store
  // for each key
    // if key doesn't exist in ranges
      // ranges[key] = [store[obj][key], store[obj][key]]
    // else
      // if value at key is less than val at index0
          // replace val at index 0
      // else if value at key is more than val at index1
         // replace val at index 1

// log ranges