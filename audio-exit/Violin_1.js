const Tone = require('tone')

module.exports.play = (spec, temp) => {
  console.log('playing the violin lol', spec, temp)

  // var osc = new Tone.Oscillator()
  // osc.connect(Tone.Master)
  // osc.start()

  var synth = new Tone.Synth()
  synth.connect(Tone.Master)
  synth.triggerAttackRelease(220, "8n")

}