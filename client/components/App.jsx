import React from 'react';
import * as Tone from 'tone';
import axios from 'axios';
import Instrument from '../../audio-exit/Instrument.js'



class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      samples: {},
      v1: 'winkler_method_top_dissolved_oxygen_mg_l',
      v2: 'bottom_salinity_psu',
      vla: 'bottom_ph',
      vcl: 'light_trans_transparency_bottom_sample',
      sampleCount: 0
    }
    this.play = this.play.bind(this)
    this.stop = this.stop.bind(this)
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
      .then(() => {
        this.setState({
          Violin1: new Instrument('Violin1', 196, 1760, 3520, 440, this.state.ranges[this.state.v1], this.state.ranges['bottom_sample_temperature_c']),
          Violin2: new Instrument('Violin2', 196, 1760, 3520, 440, this.state.ranges[this.state.v2].reverse(), this.state.ranges['bottom_sample_temperature_c']),
          Viola: new Instrument('Viola', 130.81, 659.255, 1318.51, 440, this.state.ranges[this.state.vla], this.state.ranges['bottom_sample_temperature_c']),
          Violoncello: new Instrument('Violincello', 65.41, 523.25, 1046.5, 440, this.state.ranges[this.state.vcl], this.state.ranges['bottom_sample_temperature_c'])

        })
      })
      .then(() => {
        console.log('ready to play!')
      })
      .catch((err) => {
        console.log('err getting data! ', err)
      })

  }

  stop() {

    this.state.Violin1.stop()
    this.state.Violin2.stop()
    this.state.Viola.stop()
    this.state.Violoncello.stop()

  }

  play() {
    var startDate = new Date('1995-01-04T00:00:00.000Z')
    var sampleCount = 0

    var sampleSequence =
      setInterval(() => {
        var date = startDate
        console.log('new day', date)

        if (this.state.samples[date.toISOString().split('T')[0]] !== undefined) {

          // get temperature
          var temp = this.state.samples[date.toISOString().split('T')[0]].bottom_sample_temperature_c

          var violin1Spec = this.state.samples[date.toISOString().split('T')[0]][this.state.v1]
          var violin2Spec = this.state.samples[date.toISOString().split('T')[0]][this.state.v2]
          var violaSpec = this.state.samples[date.toISOString().split('T')[0]][this.state.vla]
          var celloSpec = this.state.samples[date.toISOString().split('T')[0]][this.state.vcl]

          this.state.Violin1.play(violin1Spec, temp, 'on')
          this.state.Violin2.play(violin2Spec, temp, 'on')
          this.state.Viola.play(violaSpec, temp, 'on')
          this.state.Violoncello.play(celloSpec, temp, 'on')

          sampleCount++
          console.log(`played ${sampleCount} samples.`)


        }
        if (date.toISOString().toString() === '2016-10-31T00:00:00.000Z') {
          this.state.Violin1.stop()
          this.state.Violin2.stop()
          this.state.Viola.stop()
          this.state.Violoncello.stop()
          clearInterval(sampleSequence)
          console.log('the piece is over!')
          return;
        }
        startDate.setDate(startDate.getDate() + 1) // --> increments the day by 1 (destructive)
      }, 62.9)
    return sampleSequence;

  }

  render() {

    return (
      <div>
        <h1>This will eventually be a string quartet</h1>
        <button id="playButton" onClick={this.play}>PLAY</button>
        <button id="stopButton" onClick={this.stop}>STOP</button>
      </div>
    )


  }
}

export default App;