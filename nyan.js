var canvas = document.getElementById('canvas')
var context = canvas.getContext('2d')

// load img
var nyan = new Image()
var bg = new Image()
var fg = new Image()
var debrisNorth = new Image()
var debrisSouth = new Image()

nyan.src = 'images/nyan3.png'
bg.src = 'images/bgSpace.png'
fg.src = 'images/fgSpace2.png'
debrisNorth.src = 'images/debrisNorth.png'
debrisSouth.src = 'images/debrisSouth.png'

// load sound
var scr = new Audio()
var bgSound = new Audio()

scr.src = 'sounds/meow.mp3'
bgSound.src = 'sounds/loop.mp3'

bgSound.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
}, false);

bgSound.play()

// make another var
var nX = 10
var nY = 150
var score = 0

// array for debris position
var debris = []
debris[0] = {
  x : canvas.width,
  y : 0
}

// check arrow button
document.onkeydown = checkKey;

function checkKey(e) {

    e = e || window.event;

    if (e.keyCode == '38') {
        // up arrow
        moveUp()
    }
    else if (e.keyCode == '40') {
        // down arrow
        moveDown()
    }
    else if (e.keyCode == '37') {
       // left arrow
       moveLeft()
    }
    else if (e.keyCode == '39') {
       // right arrow
       moveRight()
    }

}


// adding move function
function moveUp() {
  nY -= 30
}

function moveDown() {
  nY += 30
}

function moveLeft() {
  nX -= 20
}

function moveRight() {
  nX += 20
}

// main function
function draw() {
  var gap = 100
  var constant = debrisNorth.height + gap
  
  context.drawImage(bg, 0,0)

  for (var i = 0;  i < debris.length; i++) {
    context.drawImage(debrisNorth, debris[i].x, debris[i].y)
    context.drawImage(debrisSouth, debris[i].x, debris[i].y + constant)
    debris[i].x--
    
    // display new set of obstacles
    // if (debris[i].x == canvas.width - 188) {
    if (debris[i].x == canvas.width - 175) {
      debris.push({
        x : canvas.width,
        y : Math.floor(Math.random()*debrisNorth.height) - debrisNorth.height
    })
    }

    // detect collision
    if (nX + nyan.width >= debris[i].x && nX <= debris[i].x + debrisNorth.width
      && (nY <= debris[i].y + debrisNorth.height || nY+nyan.height >= debris[i].y + constant)
      || nY + nyan.height >= canvas.height - fg.height) {
      location.reload()
    }

    // set score
    if (debris[i].x == nX) {
      score++
      scr.play()
    }
  }

  // display foreground
  context.drawImage(fg, 0, canvas.height - fg.height)

  // display nyan
  context.drawImage(nyan, nX, nY)

  // display score
  context.fillStyle = '#D9C277'
  context.font = '20px Verdana'
  context.fillText('Score : ' + score, 10, canvas.height - 20)


  requestAnimationFrame(draw)
}

draw()
