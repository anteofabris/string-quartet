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
          samples: res.data
        })
      })
      .catch((err) => {
        console.log('err getting data! ', err)
      })

  }

  create() {



  }

  play() {

    var startDate = new Date('1995-01-04T00:00:00.000Z')

    var sampleSequence = (date) => {
     console.log('exists?', this.state.samples[date.toISOString().toString()])
      // if day exists in this.samples
      if (this.state.samples[date.toISOString().toString()]) {

        var temp = this.state.samples[date.toISOString().toString()].bottom_sample_temperature_c
        var violin1Data = this.state.samples[date.toISOString().toString()][this.state.v1]
        Violin_1.play(violin1Data, temp)

        // if it is the last day
        if (date.toISOString().toString() === '2016-10-31T00:00:00.000Z') {
        console.log('the piece is over!')
        return;
        }
      }
      // date.setDate(startDate.getDate() + 1) // --> increments the day by 1 (destructive)
      // setTimeOut(sampleSequence(date), 10)

    }
    sampleSequence(startDate)
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