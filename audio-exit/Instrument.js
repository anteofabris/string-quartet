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

      this.synth.triggerAttackRelease(note, "8n")
    }, [this.val, this.alt], "upDown");

    this.now = Tone.now()
    this.synth.connect(Tone.Master)
    this.play = this.play.bind(this)
  }

  changeSpecs(spec, callback) {
    callback()
  }

  stop() {
    this.pattern.stop()
    Tone.Transport.stop();
  }

  play(spec, temp, control) {

    var val = this.low + ((spec - this.min) * (this.high - this.low) / (this.max - this.min))
    var alt = this.low + ((spec - this.min) * (this.mid - this.low) / (this.max - this.min))


    console.log(`val and alt for ${this.name}: `, this.val, this.alt)


    this.pattern.stop()
    Tone.Transport.stop();
    this.pattern.set({
      values: [val, alt]
    })
    this.pattern.loop = true;
    this.pattern.interval = 0.1;

    Tone.Transport.start();
    this.pattern.start();


  }

}