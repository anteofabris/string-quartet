const Tone = require('tone')

module.exports = class Instrument {
  constructor(name, low, mid, high, choice, minMax, tempRange) {
    this.name = name
    this.low = low;
    this.mid = mid;
    this.high = high;
    this.choice = choice
    this.min = minMax[0];
    this.max = minMax[1];
    this.synth = new Tone.Synth()
    this.val = 196;
    this.alt = 1760;
    this.tempRange = tempRange

    this.pattern = new Tone.Pattern((time, note) => {

      this.synth.triggerAttackRelease(note, "8n")
    }, [this.val, this.alt], "upDown");

    this.now = Tone.now()
    this.synth.connect(Tone.Master)
    this.play = this.play.bind(this)
  }

  stop() {
    this.synth.triggerRelease()
  }

  play(spec, temp, control) {

    var val = this.low + ((spec - this.min) * (this.high - this.low) / (this.max - this.min))
    var alt = this.low + ((spec - this.min) * (this.mid - this.low) / (this.max - this.min))
    var cho = this.low + ((spec - this.min) * (this.choice - this.low) / (this.max - this.min))

    var minTemp = this.tempRange[0]
    var maxTemp = this.tempRange[1]
    var tempVal = Math.round(((temp - minTemp) / (maxTemp - minTemp)) * 7)
    var tempInterval = (temp - minTemp) / (maxTemp - minTemp)

    console.log(`val and alt for ${this.name}: `, this.val, this.alt)
    //  console.log('tempVal:', tempVal, 'current val array: ', options[tempVal])
    console.log('tempInterval: ', tempInterval)


    this.synth.triggerRelease()
    this.synth.triggerAttack(alt)



  }

}

