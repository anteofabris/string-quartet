import React from 'react';
import Cats from './Cats.jsx';
import * as Tone from 'tone';
// import context from 'startaudiocontext';

class App extends React.Component {
  constructor(props) {
    super(props)

    this.create = this.create.bind(this)
  }

  componentDidMount() {


  }

  create() {

    var osc = new Tone.Oscillator()
    osc.connect(Tone.Master)
    osc.start()

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