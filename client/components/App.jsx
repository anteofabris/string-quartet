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
      samples: {}
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


    var startDate = new Date('1995-12-17T00:00:00Z')
    startDate.setDate(startDate.getDate() + 1)
    console.log('this is startDate: ', startDate)

    var sampleSequence = (date) => {

      // if day exists in this.samples
      if (this.state.samples[date.toISOString()]) {
        // play the values with toneJS

        // if it is the last day
        // return console.log('done!')
      }

      //sampleSequence(date + 1)

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