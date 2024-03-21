var canvas = document.querySelector("#scene"),
  ctx = canvas.getContext("2d"),
  particles = [],
  amount = 0,
  mouse = { x: 0, y: 0 },
  radius = 0;

var colors = ["#e0def4"];

var textToRender = "justanotherinternetguy";

class Particle {
  constructor(x, y, canvasWidth, canvasHeight) {
    this.x = Math.random() * canvasWidth;
    this.y = Math.random() * canvasHeight;
    this.dest = {
      x: x,
      y: y,
    };
    this.r = Math.random() * (canvasWidth / 300) + 1;
    this.vx = (Math.random() - 0.5) * 10;
    this.vy = (Math.random() - 0.5) * 10;
    this.accX = 0;
    this.accY = 0;
    this.friction = Math.random() * 0.05 + 0.91;

    this.color = colors[Math.floor(Math.random() * colors.length)];

    this.Kp = 0.0015;
    this.Ki = 0;
    this.Kd = 0.055;
    this.prevErrorX = 0;
    this.prevErrorY = 0;
    this.integralX = 0;
    this.integralY = 0;
  }

  render() {
    let errorX = this.dest.x - this.x;
    let errorY = this.dest.y - this.y;

    this.integralX += errorX;
    this.integralY += errorY;

    this.accX =
      this.Kp * errorX +
      this.Ki * this.integralX +
      this.Kd * (errorX - this.prevErrorX);
    this.accY =
      this.Kp * errorY +
      this.Ki * this.integralY +
      this.Kd * (errorY - this.prevErrorY);

    this.prevErrorX = errorX;
    this.prevErrorY = errorY;

    this.accX *= this.friction;
    this.accY *= this.friction;

    this.vx += this.accX;
    this.vy += this.accY;

    this.vx += (Math.random() - 0.5) * 0.03;
    this.vy += (Math.random() - 0.5) * 0.03;

    this.x += this.vx;
    this.y += this.vy;

    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, Math.PI * 2, false);
    ctx.fill();
  }
}

function initScene() {
  var computedStyle = getComputedStyle(canvas);
  var canvasWidth = parseInt(computedStyle.width);
  var canvasHeight = parseInt(computedStyle.height);

  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.font = "bold " + canvasWidth / 18 + "px monospace";
  ctx.textAlign = "center";
  ctx.fillText(textToRender, canvasWidth / 2, canvasHeight / 2);

  var data = ctx.getImageData(0, 0, canvasWidth, canvasHeight).data;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.globalCompositeOperation = "screen";

  particles = [];
  for (var i = 0; i < canvasWidth; i += Math.round(canvasWidth / 300)) {
    for (var j = 0; j < canvasHeight; j += Math.round(canvasWidth / 300)) {
      if (data[(i + j * canvasWidth) * 4 + 3] > 150) {
        particles.push(new Particle(i, j, canvasWidth, canvasHeight));
      }
    }
  }

  amount = particles.length;
}

function render(a) {
  requestAnimationFrame(render);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (var i = 0; i < amount; i++) {
    particles[i].render();
  }
}

// window.addEventListener("resize", initScene);

// initScene();
// requestAnimationFrame(render);

function startAnimation() {
  setTimeout(function () {
    requestAnimationFrame(render);
  }, 1600);
}

window.addEventListener("resize", initScene);

initScene();
startAnimation();
