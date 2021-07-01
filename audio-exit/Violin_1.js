const Tone = require('tone')

module.exports = class Instrument {
  constructor(low, mid, high, minMax) {
    this.low = low;
    this.mid = mid;
    this.high = high;
    this.min = minMax[0];
    this.max = minMax[1];
    this.synth = new Tone.Synth()
    this.value = 196;
    this.alt = 1760;


  }

  play(spec, temp, control) {
    this.synth.connect(Tone.Master)
    var val = this.low + ((spec - this.min) * (this.high - this.low) / (this.max - this.min))
    var alt = this.low + ((spec - this.min) * (this.mid - this.low) / (this.max - this.min))

    var pattern = new Tone.Pattern((time, note) => {
      // the order of the notes passed in depends on the pattern
      console.log('in pattern!')
      this.synth.triggerAttackRelease(note, "8n")
    }, [val, alt], "upDown");


    pattern.loop = false;
    pattern.interval = 0.1;

    if (control === 'off') {
      //this.pattern.stop()
      this.synth.disconnect()
    } else {
      // this.synth.triggerAttackRelease(this.value, "8n")
      Tone.Transport.start();
      pattern.start();
    }

  }

}