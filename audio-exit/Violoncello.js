const Tone = require('tone')

module.exports.play = (spec, temp) => {

  var a = 65.41
  var b = 1046.5
  var min = minMax[0]
  var max = minMax[1]
  var value = a + ((spec - min) * (b - a) / (max - min))

  var synth = new Tone.Synth()
  synth.connect(Tone.Master)
  synth.triggerAttackRelease(value, "8n")

}