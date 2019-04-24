// const hiroMarker = d3.select("#marker-hiro");
// const bangorMarker = d3.select("#custom_marker-bangor");

const oxygenMarker = document.querySelector("#custom_marker-oxygen");
const hydrogenMarker = document.querySelector("#custom_marker-hydrogen");
const hydrogenObj = document.querySelector('#hydrogen-obj');
const oxygenObj = document.querySelector('#oxygen-obj');
const origin = {x: 0, y: 0, z: 0};
var interpolateMag = 0.025;

function getDistance(p1, p2) {
  let dx = p1.x - p2.x;
  let dy = p1.y - p2.y;
  let dz = p1.z - p2.z;
  var distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
  // console.log('distance', distance);
  return distance;
}

function interpolatePosition(start, end, magnitude) {
  var distance = getDistance(start, end);
  var vec = {
    x: start.x - end.x,
    y: start.y - end.y,
    z: start.z - end.z
  }
  console.log('distance', distance);
  console.log('magnitude', magnitude);
  console.log('vec', vec);
  newPosition = {
    x: start.x + ((distance / magnitude) / vec.x),
    y: start.y + ((distance / magnitude ) / vec.y),
    z: start.z + ((distance / magnitude ) / vec.z)
  }
  return newPosition;
}

function updatePosition(obj) {
  interpolatePosition(obj.object3D.position, )
}

AFRAME.registerComponent('markerevents', {
  init: function () {

    this.tick = AFRAME.utils.throttleTick(this.tick, 50, this);
    var marker = this.el;

    // for console debugging detecting/losing targets and their positions
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

    // store positions of markers
    var oxygenPos = document.querySelector("#custom_marker-oxygen").object3D.position;
    var hydrogenPos = document.querySelector("#custom_marker-hydrogen").object3D.position;

    // update and display position of marker under the model
    if (oxygenMarker.object3D.visible) {
      let oxygenText = "x = " + oxygenPos.x.toFixed(3).toString()
        + "\ny = " + oxygenPos.y.toFixed(3).toString()
        + "\nz = " + oxygenPos.z.toFixed(3).toString();
      document.querySelector('#oxygen-label').setAttribute('text', { value: oxygenText });
    }

    // update and display position of marker under the model
    if (hydrogenMarker.object3D.visible) {
      let hydrogenText = "x = " + hydrogenPos.x.toFixed(3).toString()
        + "\ny = " + hydrogenPos.y.toFixed(3).toString()
        + "\nz = " + hydrogenPos.z.toFixed(3).toString();
      document.querySelector('#hydrogen-label').setAttribute('text', { value: hydrogenText });
    }

    // if both markers are visible, get distance between markers
    if (oxygenMarker.object3D.visible && hydrogenMarker.object3D.visible) {

      var oxPos = oxygenMarker.object3D.position;
      var hyPos = hydrogenMarker.object3D.position;

      var distance = getDistance(
        oxygenMarker.object3D.position,
        hydrogenMarker.object3D.position
      );

      // if markers are in close proximity, change text color green
      if (distance < 2) {
        // if (interpolateMag < 0.5)
        //   interpolateMag += 0.025;

        document.querySelector('#hydrogen-label').setAttribute('text', {
          color: '#00FF00'
        });
        document.querySelector('#oxygen-label').setAttribute('text', {
          color: '#00FF00'
        });

        document.querySelector('#distance-line').setAttribute('line', {
          start: { x: oxPos.x , y: oxPos.y , z: oxPos.z },
          end: { x: hyPos.x , y: hyPos.y , z: hyPos.z },
          color: '#00FF00',
          visible: true
        })

        let endOxPos = {
          x: (hydrogenMarker.object3D.position.x - oxygenMarker.object3D.position.x) / 2,
          y: (hydrogenMarker.object3D.position.y - oxygenMarker.object3D.position.y) / 2,
          z: (hydrogenMarker.object3D.position.z - oxygenMarker.object3D.position.z) / 2
        }
        let endHyPos = {
          x: (oxygenMarker.object3D.position.x - hydrogenMarker.object3D.position.x) / 2,
          y: (oxygenMarker.object3D.position.y - hydrogenMarker.object3D.position.y) / 2,
          z: (oxygenMarker.object3D.position.z - hydrogenMarker.object3D.position.z) / 2
        }

        console.log('endOxPos', endOxPos);
        console.log('endHyPos', endHyPos);

        let newHyPos = interpolatePosition(
          origin,
          endHyPos,
          interpolateMag
        );

        let newOxPos = interpolatePosition(
          origin,
          endOxPos,
          interpolateMag
        );

        hydrogenObj.setAttribute('position', {
          x: newHyPos.x,
          y: newHyPos.y,
          z: newHyPos.z
        });
        oxygenObj.setAttribute('position', {
          x: newOxPos.x,
          y: newOxPos.y,
          z: newOxPos.z
        });


      } else {
        // if (interpolateMag > 0.025)
        //   interpolateMag -= 0.025;

        document.querySelector('#hydrogen-label').setAttribute('text', {
          color: '#FF0000'
        });
        document.querySelector('#oxygen-label').setAttribute('text', {
          color: '#FF0000'
        });

        document.querySelector('#distance-line').setAttribute('line', {
          start: { x: oxPos.x , y: oxPos.y , z: oxPos.z },
          end: { x: hyPos.x , y: hyPos.y , z: hyPos.z },
          color: '#FF0000',
          visible: true
        });

        // let newHyPos = interpolatePosition(
        //   origin,
        //   endHyPos,
        //   interpolateMag
        // );
        //
        // let newOxPos = interpolatePosition(
        //   origin,
        //   endOxPos,
        //   interpolateMag
        // );

        hydrogenObj.setAttribute('position', {
          x: 0,
          y: 0,
          z: 0
        });
        oxygenObj.setAttribute('position', {
          x: 0,
          y: 0,
          z: 0
        });

      }

      // let newOxPos = interpolatePosition(
      //   oxygenMarker,
      //   hydrogenMarker,
      //   interpolateMag
      // );

      // let newHyPos = interpolatePosition(
      //   hydrogenMarker,
      //   oxygenMarker,
      //   interpolateMag
      // );


    } else {
      document.querySelector('#distance-line').setAttribute('line', {
        visible: false
      })
    }

  }
});
