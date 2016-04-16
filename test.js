'use strict';

var huejay = require('huejay');
let client = new huejay.Client({
  host: '192.168.0.9',
  username: 'cUbhu5QBLX-R-TNNhDqKQAD2VAwoVDOtBUf56TNb',
  timeout: 15000
});

var changeLights = function(n) {

    // for (var i = 1; i < 4; i++) {
      client.lights.getById(n)
        .then(light => {
          console.log(`Saving light...`);

          light.hue                 = Math.floor(Math.random()*65355);
          light.saturation          = Math.floor(Math.random()*255);
          light.brightness          = Math.floor(Math.random()*255);
          light.transitionTime      = 10;

          return client.lights.save(light);
        })
        .then(light => {
          console.log('New hue:', light.hue);
          console.log('New saturation:', light.saturation);
        })
        .catch(error => {
          console.log(error.stack);
        })
    // }

}
changeLights(2);
setInterval(function() {
  changeLights(2);
} ,10000);


client.lights.getAll()
  .then(lights => {
    for (let light of lights) {
      light.hue                 = 1;
      light.saturation          = 80;
      light.brightness          = 50;
      light.transitionTime      = 5;
      console.log(`Light [${light.id}]: ${light.name}`);
      console.log(`  Type:             ${light.type}`);
      console.log(`  Unique ID:        ${light.uniqueId}`);
      console.log(`  Manufacturer:     ${light.manufacturer}`);
      console.log(`  Model Id:         ${light.modelId}`);
      console.log('  Model:');
      console.log(`    Id:             ${light.model.id}`);
      console.log(`    Manufacturer:   ${light.model.manufacturer}`);
      console.log(`    Name:           ${light.model.name}`);
      console.log(`    Type:           ${light.model.type}`);
      console.log(`    Color Gamut:    ${light.model.colorGamut}`);
      console.log(`    Friends of Hue: ${light.model.friendsOfHue}`);
      console.log(`  Software Version: ${light.softwareVersion}`);
      console.log('  State:');
      console.log(`    On:         ${light.on}`);
      console.log(`    Reachable:  ${light.reachable}`);
      console.log(`    Brightness: ${light.brightness}`);
      console.log(`    Color mode: ${light.colorMode}`);
      console.log(`    Hue:        ${light.hue}`);
      console.log(`    Saturation: ${light.saturation}`);
      console.log(`    X/Y:        ${light.xy[0]}, ${light.xy[1]}`);
      console.log(`    Color Temp: ${light.colorTemp}`);
      console.log(`    Alert:      ${light.alert}`);
      console.log(`    Effect:     ${light.effect}`);
      console.log();
    }
  })
  .catch(error => {
    console.log(error.stack);
  });
