const Tone = require('tone')

module.exports.play = () => {

  var osc = new Tone.Oscillator()
  osc.connect(Tone.Master)
  osc.start()

}