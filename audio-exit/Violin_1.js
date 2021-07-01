const Tone = require('tone')

// module.exports.play = (spec, temp, minMax, control) => {

//   // console.log('playing violin 1 lol', spec, temp, minMax)

//   // var osc = new Tone.Oscillator()
//   // osc.connect(Tone.Master)
//   // osc.start()
//   var a = 196
//   var b = 3520
//   var c = 1760
//   var min = minMax[0]
//   var max = minMax[1]
//   var value = a + ((spec - min) * (b - a) / (max - min))
//   var alt = a + ((spec - min) * (c - a) / (max - min))


//   var synth = new Tone.Synth()
//   synth.connect(Tone.Master)

//   const pattern = new Tone.Pattern((time, note) => {
//     // the order of the notes passed in depends on the pattern
//     console.log('in pattern!')
//     synth.triggerAttackRelease(note, "8n")
//   }, [value, alt], "upDown");

//   pattern.loop = false;
//   pattern.interval = 0.1;
//   //pattern.loopEnd = "32n";


//   if (control === 'off') {
//     Tone.Transport.stop()
//     pattern.stop()
//   } else {

//     Tone.Transport.start();
//     pattern.start(0);


//     //synth.triggerAttackRelease(value, "8n")
//   }

// }


module.exports = class Instrument {
  constructor(low, mid, high, minMax) {
    this.low = low;
    this.mid = mid;
    this.high = high;
    this.min = minMax[0];
    this.max = minMax[1];
    this.synth = new Tone.Synth()
    this.value = 0;
    this.alt = 0;
    this.pattern = new Tone.Pattern((time, note) => {
      // the order of the notes passed in depends on the pattern
      console.log('in pattern!')
      this.synth.triggerAttackRelease(note, "8n")
    }, [this.value, this.alt], "upDown");


  }

  play(spec, control) {
    this.synth.connect(Tone.Master)
    this.value = this.low + ((spec - this.min) * (this.high - this.low) / (this.max - this.min))
    this.alt = this.low + ((spec - this.min) * (this.mid - this.low) / (this.max - this.min))



    this.pattern.loop = false;
    this.pattern.interval = 0.1;

    if (control === 'off') {
      this.pattern.stop()
    } else {

      Tone.Transport.start();
      this.pattern.start(0);
    }

  }

}