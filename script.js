const carouselText = [
  { text: "Apple", color: "red" },
  { text: "Orange", color: "orange" },
  { text: "Lemon", color: "yellow" },
];

document.addEventListener("DOMContentLoaded", async function () {
  typeSentence(
    "welcome to justanotherinternetguy's corner of the www",
    "#sentence"
  );
  //   carousel(carouselText, "#feature-text");
});

async function typeSentence(sentence, eleRef, minDelay = 20, maxDelay = 70) {
  const letters = sentence.split("");
  let i = 0;
  while (i < letters.length) {
    const delay =
      Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay; // Random delay between minDelay and maxDelay
    await waitForMs(delay);
    document.querySelector(eleRef).textContent += letters[i];
    i++;
  }
  return;
}

async function deleteSentence(eleRef) {
  const sentence = document.querySelector(eleRef).textContent;
  const letters = sentence.split("");
  let i = 0;
  while (letters.length > 0) {
    await waitForMs(100);
    letters.pop();
    document.querySelector(eleRef).textContent = letters.join("");
  }
}

async function carousel(carouselList, eleRef) {
  var i = 0;
  while (true) {
    updateFontColor(eleRef, carouselList[i].color);
    await typeSentence(carouselList[i].text, eleRef);
    await waitForMs(1500);
    await deleteSentence(eleRef);
    await waitForMs(500);
    i++;
    if (i >= carouselList.length) {
      i = 0;
    }
  }
}

function updateFontColor(eleRef, color) {
  document.querySelector(eleRef).style.color = color;
}

function waitForMs(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

window.onload = function () {
  setTimeout(function () {
    var socket = document.getElementById("socket");
    socket.style.opacity = 0; // Set opacity to 0 for transition
    setTimeout(function () {
      socket.remove(); // Remove the socket element after the transition completes
      document.querySelector("main").classList.remove("gone");
    }, 100); // Wait for 1 second, which is the same duration as the CSS transition
  }, 100);
};

var w = window.innerWidth,
  h = window.innerHeight,
  canvas = document.getElementById("test"),
  ctx = canvas.getContext("2d"),
  rate = 60,
  arc = 100,
  time,
  count,
  size = 8,
  speed = 5,
  parts = new Array(),
  colors = ["#eb6f92", "#f6c177", "#ebbcba", "#9ccfd8", "#c4a7e7"];
var mouse = { x: 0, y: 0 };

canvas.setAttribute("width", w);
canvas.setAttribute("height", h);

function create() {
  time = 0;
  count = 0;

  for (var i = 0; i < arc; i++) {
    parts[i] = {
      x: Math.ceil(Math.random() * w),
      y: Math.ceil(Math.random() * h),
      toX: Math.random() * 5 - 1,
      toY: Math.random() * 2 - 1,
      c: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * size,
    };
  }
}

function particles() {
  ctx.clearRect(0, 0, w, h);
  canvas.addEventListener("mousemove", MouseMove, false);
  for (var i = 0; i < arc; i++) {
    var li = parts[i];
    var distanceFactor = DistanceBetween(mouse, parts[i]);
    var distanceFactor = Math.max(Math.min(15 - distanceFactor / 10, 10), 1);
    var distanceFactor = 1.5;
    ctx.beginPath();
    ctx.arc(li.x, li.y, li.size * distanceFactor, 0, Math.PI * 2, false);
    ctx.fillStyle = li.c;
    ctx.strokeStyle = li.c;
    if (i % 2 == 0) ctx.stroke();
    else ctx.fill();

    li.x = li.x + li.toX * (time * 0.05);
    li.y = li.y + li.toY * (time * 0.05);

    if (li.x > w) {
      li.x = 0;
    }
    if (li.y > h) {
      li.y = 0;
    }
    if (li.x < 0) {
      li.x = w;
    }
    if (li.y < 0) {
      li.y = h;
    }
  }
  if (time < speed) {
    time++;
  }
  setTimeout(particles, 1000 / rate);
}
function MouseMove(e) {
  mouse.x = e.layerX;
  mouse.y = e.layerY;
}
function DistanceBetween(p1, p2) {
  var dx = p2.x - p1.x;
  var dy = p2.y - p1.y;
  return Math.sqrt(dx * dx + dy * dy);
}
create();
particles();
