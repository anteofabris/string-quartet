import React from 'react';
import Cats from './Cats.jsx';
import * as Tone from 'tone';
import axios from 'axios';
import Violin_1 from '../../audio-exit/Violin_1.js'
import Violin_2 from '../../audio-exit/Violin_2.js'
import Viola from '../../audio-exit/Viola.js'
import Violoncello from '../../audio-exit/Violoncello.js'


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      samples: {},
      v1: 'winkler_method_top_dissolved_oxygen_mg_l',
      v2: 'bottom_salinity_psu',
      vla: 'bottom_ph',
      vcl: 'light_trans_transparency_bottom_sample'
    }
    this.create = this.create.bind(this)
    this.play = this.play.bind(this)
  }

  componentDidMount() {
    axios
      .get('/samples')
      .then((res) => {
        console.log('got res! ', res)
        this.setState({
          samples: res.data.samples,
          ranges: res.data.ranges
        }, () => { console.log('num samples: ', Object.keys(this.state.samples).length) })
      })
      .catch((err) => {
        console.log('err getting data! ', err)
      })

  }

  create() {



  }

  play() {

    var startDate = new Date('1995-01-04T00:00:00.000Z')
    var sampleCount = 0
    var sampleSequence =
      setInterval(() => {
        var date = startDate

        if (this.state.samples[date.toISOString().split('T')[0]] !== undefined) {

          // get temperature
          var temp = this.state.samples[date.toISOString().split('T')[0]].bottom_sample_temperature_c

          // vioilin 1
          var violin1Data = this.state.samples[date.toISOString().split('T')[0]][this.state.v1]
          Violin_1.play(violin1Data, temp, this.state.ranges[this.state.v1])

          // violin 2
          var violin2Data = this.state.samples[date.toISOString().split('T')[0]][this.state.v2]
          // Violin_2.play(violin2Data, temp, this.state.ranges[this.state.v2])

          // viola
          var violaData = this.state.samples[date.toISOString().split('T')[0]][this.state.vla]
          // Viola.play(violaData, temp, this.state.ranges[this.state.vla])

          // violoncello
          var celloData = this.state.samples[date.toISOString().split('T')[0]][this.state.vcl]
          // Violoncello.play(celloData, temp, this.state.ranges[this.state.vcl])

          sampleCount++
          console.log(`played ${sampleCount} samples.`)
        }

        if (date.toISOString().toString() === '2016-10-31T00:00:00.000Z') {
          console.log('the piece is over!')
          clearInterval(sampleSequence)
          return;
        }

        startDate.setDate(startDate.getDate() + 1) // --> increments the day by 1 (destructive)

      }, 62.9)


    return sampleSequence;

  }

  render() {
    return (
      <div>
        <h1>App.js is connected and working!</h1>
        <button id="createButton" onClick={this.create}>Clicks</button>
        <button id="playButton" onClick={this.play}>PLAY</button>
        <Cats />
      </div>
    )
  }
}

export default App;