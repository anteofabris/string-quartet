import React from 'react';
import Cats from './Cats.jsx';
import * as Tone from 'tone';
import axios from 'axios';
// import context from 'startaudiocontext';

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

    var osc = new Tone.Oscillator()
    osc.connect(Tone.Master)
    osc.start()

  }

  play() {
    console.log('operations on first date: ', Object.keys(this.state.samples)[0])
    // this needs to be async
    // create a day variable set to earliest date in object
    var day = new Date('1995-12-17T00:00:00')
    console.log('this is day: ', day)

    // create a recursive function with a setTimeOut function
    // if day exists in this.samples
    // play the values with toneJS
    // call recursive function after a setTimeOut of 10ms (for now)
    // if it is the last day
    // return console.log('done!')
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