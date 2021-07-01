const Tone = require('tone')

module.exports = class Instrument {
  constructor(name, low, mid, high, minMax) {
    this.name = name
    this.low = low;
    this.mid = mid;
    this.high = high;
    this.min = minMax[0];
    this.max = minMax[1];
    this.synth = new Tone.Synth()
    this.val = 196;
    this.alt = 1760;
    this.pattern = new Tone.Pattern((time, note) => {
      // the order of the notes passed in depends on the pattern
      console.log('in pattern!')
      this.synth.triggerAttackRelease(note, "8n")
    }, [this.val, this.alt], "upDown");
    // this.loop = new Tone.Loop((time) => {
    //   //  this.synth.triggerAttackRelease(alt, "8n", now)
    //   //  this.synth.triggerAttackRelease(alt, "8n", now)

    // })


    this.now = Tone.now()
    this.synth.connect(Tone.Master)
    this.play = this.play.bind(this)
  }

  changeSpecs(spec, callback) {
    callback()
  }

  play(spec, temp, control) {

    var val = this.low + ((spec - this.min) * (this.high - this.low) / (this.max - this.min))
    var alt = this.low + ((spec - this.min) * (this.mid - this.low) / (this.max - this.min))


    console.log(`val and alt for ${this.name}: `, this.val, this.alt)





    // if (control === 'off') {
    //   this.pattern.stop()
    //   //this.synth.disconnect()
    // } else {
    // console.log('playing')
    //setTimeout(this.synth.triggerAttackRelease(val, "8n"), 0)
    //this.synth.triggerAttackRelease(this.val, "8n")
    //  this.synth.triggerAttackRelease(this.alt, "8n", this.now + 0.5)
    //  this.synth.triggerAttackRelease(this.val, "8n", this.now + 1)
    this.pattern.stop()
    Tone.Transport.stop();
    this.pattern.set({
      values: [val, alt]
    })
    this.pattern.loop = true;
    this.pattern.interval = 0.1;

    Tone.Transport.start();
    this.pattern.start();
    //}

  }

}


// var pattern = new Tone.Pattern((time, note) => {
//   // the order of the notes passed in depends on the pattern
//   console.log('in pattern!')
//   this.synth.triggerAttackRelease(note, "8n")
// }, [val, alt, alt, val], "upDown");

// pattern.loop = false;
// pattern.interval = 0.1;

 // Tone.Transport.start();
 // pattern.start();

