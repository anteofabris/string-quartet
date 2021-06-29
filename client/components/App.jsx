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
  }

  componentDidMount() {
    console.log('mountedn')
    axios
    .get('/samples')
    .then((res) => {
      console.log('got res! ', res)
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

  play () {

    // this needs to be async
    // create a day variable set to earliest date in object
    // create a setInterval function, update every 100 (for now) milliseconds
  }

  render() {
    return (
      <div>
        <h1>App.js is connected and working!</h1>
        <button id="playButton" onClick={this.create}>Clicks</button>
        <Cats />
      </div>
    )
  }
}

export default App;