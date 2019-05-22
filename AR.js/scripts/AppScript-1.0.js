/*
Title: Immersive Analytical Visualisation of Periodic Elements and Compounds

Author: George Beeley

Date: 29/04/2019

Institution: Bangor University

Description: This script is required to register the functionality of the
elements that are positioned by the markers in AR.

*/

const el_scene            = document.querySelector('a-scene');
const el_markerA          = document.querySelector('#marker_a');
const el_markerB          = document.querySelector('#marker_b');
const el_elementA         = document.querySelector('#element-1');
const el_elementB         = document.querySelector('#element-2');
const el_compoundElement  = document.querySelector('#compound-element');
const v3_origin           = new THREE.Vector3(0, 0, 0);
var f_proximity           = 2;
var f_interpolateMag      = 0.0;
var f_interpolateInc      = 0.05;
var b_debug               = true;
var v3_markerAVector;
var v3_markerBVector;

// Triggered once the contents of the web page is done loading
// Displays FPS and load stress metrics if debug mode is enabled
function onLoadComplete() {
  if (b_debug) {
    el_scene.setAttribute('stats');
  }
}

// Used in dubug mode to set visibility of debug text to true to display
// position and rotation on top of marker
function displayDebugInfo(m) {
  let s_markerText = "x = " + m.object3D.position.x.toFixed(3).toString()
  + "\ny = " + m.object3D.position.y.toFixed(3).toString()
  + "\nz = " + m.object3D.position.z.toFixed(3).toString()
  + "\nrotation = " + m.getAttribute('rotation').x.toFixed(3)
  + ", " + m.getAttribute('rotation').y.toFixed(3)
  + ", " + m.getAttribute('rotation').z.toFixed(3);
  if (m === el_markerA)
    document.querySelector('#marker-a-label').setAttribute('text', { value: s_markerText });
  else if (m === el_markerB) {
    document.querySelector('#marker-b-label').setAttribute('text', { value: s_markerText });
  }
}

// For debugging scenario of markers being within designated proximity.
// Set colour of debug text and proximity ray to green, and set ray visibility to true
function updateDebugColour(b) {
  if (b) {
    document.querySelector('#marker-a-label').setAttribute('text', {
      color: '#00FF00'
    });
    document.querySelector('#marker-b-label').setAttribute('text', {
      color: '#00FF00'
    });
    document.querySelector('#distance-line').setAttribute('line', {
      color: '#00FF00'
    });
  } else {
    document.querySelector('#marker-a-label').setAttribute('text', {
      color: '#FF0000'
    });
    document.querySelector('#marker-b-label').setAttribute('text', {
      color: '#FF0000'
    });
    document.querySelector('#distance-line').setAttribute('line', {
      color: '#FF0000'
    });
  }
}

// for console debugging detecting/losing targets and their positions
function debugMarkerDiscovery(m) {
  console.log('markerFound', m.id);
  console.log(m.getAttribute('position'));
}

onLoadComplete();

// Register marker components with functionality for proximity based interaction
// Functionality within the tick method
AFRAME.registerComponent('markerevents', {
  init: function () {

    this.tick = AFRAME.utils.throttleTick(this.tick, 10, this);
    var el_marker = this.el;

    el_marker.addEventListener('markerFound', function() {
      // debugMarkerDiscovery(el_marker);
    });
    el_marker.addEventListener('markerLost', function() {
      // debugMarkerDiscovery(el_marker);
    });

  },
  tick: function(t, dt) {

    // check if el_markerA is in view
    if (el_markerA.object3D.visible) {
      // store the position of the marker in a Vector3
      v3_markerAVector = new THREE.Vector3(
        el_markerA.object3D.position.x,
        el_markerA.object3D.position.y,
        el_markerA.object3D.position.z
      );
      if (b_debug) {
        displayDebugInfo(el_markerA);
      }
    }

    // check if el_markerB is in view
    if (el_markerB.object3D.visible) {
      // store the position of the marker in a Vector3
      v3_markerBVector = new THREE.Vector3(
        el_markerB.object3D.position.x,
        el_markerB.object3D.position.y,
        el_markerB.object3D.position.z
      );
      if (b_debug) {
        displayDebugInfo(el_markerB);
      }
    }

    // if both markers are visible, get distance between markers
    if (el_markerA.object3D.visible && el_markerB.object3D.visible) {

      var f_distance = v3_markerAVector.distanceTo(v3_markerBVector);

      // Store the position vectors of the midpoint between the markers as transform
      // values from the markers position
      var v3_aEndPos = new THREE.Vector3(
        (v3_markerBVector.x - v3_markerAVector.x) / 2,
        (v3_markerBVector.y - v3_markerAVector.y) / 2,
        (v3_markerBVector.z - v3_markerAVector.z) / 2
      );
      var v3_bEndPos = new THREE.Vector3(
        (v3_markerAVector.x - v3_markerBVector.x) / 2,
        (v3_markerAVector.y - v3_markerBVector.y) / 2,
        (v3_markerAVector.z - v3_markerBVector.z) / 2
      );

      // Update the line a-entity with new start and end positions of both visible
      // markers
      if (b_debug) {
        document.querySelector('#distance-line').setAttribute('line', {
          start: { x: v3_markerAVector.x , y: v3_markerAVector.y , z: v3_markerAVector.z },
          end: { x: v3_markerBVector.x , y: v3_markerBVector.y , z: v3_markerBVector.z },
          visible: 'true'
        });
      }

      // If markers are in close proximity, update position
      if (f_distance < f_proximity) {

        // If f_interpolateMag is less than 1 then models are not finished
        // interpolating their position to the midpoint of the markers.
        if (f_interpolateMag < 1.0) {
          f_interpolateMag += f_interpolateInc;

          // Update the position of el_elementA to newly interpolated position
          let v3_elementAPos = v3_origin.lerp(v3_aEndPos, f_interpolateMag);
          el_elementA.setAttribute('position', {
            x: v3_elementAPos.x,
            y: v3_elementAPos.y,
            z: v3_elementAPos.z
          });

          // Update the position of el_elementB to newly interpolated position
          let v3_objBPos = v3_origin.lerp(v3_bEndPos, f_interpolateMag);
          el_elementB.setAttribute('position', {
            x: v3_objBPos.x,
            y: v3_objBPos.y,
            z: v3_objBPos.z
          });

        }
        // If f_interpolateMag is 1 or greater, then models should have finished interpolating
        // to the midpoint. Correct floating point precision to whole integer,
        // then update the position of the third model to the midpoint and set
        // its visility to true
        else if (f_interpolateMag >= 1.0) {
          f_interpolateMag = 1;

          // If el_compoundElement is not visible, set its visibility to true and set
          // el_elementA and el_elementB 's visibility to false.
          // console.log(el_compoundElement.getAttribute('visible'));
          if (!el_compoundElement.getAttribute('visible')) {
            el_elementA.setAttribute('visible', 'false');
            el_elementB.setAttribute('visible', 'false');
            el_compoundElement.setAttribute('visible', 'true');
          }
          // Update the position of the visible el_compoundElement
          let v3_elementAPos = v3_origin.lerp(v3_aEndPos, f_interpolateMag);
          el_compoundElement.setAttribute('position', {
            x: v3_elementAPos.x,
            y: v3_elementAPos.y,
            z: v3_elementAPos.z
          });

        }

        if (b_debug) {
          updateDebugColour(f_distance < f_proximity);
        }

      // If markers are not within the stated proximity distance of eachother
      } else {

        // If f_interpolateMag is greater than 0, models are not finished interploating
        // to their starting vectors. Decrement the f_interpolateMag and set visibility
        // of models if it is the first pass through this block since exiting close
        // proximity.
        if (f_interpolateMag > 0.0) {
          f_interpolateMag -= f_interpolateInc;

          // If el_compoundElement is visible, set its visibility to false and set
          // el_elementA and el_elementB 's visibility to true.
          if (el_compoundElement.getAttribute('visible')) {
            el_elementA.setAttribute('visible', 'true');
            el_elementB.setAttribute('visible', 'true');
            el_compoundElement.setAttribute('visible', 'false');
          }

          // set new interpolated position for el_elementA and el_elementB using
          // the updated f_interpolateMag
          let v3_elementAPos = v3_origin.lerp(v3_aEndPos, f_interpolateMag);
          el_elementA.setAttribute('position', {
            x: v3_elementAPos.x,
            y: v3_elementAPos.y,
            z: v3_elementAPos.z
          });
          let v3_elementBPos = v3_origin.lerp(v3_bEndPos, f_interpolateMag);
          el_elementB.setAttribute('position', {
            x: v3_elementBPos.x,
            y: v3_elementBPos.y,
            z: v3_elementBPos.z
          });

        }
        // If f_interpolateMag is less than 0, the models have finsihed returning
        // to their relative origin. Remove floating point precision ready for
        // next occasion the markers are in proximity.
        else if (f_interpolateMag < 0.0) {
          f_interpolateMag = 0;
        }

        if (b_debug) {
          updateDebugColour(f_distance < f_proximity);
        }

      }

    // If both markers are not visible, reset positions of the models to their
    // origin
    } else {

      el_elementA.setAttribute('position', {
        x: v3_origin.x,
        y: v3_origin.y,
        z: v3_origin.z
      });
      el_elementB.setAttribute('position', {
        x: v3_origin.x,
        y: v3_origin.y,
        z: v3_origin.z
      });

      // If both markers are not visible, ensure that the debug distance ray line
      // is not visible
      if (b_debug) {
        document.querySelector('#distance-line').setAttribute('line', {
          visible: false
        })
      }
    }
  }
});
