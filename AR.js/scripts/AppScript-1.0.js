// const hiroMarker = d3.select("#marker-hiro");
// const bangorMarker = d3.select("#custom_marker-bangor");

const markerA = document.querySelector("#marker_a");
const markerB = document.querySelector("#marker_b");
const objectA = document.querySelector('#obj-a');
const objectB = document.querySelector('#obj-b');
var markerAVector;
var markerBVector;
var objectAPos = new THREE.Vector3();
var objectBPos = new THREE.Vector3();
const origin = new THREE.Vector3(0, 0, 0);
var interpolateMag = 0.05;
var debug = true;

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
    x: end.x - start.x,
    y: end.y - start.y,
    z: end.z - start.z
  }
  console.log('distance', distance);
  console.log('magnitude', magnitude);
  console.log('vec', vec);
  newPosition = {
    x: start.x + (((distance / magnitude) / vec.x) / distance),
    y: start.y + (((distance / magnitude) / vec.y) / distance),
    z: start.z + (((distance / magnitude) / vec.z) / distance)
  }
  return newPosition;
}

AFRAME.registerComponent('markerevents', {
  init: function () {

    this.tick = AFRAME.utils.throttleTick(this.tick, 50, this);
    var marker = this.el;

    // for console debugging detecting/losing targets and their positions
    function debugLog(m) {
      console.log('markerFound', m.id);
      console.log(m.getAttribute('position'));
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
    markerAVector = new THREE.Vector3(
      markerA.object3D.position.x,
      markerA.object3D.position.y,
      markerA.object3D.position.z
    );
    markerBVector = new THREE.Vector3(
      markerB.object3D.position.x,
      markerB.object3D.position.y,
      markerB.object3D.position.z
    );

    if (debug) {
      // update and display position of marker under the model
      if (markerA.object3D.visible) {
        let markerAText = "x = " + markerAVector.x.toFixed(3).toString()
          + "\ny = " + markerAVector.y.toFixed(3).toString()
          + "\nz = " + markerAVector.z.toFixed(3).toString()
          + "\nrotation = " + markerA.getAttribute('rotation').x.toFixed(3)
          + ", " + markerA.getAttribute('rotation').y.toFixed(3)
          + ", " + markerA.getAttribute('rotation').z.toFixed(3);
          document.querySelector('#marker-a-label').setAttribute('text', { value: markerAText });
      }

      // update and display position of marker under the model
      if (markerB.object3D.visible) {
        let markerBText = "x = " + markerBVector.x.toFixed(3).toString()
          + "\ny = " + markerBVector.y.toFixed(3).toString()
          + "\nz = " + markerBVector.z.toFixed(3).toString()
          + "\nrotation = " + markerB.getAttribute('rotation').x.toFixed(3)
          + ", " + markerB.getAttribute('rotation').y.toFixed(3)
          + ", " + markerB.getAttribute('rotation').z.toFixed(3);
        document.querySelector('#marker-b-label').setAttribute('text', { value: markerBText });
      }
    }

    // if both markers are visible, get distance between markers
    if (markerA.object3D.visible && markerB.object3D.visible) {

      var markerAVector = markerA.object3D.position;
      var markerBVector = markerB.object3D.position;

      var distance = getDistance(
        markerA.object3D.position,
        markerB.object3D.position
      );

      // if markers are in close proximity, update position
      if (distance < 2) {
        if (interpolateMag < 1.0)
          interpolateMag += 0.05;
        else
          interpolateMag = 1;


        if (debug) {
          // set debug text of coordinates to green
          document.querySelector('#marker-b-label').setAttribute('text', {
            color: '#00FF00'
          });
          document.querySelector('#marker-a-label').setAttribute('text', {
            color: '#00FF00'
          });

          document.querySelector('#distance-line').setAttribute('line', {
            start: { x: markerAVector.x , y: markerAVector.y , z: markerAVector.z },
            end: { x: markerBVector.x , y: markerBVector.y , z: markerBVector.z },
            color: '#00FF00',
            visible: true
          });
        }

        // end positions for both are set to the midpoint between the markers
        // used as a value to offset the 3d objects on their origin
        let aEndPos = new THREE.Vector3(
          (markerB.object3D.position.x - markerA.object3D.position.x) / 2,
          (markerB.object3D.position.y - markerA.object3D.position.y) / 2,
          (markerB.object3D.position.z - markerA.object3D.position.z) / 2
        );
        let bEndPos = new THREE.Vector3(
          (markerA.object3D.position.x - markerB.object3D.position.x) / 2,
          (markerA.object3D.position.y - markerB.object3D.position.y) / 2,
          (markerA.object3D.position.z - markerB.object3D.position.z) / 2
        );

        console.log('aEndPos', aEndPos);
        console.log('bEndPos', bEndPos);

        // linear interpolation between the objects origin and the mid point
        // of the two
        let newPosA = origin.lerp(aEndPos, interpolateMag);
        let newPosB = origin.lerp(bEndPos, interpolateMag);

        objectA.setAttribute('position', {
          x: newPosA.x,
          y: newPosA.y,
          z: newPosA.z
        });
        objectB.setAttribute('position', {
          x: newPosB.x,
          y: newPosB.y,
          z: newPosB.z
        });

      } else {
        if (interpolateMag > 0.00)
          interpolateMag -= 0.05;
          else
            interpolateMag = 0;

        if (debug) {
          document.querySelector('#marker-b-label').setAttribute('text', {
            color: '#FF0000'
          });
          document.querySelector('#marker-a-label').setAttribute('text', {
            color: '#FF0000'
          });

          document.querySelector('#distance-line').setAttribute('line', {
            start: { x: markerAVector.x , y: markerAVector.y , z: markerAVector.z },
            end: { x: markerBVector.x , y: markerBVector.y , z: markerBVector.z },
            color: '#FF0000',
            visible: true
          });
        }

        let aEndPos = new THREE.Vector3(
          (markerB.object3D.position.x - markerA.object3D.position.x) / 2,
          (markerB.object3D.position.y - markerA.object3D.position.y) / 2,
          (markerB.object3D.position.z - markerA.object3D.position.z) / 2
        );
        let bEndPos = new THREE.Vector3(
          (markerA.object3D.position.x - markerB.object3D.position.x) / 2,
          (markerA.object3D.position.y - markerB.object3D.position.y) / 2,
          (markerA.object3D.position.z - markerB.object3D.position.z) / 2
        );

        let newPosA = origin.lerp(aEndPos, interpolateMag);
        let newPosB = origin.lerp(bEndPos, interpolateMag);

        objectA.setAttribute('position', {
          x: newPosA.x,
          y: newPosA.y,
          z: newPosA.z
        });
        objectB.setAttribute('position', {
          x: newPosB.x,
          y: newPosB.y,
          z: newPosB.z
        });

      }

      // let newOxPos = interpolatePosition(
      //   markerA.object3D.position,
      //   markerB.object3D.position,
      //   interpolateMag
      // );

      // let newHyPos = interpolatePosition(
      //   markerB.object3D.position,
      //   markerA.object3D.position,
      //   interpolateMag
      // );


    } else {

      objectB.setAttribute('position', {
        x: origin.x,
        y: origin.y,
        z: origin.z
      });
      objectA.setAttribute('position', {
        x: origin.x,
        y: origin.y,
        z: origin.z
      });

      if (debug) {
        document.querySelector('#distance-line').setAttribute('line', {
          visible: false
        })
      }

    }

  }
});
