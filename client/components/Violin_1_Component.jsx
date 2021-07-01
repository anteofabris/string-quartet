import React from 'react';
import * as Tone from 'tone';

class Violin_1 extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pattern: new Tone.Pattern((time, note) => {
        console.log('in pattern!')
        synth.triggerAttackRelease(note, "8n")
      }, [value, alt], "upDown")
    }
  }

  componentDidMount() {
    console.log('violin1 here!')


  var a = 196
  var b = 3520
  var c = 1760
  var min = minMax[0]
  var max = minMax[1]
  var value = a + ((this.props.spec - this.props.min) * (b - a) / (this.props.max - this.props.min))
  var alt = a + ((this.props.spec - this.props.min) * (c - a) / (this.props.max - this.props.min))


  var synth = new Tone.Synth()
  synth.connect(Tone.Master)



  this.state.pattern.loop = false;
  this.state.pattern.interval = 0.1;
  //pattern.loopEnd = "32n";


    Tone.Transport.start();
    this.state.pattern.start(0);




  }

  componentDidUpdate(prevprops) {


  }

  render() {
    return(<div>VIOLIN</div>)
  }
}

export default Violin_1;