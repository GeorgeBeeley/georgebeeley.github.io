// const hiroMarker = d3.select("#marker-hiro");
// const bangorMarker = d3.select("#custom_marker-bangor");
const oxygenMarker = document.querySelector("#custom_marker-oxygen");
const hydrogenMarker = document.querySelector("#custom_marker-hydrogen");

function getMarkerPos() {
  if (oxygenPresent && hydrogenPresent) {
    var oxygenPos = oxygenMarker.object3D.position;
    var hydrogenPos = hydrogenMarker.object3D.position;
    var distance = Math.sqrt((oxygenPos.x - hydrogenPos.x)^2 + (oxygenPos.y - hydrogenPos.y)^2 + (oxygenPos.z - hydrogenPos.z)^2);
    console.log('distance', distance);
  }
}

// AFRAME.registreComponent('distanceline', {
//   init: function () {
//
//     this.update =
//   }
// })

AFRAME.registerComponent('markerevents', {
  init: function () {

    this.tick = AFRAME.utils.throttleTick(this.tick, 500, this);
    var marker = this.el;

    function debugLog(m) {
      console.log('markerFound', m.id);
      console.log(m.getAttribute('position'));
      console.log('hydrogen', hydrogenMarker.object3D.visible);
      console.log('oxygen', oxygenMarker.object3D.visible);
    }

    marker.addEventListener('markerFound', function() {
      // debugLog(marker);
    });

    marker.addEventListener('markerLost', function() {
      // debugLog(marker);
    });

  },
  tick: function(t, dt) {

    var oxygenPos = oxygenMarker.object3D.position;
    var hydrogenPos = hydrogenMarker.object3D.position;

    if (oxygenMarker.object3D.visible) {
      let oxygenText = "x = " + oxygenPos.x.toFixed(3).toString()
        + "\ny = " + oxygenPos.y.toFixed(3).toString()
        + "\nz = " + oxygenPos.z.toFixed(3).toString();
      document.querySelector('#oxygen-label').setAttribute('text', { value: oxygenText });
    }

    if (hydrogenMarker.object3D.visible) {
      let hydrogenText = "x = " + hydrogenPos.x.toFixed(3).toString()
        + "\ny = " + hydrogenPos.y.toFixed(3).toString()
        + "\nz = " + hydrogenPos.z.toFixed(3).toString();
      document.querySelector('#hydrogen-label').setAttribute('text', { value: hydrogenText });
    }

    if (oxygenMarker.object3D.visible && hydrogenMarker.object3D.visible) {
      let magOxPos = oxygenPos * 100;
      let magHyPos = hydrogenPos * 100;
      let distance = Math.sqrt((magOxPos.x - magHyPos.x)^2 + (magOxPos.y - magHyPos.y)^2 + (magOxPos.z - magHyPos.z)^2);

      // currently the line coordinates are only updated once and are not refreshed
      document.querySelector('#distance-line').setAttribute('line', {
        start: oxygenPos,
        end: hydrogenPos
      });
      console.log('distance', distance);
    }

  }
});
