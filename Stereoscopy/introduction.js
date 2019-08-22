var para0   = "Welcome";
var para1   = "By arriving here you must want to learn about stereoscopy!";
var para2   = "No?";
var para3   = "No? Too bad.";
var para4   = "No? Too bad. You're going to learn now.";
var para5a  = "Stereoscopy is a method of creating 3D images";
var para5b  = "from two images taken from two different cameras";
var para5c  = "positioned adjacent to each other, slightly apart.";
var para6a  = "To help you understand,";
var para6b  = "To help you understand, think of the cameras,";
var para6c  = "A and B,";
var para6d  = "A and B, as your own eyes.";
var para7a  = "When one of your eyes is shut";
var para7b  = "When one of your eyes is shut\nyour perspective changes.";
var para7c  = "You are getting a single 2D\nimage of the scene.";
var para7d  = "With both eyes open you are able to\nperceive depth in the scene, making it\nappear 3D.";
var para8a  = "Now you're about to see the cube from the eyes perspective.";
var para8b  = "Use the controls to manipulate the position of the cube"
var para8c  = "as well as toggle the left and right cameras on and off"
var para8d  = "and observe the changes that occur to the cube in 3D."

function introduction(step) {
  clear();
  push();
  translate(-windowWidth/2, -windowHeight/2, 0);
  push();

  console.log('Intro part', introPart)

  textFont(gravityFont);
  fill('#ED225D');
  textSize(42);

  switch (step) {
    case 0:
      text(para0, (windowWidth/2) - 570, windowHeight/2 - 360);
      introDelay = 2000;
      break;
    case 1:
      text(para0, (windowWidth/2) - 570, windowHeight/2 - 360);
      text(para1, (windowWidth/2) - 570, windowHeight/2 - 300);
      introDelay = 4000;
      break;
    case 2:
      text(para0, (windowWidth/2) - 570, windowHeight/2 - 360);
      text(para1, (windowWidth/2) - 570, windowHeight/2 - 300);
      text(para2, (windowWidth/2) - 570, windowHeight/2 - 240);
      introDelay = 2000;
      break;
    case 3:
      text(para0, (windowWidth/2) - 570, windowHeight/2 - 360);
      text(para1, (windowWidth/2) - 570, windowHeight/2 - 300);
      text(para3, (windowWidth/2) - 570, windowHeight/2 - 240);
      introDelay = 2000;
      break;
    case 4:
      text(para0, (windowWidth/2) - 570, windowHeight/2 - 360);
      text(para1, (windowWidth/2) - 570, windowHeight/2 - 300);
      text(para4, (windowWidth/2) - 570, windowHeight/2 - 240);
      introDelay = 4000;
      break;
    case 5:
      introDelay = 750;
      break;
    case 6:
      text(para5a + '...', (windowWidth/2) - 570, windowHeight/2 - 280);
      introDelay = 4400;
      break;
    case 7:
      text(para5a, (windowWidth/2) - 570, windowHeight/2 - 280);
      text(para5b + '...', (windowWidth/2) - 570, windowHeight/2 - 220);
      pop();
      pop();
      introDelay = 4400;
      break;
    case 8:
      text(para5a, (windowWidth/2) - 570, windowHeight/2 - 280);
      text(para5b, (windowWidth/2) - 570, windowHeight/2 - 220);
      text(para5c, (windowWidth/2) - 570, windowHeight/2 - 160);
      pop();
      pop();
      introDelay = 5500;
      break;
    case 9:
      text(para6a, (windowWidth/2) - 570, windowHeight/2 - 280);
      pop();
      pop();
      translate(0, -20, 0);
      topDownDiagram(1);
      introDelay = 2000;
      break;
    case 10:
      text(para6b, (windowWidth/2) - 570, windowHeight/2 - 280);
      pop();
      pop();
      translate(0, -20, 0);
      topDownDiagram(1);
      introDelay = 2000;
      break;
    case 11:
      text(para6b, (windowWidth/2) - 570, windowHeight/2 - 280);
      text(para6c, (windowWidth/2) - 570, windowHeight/2 - 220);
      pop();
      pop();
      translate(0, -20, 0);
      topDownDiagram(1);
      introDelay = 1500;
      break;
    case 12:
      text(para6b, (windowWidth/2) - 570, windowHeight/2 - 280);
      text(para6c, (windowWidth/2) - 570, windowHeight/2 - 220);
      pop();
      pop();
      translate(0, -20, 0);
      topDownDiagram(3);
      introDelay = 700;
      break;
    case 13:
      text(para6b, (windowWidth/2) - 570, windowHeight/2 - 280);
      text(para6c, (windowWidth/2) - 570, windowHeight/2 - 220);
      pop();
      pop();
      translate(0, -20, 0);
      topDownDiagram(2);
      introDelay = 700;
      break;
    case 14:
      text(para6b, (windowWidth/2) - 570, windowHeight/2 - 280);
      text(para6c, (windowWidth/2) - 570, windowHeight/2 - 220);
      pop();
      pop();
      translate(0, -20, 0);
      topDownDiagram(1);
      introDelay = 700;
      break;
    case 15:
      text(para6b, (windowWidth/2) - 570, windowHeight/2 - 280);
      text(para6d, (windowWidth/2) - 570, windowHeight/2 - 220);
      pop();
      pop();
      translate(0, -20, 0);
      topDownDiagram(1);
      introDelay = 5000;
      break;
    case 16:
      text(para6b, (windowWidth/2) - 570, windowHeight/2 - 280);
      text(para6d, (windowWidth/2) - 570, windowHeight/2 - 220);
      textSize(32);
      text(para7a, (windowWidth/2) - 520, windowHeight/2 - 0)
      pop();
      pop();
      translate(0, -20, 0);
      topDownDiagram(1);
      introDelay = 3000;
      break;
    case 17:
      text(para6b, (windowWidth/2) - 570, windowHeight/2 - 280);
      text(para6d, (windowWidth/2) - 570, windowHeight/2 - 220);
      textSize(32);
      text(para7b, (windowWidth/2) - 520, windowHeight/2 - 0)
      pop();
      pop();
      translate(0, -20, 0);
      topDownDiagram(3);
      introDelay = 1000;
      break;
    case 18:
      text(para6b, (windowWidth/2) - 570, windowHeight/2 - 280);
      text(para6d, (windowWidth/2) - 570, windowHeight/2 - 220);
      textSize(32);
      text(para7b, (windowWidth/2) - 520, windowHeight/2 - 0)
      pop();
      pop();
      translate(0, -20, 0);
      topDownDiagram(2);
      introDelay = 1000;
      break;
    case 19:
      text(para6b, (windowWidth/2) - 570, windowHeight/2 - 280);
      text(para6d, (windowWidth/2) - 570, windowHeight/2 - 220);
      textSize(32);
      text(para7b, (windowWidth/2) - 520, windowHeight/2 - 0)
      text(para7c, (windowWidth/2) + 80, windowHeight/2 - 0)
      pop();
      pop();
      translate(0, -20, 0);
      topDownDiagram(2);
      introDelay = 6000;
      break;
    case 20:
      text(para6b, (windowWidth/2) - 570, windowHeight/2 - 280);
      text(para6d, (windowWidth/2) - 570, windowHeight/2 - 220);
      textSize(32);
      text(para7d, (windowWidth/2) - 600, windowHeight/2 - 0)
      pop();
      pop();
      translate(0, -20, 0);
      topDownDiagram(1);
      introDelay = 5000;
      break;
    case 21:
      introDelay = 1000;
      break;
    case 22:
      sidebar.style.visibility = 'visible';
      sidebar.style.opacity = 1;
      textSize(32);
      text(para8a, (windowWidth/2) - 360, windowHeight/2 - 360);
      introDelay = 3500;
      break;
    case 23:
      textSize(32);
      text(para8a, (windowWidth/2) - 360, windowHeight/2 - 360);
      text(para8b + '...', (windowWidth/2) - 360, windowHeight/2 + 20);
      introDelay = 3000;
      break;
    case 24:
      textSize(32);
      text(para8a, (windowWidth/2) - 360, windowHeight/2 - 360);
      text(para8b, (windowWidth/2) - 360, windowHeight/2 + 20);
      text(para8c + '...', (windowWidth/2) - 360, windowHeight/2 + 80);
      introDelay = 3000;
      break;
    case 25:
      textSize(32);
      text(para8a, (windowWidth/2) - 360, windowHeight/2 - 360);
      text(para8b, (windowWidth/2) - 360, windowHeight/2 + 20);
      text(para8c, (windowWidth/2) - 360, windowHeight/2 + 80);
      text(para8d, (windowWidth/2) - 360, windowHeight/2 + 140);
      introDelay = 3000;
      break;
    default:
      break;
  }

  introPart++;
  introNext = true;

  if (step > 25) {
    intro = false;
    document.getElementById('btn-left').disabled  = false;
    document.getElementById('btn-right').disabled = false;
    document.getElementById('x-slider').disabled  = false;
    document.getElementById('z-slider').disabled  = false;
    clear();
  }

}
