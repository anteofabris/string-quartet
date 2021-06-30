const Tone = require('tone')

module.exports.play = (spec, temp) => {

  var osc = new Tone.Oscillator()
  osc.connect(Tone.Master)
  osc.start()

}