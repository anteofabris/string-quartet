const Tone = require('tone')

module.exports.play = (spec, temp, minMax) => {
  console.log('playing viola lol', spec, temp, minMax)

  var a = 130.81
  var b = 1318.51
  var min = minMax[0]
  var max = minMax[1]
  var value = a + ((spec - min) * (b - a) / (max - min))

  var synth = new Tone.Synth()
  synth.connect(Tone.Master)
  synth.triggerAttackRelease(value, "8n")

}