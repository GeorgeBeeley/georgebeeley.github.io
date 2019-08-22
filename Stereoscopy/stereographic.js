let w, h, gp, i, rot, inc, bLeft, bRight;
let bReset = false;
let scale = 2;

function setup() {
  w = windowWidth;
  h = windowHeight;
  bLeft = false;
  bRight = false;

  // setup for the stereoscope canvases
  i = 0;
  rot = 0;
  inc = true;
  let canvasOne = createCanvas((w/(2*scale)) - 50, h/(1*scale) - 50, WEBGL);
  background(180);
  let canvasTwo = gp = createGraphics((w/(2*scale)) - 50, h/(1*scale) - 50, WEBGL);
  canvasOne.parent("canvas-space");
  canvasTwo.parent("canvas-space");
  setupElements();
}

function draw() {
  clearCanvases();

  if (bLeft && bRight) {
    stereogram();
    document.getElementById('canvas1').style.display = 'inline';
    document.getElementById('canvas2').style.display = 'inline';
  } else if (bLeft && !bRight) {
    stereogram();
    document.getElementById('canvas1').style.display = 'inline';
    document.getElementById('canvas2').style.display = 'none';
  } else if (!bLeft && bRight) {
    stereogram();
    document.getElementById('canvas1').style.display = 'none';
    document.getElementById('canvas2').style.display = 'inline';
  } else {
    stereogram();
    document.getElementById('canvas1').style.display = 'none';
    document.getElementById('canvas2').style.display = 'none';
  }
  smooth();
}

function clearCanvases() {
  if (bReset) {
    clear();
    background(180);
    gp.clear();
    i = 0;
    rot = 0;
    inc = true;
    bReset = false;
  }
}

function rainbowColours() {
  if (inc) {
    i += 0.5;
    if (i === 255) {
      inc = false;
    }
  } else {
    i -= 0.5;
    if (i === 0) {
      inc = true;
    }
  }
}

function stereogram() {
  // set background and cube colours
  background(180);
  gp.background(180);
  ambientMaterial(i, 255 - i, (255 / 2) + (i / 2));
  gp.ambientMaterial(i, 255 - i, (255 / 2) + (i / 2));

  // save current state
  push();
  gp.push();

  // set starting x position of cubes for each canvas
  translate(100-(15*scale), 0, 0);
  gp.translate(-100+(15*scale), 0, 0);
    // rotate the cubes using incrementing 'rot' variable to sim annimation
    rotate(radians(0 - (rot / 10)), [1, 0, 0]);
    rotate(radians(0 + (rot / 10)), [0, 1, 0]);
    rotate(radians(0 + (rot / 10)), [0, 0, 1]);
    box(200/(1*scale));

    // do the same for the second canvas' cube
    gp.rotate(radians(0 - (rot / 10)), [1, 0, 0]);
    gp.rotate(radians(0 + (rot / 10)), [0, 1, 0]);
    gp.rotate(radians(0 + (rot / 10)), [0, 0, 1]);
    gp.box(200/(1*scale));

  // pop back to state before rotations were applied
  // next rotation is not dependant on the last - only relies on incrementing
  // 'rot' variable
  pop();
  gp.pop();

  rainbowColours();
  rot++;
  return;
}

function setupElements() {
  for (let i = 0; i < 2; i++) {
    document.getElementsByTagName('canvas')[i].setAttribute('id', 'canvas' + (i + 1));
  }
  document.getElementById('canvas1').style.display = 'inline';
  document.getElementById('canvas2').style.display = 'inline';
  document.getElementById('btn-left').addEventListener("click", function() {
    bLeft = !bLeft;
    bReset = true;
  });
  document.getElementById('btn-right').addEventListener("click", function() {
    bRight = !bRight;
    bReset = true;
  });
}
