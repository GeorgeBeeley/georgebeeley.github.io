const markerA = document.querySelector("#marker_a");
const markerB = document.querySelector("#marker_b");
const objectA = document.querySelector('#obj-a');
const objectB = document.querySelector('#obj-b');
const objectC = document.querySelector('#obj-c');
const origin = new THREE.Vector3(0, 0, 0);
var interpolateMag = 0;
var interpolateInc = 0.05;
var debug = true;
var markerAVector;
var markerBVector;
var objectAPos;
var objectBPos;

// Register marker components with functionality for proximity based interaction
// Functionality within the tick method
AFRAME.registerComponent('markerevents', {
  init: function () {

    this.tick = AFRAME.utils.throttleTick(this.tick, 10, this);
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

    // check if markerA is in view
    if (markerA.object3D.visible) {
      // store the position of the marker in a Vector3
      markerAVector = new THREE.Vector3(
        markerA.object3D.position.x,
        markerA.object3D.position.y,
        markerA.object3D.position.z
      );
      // if dubug mode true, display position and rotation above marker
      if (debug) {
        let markerAText = "x = " + markerAVector.x.toFixed(3).toString()
        + "\ny = " + markerAVector.y.toFixed(3).toString()
        + "\nz = " + markerAVector.z.toFixed(3).toString()
        + "\nrotation = " + markerA.getAttribute('rotation').x.toFixed(3)
        + ", " + markerA.getAttribute('rotation').y.toFixed(3)
        + ", " + markerA.getAttribute('rotation').z.toFixed(3);
        document.querySelector('#marker-a-label').setAttribute('text', { value: markerAText });
      }
    }

    // check if markerB is in view
    if (markerB.object3D.visible) {
      // store the position of the marker in a Vector3
      markerBVector = new THREE.Vector3(
        markerB.object3D.position.x,
        markerB.object3D.position.y,
        markerB.object3D.position.z
      );
      // if dubug mode true, display position and rotation above marker
      if (debug) {
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

      var distance = markerAVector.distanceTo(markerBVector);

      var aEndPos = new THREE.Vector3(
        (markerBVector.x - markerAVector.x) / 2,
        (markerBVector.y - markerAVector.y) / 2,
        (markerBVector.z - markerAVector.z) / 2
      );
      var bEndPos = new THREE.Vector3(
        (markerAVector.x - markerBVector.x) / 2,
        (markerAVector.y - markerBVector.y) / 2,
        (markerAVector.z - markerBVector.z) / 2
      );

      // if markers are in close proximity, update position
      if (distance < 2) {

        if (interpolateMag < 1.0)
          interpolateMag += interpolateInc;
        else if (interpolateMag >= 1.0) {
          interpolateMag = 1;
          objectA.setAttribute('visible', 'false');
          objectB.setAttribute('visible', 'false');
          objectC.setAttribute('visible', 'true');
        }

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

        let objAPos = origin.lerp(aEndPos, interpolateMag);
        objectA.setAttribute('position', {
          x: objAPos.x,
          y: objAPos.y,
          z: objAPos.z
        });
        objectC.setAttribute('position', {
          x: objAPos.x,
          y: objAPos.y,
          z: objAPos.z
        });
        let objBPos = origin.lerp(bEndPos, interpolateMag);
        objectB.setAttribute('position', {
          x: objBPos.x,
          y: objBPos.y,
          z: objBPos.z
        });

      } else {

        if (interpolateMag > 0.0) {
          interpolateMag -= interpolateInc;
          objectA.setAttribute('visible', 'true');
          objectB.setAttribute('visible', 'true');
          objectC.setAttribute('visible', 'false');
        }
        else if (interpolateMag < 0.0)
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

        let objAPos = origin.lerp(aEndPos, interpolateMag);
        objectA.setAttribute('position', {
          x: objAPos.x,
          y: objAPos.y,
          z: objAPos.z
        });
        objectC.setAttribute('position', {
          x: objAPos.x,
          y: objAPos.y,
          z: objAPos.z
        });
        let objBPos = origin.lerp(bEndPos, interpolateMag);
        objectB.setAttribute('position', {
          x: objBPos.x,
          y: objBPos.y,
          z: objBPos.z
        });
      }

    } else {

      objectA.setAttribute('position', {
        x: origin.x,
        y: origin.y,
        z: origin.z
      });
      objectB.setAttribute('position', {
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
