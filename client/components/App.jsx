import React from 'react';
import Cats from './Cats.jsx';
import * as Tone from 'tone';
// import context from 'startaudiocontext';

class App extends React.Component {
  constructor(props) {
    super(props)

    // const something = new Tone.Synth().toDestination()
    // const noise = new Tone.Noise({
    // 	volume: -10,
    // 	type: "brown"
    // }).toDestination();

    // const toneWaveform = new Tone.Waveform();
    // noise.connect(toneWaveform);
    // waveform({
    // 	parent: document.querySelector("#content"),
    // 	tone: toneWaveform,
    // });

    // ui({
    // 	parent: document.querySelector("#content"),
    // 	tone: noise
    // });

    this.create = this.create.bind(this)
  }

  componentDidMount() {


  }

  create() {
    // console.log('audoContext:', context)
    // StartAudioContext(context, "#playButton")
    // noise.start()

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