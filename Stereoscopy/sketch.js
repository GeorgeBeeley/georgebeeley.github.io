let gp, colour, inc, bLeft, bRight, gravityFont;
let bReset = false;
let scale = 1;
var xSlider, zSlider;
var sidebar;
var intro = true;
var introPart = -1;
var introNext = true;
var introDelay = 3000;

// used to get value of slider after onclick event
function getSliderValue(slider) {
  let value = parseInt(slider.value);
  if (value === 0) {
    return 1;
  } else {
    return parseInt(slider.value);
  }
}

// used by button toggles to clear the canvas once after being clicked
function clearCanvases() {
  if (bReset) {
    clear();
    bReset = false;
  }
}

// Generates a gradually changing colour
function rainbowColours() {
  if (inc) {
    colour += 0.5;
    if (colour === 255) {
      inc = false;
    }
  } else {
    colour -= 0.5;
    if (colour === 0) {
      inc = true;
    }
  }
}

// adds the top-down diagram of the stereogram layout to the p5 canvas
function topDownDiagram(a) {
  if (intro)
    translate(0, -50, 0);

  push();

  if (!intro)
    translate(getSliderValue(xSlider) + 500, -100 + getSliderValue(zSlider)*1.5 - 200, 0);  // include x-axis slider translation offset
  else {
    translate(getSliderValue(xSlider), -100 + getSliderValue(zSlider)*1.5, 0);
  }

  plane(50);
  pop();

  if (!intro)
    translate(500, -200, 0);

  switch(a) {
    // both eyes open
    case 1:
    // set font styles
    push();
    textFont(gravityFont);
    fill('#ED225D');
    textSize(36);
    text('A', -115, 440);
    text('B', 95, 440);
    pop();
    // right eye
    line(getSliderValue(xSlider) + 25, -100 + getSliderValue(zSlider)*1.5 + 25, 0, 100, 400, 0);
    line(getSliderValue(xSlider) + 25, -100 + getSliderValue(zSlider)*1.5 - 25, 0, 100, 400, 0);
    line(getSliderValue(xSlider) - 25, -100 + getSliderValue(zSlider)*1.5 + 25, 0, 100, 400, 0);
    // left eye
    line(getSliderValue(xSlider) - 25, -100 + getSliderValue(zSlider)*1.5 + 25, 0, -100, 400, 0);
    line(getSliderValue(xSlider) - 25, -100 + getSliderValue(zSlider)*1.5 - 25, 0, -100, 400, 0);
    line(getSliderValue(xSlider) + 25, -100 + getSliderValue(zSlider)*1.5 + 25, 0, -100, 400, 0);
    break;
    // left eye open
    case 2:
    // set font styles
    push();
    textFont(gravityFont);
    fill('#ED225D');
    textSize(36);
    text('A', -115, 440);
    fill('#CCC');
    text('B', 95, 440);
    pop();
    line(getSliderValue(xSlider) - 25, -100 + getSliderValue(zSlider)*1.5 + 25, 0, -100, 400, 0);
    line(getSliderValue(xSlider) - 25, -100 + getSliderValue(zSlider)*1.5 - 25, 0, -100, 400, 0);
    line(getSliderValue(xSlider) + 25, -100 + getSliderValue(zSlider)*1.5 + 25, 0, -100, 400, 0);
    break;
    // right eye open
    case 3:
    // set font styles
    push();
    textFont(gravityFont);
    fill('#CCC');
    textSize(36);
    text('A', -115, 440);
    fill('#ED225D');
    text('B', 95, 440);
    pop();
    line(getSliderValue(xSlider) + 25, -100 + getSliderValue(zSlider)*1.5 + 25, 0, 100, 400, 0);
    line(getSliderValue(xSlider) + 25, -100 + getSliderValue(zSlider)*1.5 - 25, 0, 100, 400, 0);
    line(getSliderValue(xSlider) - 25, -100 + getSliderValue(zSlider)*1.5 + 25, 0, 100, 400, 0);
    break;
    // no eyes open
    default:
    // set font styles
    push();
    textFont(gravityFont);
    fill('#CCC');
    textSize(36);
    text('A', -115, 440);
    fill('#CCC');
    text('B', 95, 440);
    pop();
    break;
    pop();
  }
}

// add the 3d view of the cube from each 'active' eye/camera/iris
function threeDimensionView(a) {

  push();
  // zoom / z-axis translate slider controls
  translate(0, 0, 100 - getSliderValue(zSlider) * 2);

  switch(a) {
    case 1:
    // Left eye view
    push();
    translate(getSliderValue(xSlider) - 20 - ((getSliderValue(zSlider) - 50) / 7), -20, 0);
    rotate(radians(13 + ((getSliderValue(zSlider) - 50) / 20)), [0, 1, 0]);
    // rotate(radians(13), [0, 1, 0]);
    // box(200);
    box(200 + (getSliderValue(zSlider) - 50));
    pop();
    // Right eye view
    push();
    translate(getSliderValue(xSlider) + 20 + ((getSliderValue(zSlider) - 50) / 7), -20, 0);
    rotate(radians(-13 - ((getSliderValue(zSlider) - 50) / 20)), [0, 1, 0]);
    // rotate(radians(-13), [0, 1, 0]);
    // box(200);
    box(200 + (getSliderValue(zSlider) - 50));
    pop();
    break;
    case 2:
    // Left eye view
    push();
    translate(getSliderValue(xSlider) - 20 - ((getSliderValue(zSlider) - 50) / 7), -20, 0);
    rotate(radians(13 + ((getSliderValue(zSlider) - 50) / 20)), [0, 1, 0]);
    box(200 + (getSliderValue(zSlider) - 50));
    pop();
    break;
    case 3:
    // Right eye view
    push();
    translate(getSliderValue(xSlider) + 20 + ((getSliderValue(zSlider) - 50) / 7), -20, 0);
    rotate(radians(-13 - ((getSliderValue(zSlider) - 50) / 20)), [0, 1, 0]);
    box(200 + (getSliderValue(zSlider) - 50));
    pop();
    break;
    default:
    break;
  }
  pop();
}

// load font to be used inside the p5 canvas
function preload() {
  gravityFont = loadFont('fonts/gravity/Gravity-Light.otf');
}

// setup elements and create objects
// add event listeners to buttons and sliders
window.onload = function() {
  document.getElementById('btn-left').addEventListener("click", function() {
    bLeft = !bLeft;
    bReset = true;
  });
  document.getElementById('btn-right').addEventListener("click", function() {
    bRight = !bRight;
    bReset = true;
  });

  // Store slider elements as global objects
  xSlider = document.getElementById("x-slider");
  zSlider = document.getElementById("z-slider");

  var xOutput = document.getElementById("x-slide-value");
  var zOutput = document.getElementById("z-slide-value");

  xOutput.innerHTML = xSlider.value;
  zOutput.innerHTML = zSlider.value;

  // Update the current slider value (each time you drag the slider handle)
  xSlider.oninput = function() {
    xOutput.innerHTML = this.value;
    clear();
  }
  zSlider.oninput = function() {
    zOutput.innerHTML = this.value;
    clear();
  }

  var leftButton = document.getElementById("btn-left");
  var rightButton = document.getElementById("btn-right");

  function toggleAB() {
    var on = this.childNodes[2];
    var off = this.childNodes[3];
    if (on.style.display === 'block') {
      on.style.display = 'none';
      off.style.display = 'block';
      this.style.background = '#ccc';
      this.style.color = '#999';
    } else {
      on.style.display = 'block';
      off.style.display = 'none';
      this.style.background = '#ddd';
      this.style.color = '#000';
    }
  }

  leftButton.addEventListener('click', toggleAB);
  rightButton.addEventListener('click', toggleAB);

};

// setup logic objects and create p5 canvas
function setup() {
  // set both eyes open on load
  bLeft = true;
  bRight = true;
  sidebar = document.getElementById("sidebar");

  // setup for the stereoscope canvases
  colour = 0;
  inc = true;
  let canvasOne = createCanvas(windowWidth, windowHeight, WEBGL);
}

// run the introduction step by step, then draw the graphics based on state
// of active/open eyes
function draw() {

  if (intro) {

    if (introPart === 0 && introNext) {
      introduction(introPart);
    } else if (introNext) {
      setTimeout(introduction, introDelay, introPart);
      introNext = false;
    }

  } else {

    clearCanvases();
    ambientMaterial(colour, 255 - colour, (255 / 2) + (colour / 2));

    if (bLeft && bRight) {
      threeDimensionView(1);
      topDownDiagram(1);
    } else if (bLeft && !bRight) {
      threeDimensionView(2);
      topDownDiagram(2);
    } else if (!bLeft && bRight) {
      threeDimensionView(3);
      topDownDiagram(3);
    } else {
      topDownDiagram(4);
    }
    rainbowColours();
  }

  smooth();
}
