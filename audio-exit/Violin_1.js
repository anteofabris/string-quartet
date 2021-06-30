const Tone = require('tone')

module.exports.play = (spec, temp, minMax) => {
  //console.log('playing the violin lol', spec, temp, minMax)

  // var osc = new Tone.Oscillator()
  // osc.connect(Tone.Master)
  // osc.start()

  var a = 196
  var b = 3520
  var min = minMax[0]
  var max = minMax[1]
  var value = a + ((spec - min) * (b - a) / (max - min))

  var synth = new Tone.Synth()
  synth.connect(Tone.Master)
  synth.triggerAttackRelease(value, "8n")

}
