const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray;

let pointer = {
  x: null,
  y: null,
  radius: (canvas.height/100)*(canvas.width/100),
}

window.addEventListener("mousemove",
  function(e) {
    pointer.x = e.x;
    pointer.y = e.y;
  }
);

//create particle
class Particle {
  constructor(x, y, directionX, directionY, size, color) {
    this.x = x;
    this.y = y;
    this.directionX = directionX*0.1;
    this.directionY = directionY*0.1;
    this.size = size;
    this.color = color;
  }
  // method to draw individual particle
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI*2, false);
    ctx.fillStyle = `rgba(240, 240, 240, 0.5)`;
    ctx.fill();
  }
  // check particle position, check pointer position, move particle, draw particle
  update() {
    //check if particle is still within the canvas
    if (this.x > canvas.width || this.x < 0) {
      this.directionX = -this.directionX;
    }
    if (this.y > canvas.height || this.y < 0) {
      this.directionY = -this.directionY;
    }
    // check collision direction - poiner position/ particle position
    let dx = pointer.x - this.x;
    let dy = pointer.y - this.y;
    let distance = Math.sqrt(dx*dx + dy*dy);
    if (distance < pointer.radius + this.size) {
      if (pointer.x < this.x && this.x < canvas.width - this.size * 1) {
        this.x += 1;
      }
      if (pointer.x > this.x && this.x > this.size * 1) {
        this.x -= 1;
      }
      if (pointer.y > this.y && this.y < canvas.height - this.y * 1) {
        this.y += 1;
      }
      if ( pointer.y < this.y && this.y > this.y * 1) {
        this.y -= 1;
      }
    }
    //move particles
    this.x += this.directionX;
    this.y += this.directionY;
    //draw a particle
    this.draw();
  }
}

// create particle array
function init() {
  particlesArray = [];
  let numberOfParticles = (canvas.height * canvas.width) / 9000;
  for (let i=0; i < numberOfParticles*2; i++) {
    let size = (Math.random()*3)+1;
    let x = (Math.random()* ((innerWidth - size *2)-(size*2)) + size*2);
    let y = (Math.random()* ((innerHeight - size *2)-(size*2)) + size*2);
    let directionX = (Math.random()*5)-2.5;
    let directionY = (Math.random()*5)-2.5;
    let color = `rgba(240, 240, 240, 0.1)`;
    
    particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
  }
}

//animate loop
function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0,0, innerWidth, innerHeight);

  for (let i=0; i < particlesArray.length; i++) {
    particlesArray[i].update();
  }
  connect55();
}

//check if particles are close enough to draw a line between them
function connect55() {
  let opacityValue = 0.5;
  for (let a = 0; a < particlesArray.length; a++) {
    for (let b = a; b < particlesArray.length; b++) {
      let distance = ((particlesArray[a].x-particlesArray[b].x)*(particlesArray[a].x-particlesArray[b].x))+((particlesArray[a].y-particlesArray[b].y)*(particlesArray[a].y-particlesArray[b].y));
      if (distance < (canvas.width/7)*(canvas.height/7)) {
        opacityValue = 1 - (distance/15000);
        ctx.strokeStyle = `rgba(240, 240, 240, ${opacityValue})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
        ctx.stroke();
      }
    }
  }
}

window.addEventListener("resize",
  function() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    pointer.radius = ((canvas.width/70)*(canvas.height/70));
    init();
  }
)

window.addEventListener("mouseout", 
  function() {
    pointer.x = undefined;
    pointer.y = undefined;
  }
)

init();
animate();