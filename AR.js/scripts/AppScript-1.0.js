// const hiroMarker = d3.select("#marker-hiro");
// const bangorMarker = d3.select("#custom_marker-bangor");

const oxygenMarker = document.querySelector("#custom_marker-oxygen");
const hydrogenMarker = document.querySelector("#custom_marker-hydrogen");

function getDistance() {
  if (oxygenMarker.object3D.visible && hydrogenMarker.object3D.visible) {
    let oxygenPos = oxygenMarker.object3D.position;
    let hydrogenPos = hydrogenMarker.object3D.position;
    let dx = oxygenPos.x - hydrogenPos.x;
    let dy = oxygenPos.y - hydrogenPos.y;
    let dz = oxygenPos.z - hydrogenPos.z;
    var distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
    console.log('distance', distance);
    return distance;
  }
}

// AFRAME.registerComponent('distanceline', {
//   schema: {
//     event: {type: 'string', default: ''},
//     message: {type: 'string', default: 'test distanceLine message'}
//   },
//   init: function () {
//
//     // closure to access fresh 'this.data' from event handler context
//     var self = this;
//
//     // .init() is a good place to set up initial state and variables.
//     // Store a reference to the handler so we can later remove it.
//     this.evenHandlerFn = function() { console.log(self.data.message); };
//
//   },
//   update: function(oldData) {
//
//     var data = this.data;
//     var el = this.el;
//
//     if (oldData.event && data.event !== oldData.event) {
//       el.removeEventListener(oldData.event, this.eventHandlerFn);
//     }
//
//     if (data.event) {
//
//       el.addEventListener(data.event, function() {
//         console.log('Event specified, line Pos should be updated when event is triggered.');
//
//         if (oxygenMarker.object3D.visible && hydrogenMarker.object3D.visible) {
//           el.setAttribute(line, {
//             start: oxygenMarker.object3D.position,
//             end: hydrogenMarker.object3D.position
//           });
//         } else {
//           console.log('Error, both markers not visible');
//         }
//
//       });
//     } else {
//       console.log('Event not specified');
//     }
//
//
//     // var distance = getDistance();
//     //
//     // document.querySelector('#distance-line').setAttribute('line', {
//     //   this.data.start = oxygenPos,
//     //   this.data.end = hydrogenPos
//     // });
//
//     }
// });

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

    var oxygenPos = document.querySelector("#custom_marker-oxygen").object3D.position;
    var hydrogenPos = document.querySelector("#custom_marker-hydrogen").object3D.position;

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
      // document.querySelector('#distance-line').emit('bothVisible');

      var distance = getDistance();

      // currently the line coordinates are only updated once and are not refreshed
      if (distance < 2) {
        document.querySelector('#distance-line').setAttribute('line', {
          color: '#00FF00',
          start: oxygenPos,
          end: hydrogenPos
        });
      } else {
        document.querySelector('#distance-line').setAttribute('line', {
          color: '#FF0000',
          start: oxygenPos,
          end: hydrogenPos
        });
      }
      console.log('distance', distance);
    }

  }
});
