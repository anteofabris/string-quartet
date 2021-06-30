const Tone = require('tone')

module.exports.play = (spec, temp, minMax) => {
  console.log('playing violin 1 lol', spec, temp, minMax)

  // var osc = new Tone.Oscillator()
  // osc.connect(Tone.Master)
  // osc.start()

  var a = 196
  var b = 3520
  var c = 1760
  var min = minMax[0]
  var max = minMax[1]
  var value = a + ((spec - min) * (b - a) / (max - min))
  var alt = a + ((spec - min) * (c - a) / (max - min))


  var synth = new Tone.Synth()
  synth.connect(Tone.Master)

  const pattern = new Tone.Pattern((time, note) => {
    // the order of the notes passed in depends on the pattern
    console.log('in pattern!')
    synth.triggerAttackRelease(note, "8n")
  }, [value, alt], "upDown");

  pattern.loop = false;
  pattern.interval = 0.1;
  //pattern.loopEnd = "32n";


    Tone.Transport.start();
    pattern.start(0);







  //synth.triggerAttackRelease(value, "8n")

}
