import React from 'react';
import * as Tone from 'tone';
import axios from 'axios';
import Instrument from '../../audio-exit/Violin_1.js'
import Violin_2 from '../../audio-exit/Violin_2.js'
import Viola from '../../audio-exit/Viola.js'
import Violoncello from '../../audio-exit/Violoncello.js'
import Violin_1_Component from './Violin_1_Component.jsx'


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      playPressed: false,
      samples: {},
      v1: 'winkler_method_top_dissolved_oxygen_mg_l',
      v2: 'bottom_salinity_psu',
      vla: 'bottom_ph',
      vcl: 'light_trans_transparency_bottom_sample',
      sampleCount: 0
    }
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


  play() {
    var startDate = new Date('1995-01-04T00:00:00.000Z')
    var sampleCount = 0
    // this.setState({
    //   playPressed: true
    // })
    var Violin1 = new Instrument(196, 1760, 3520, this.state.ranges[this.state.v1])
    var Violin2 = new Instrument(196, 1760, 3520, this.state.ranges[this.state.v2])
    var Viola = new Instrument(130.81, 659.255, 1318.51, this.state.ranges[this.state.vla])
    var Violoncello = new Instrument(65.41, 523.25, 1046.5, this.state.ranges[this.state.vcl])


    var sampleSequence =
      setInterval(() => {
        var date = startDate
        console.log('new day', date)

        if (this.state.samples[date.toISOString().split('T')[0]] !== undefined) {
          Violin1.play(0, 0, 'off')
          Violin2.play(0, 0, 'off')
          Viola.play(0, 0, 'off')
          Violoncello.play(0, 0, 'off')

          // get temperature
          var temp = this.state.samples[date.toISOString().split('T')[0]].bottom_sample_temperature_c
          var violin1Spec = this.state.samples[date.toISOString().split('T')[0]][this.state.v1]
          var violin2Spec = this.state.samples[date.toISOString().split('T')[0]][this.state.v2]
          var violaSpec = this.state.samples[date.toISOString().split('T')[0]][this.state.vla]
          var celloSpec = this.state.samples[date.toISOString().split('T')[0]][this.state.vcl]

          Violin1.play(violin1Spec, temp, 'on')
          Violin2.play(violin2Spec, temp, 'on')
          Viola.play(violaSpec, temp, 'on')
          Violoncello.play(celloSpec, temp, 'on')

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
    if (this.state.playPressed) {
    return (
      <div>
        <h1>This will eventually be a string quartet</h1>
        <button id="playButton" onClick={this.play}>PLAY</button>
        <Violin_1_Component />
      </div>
    )
    } else {
      return (
        <div>
          <h1>This will eventually be a string quartet</h1>
          <button id="playButton" onClick={this.play}>PLAY</button>
        </div>
      )

    }
  }
}

export default App;