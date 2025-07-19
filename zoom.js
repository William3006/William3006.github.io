// zoom.js
const canvas = document.getElementById("universe");
const ctx = canvas.getContext("2d");

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

let zoom = 1;
let offsetX = 0;
let offsetY = 0;
let isDragging = false;
let dragStart = { x: 0, y: 0 };

const priorities = [
  "Freedom", "Health", "Love", "Money", "Knowledge",
  "Happiness", "Power", "Safety", "Success", "Adventure"
];

const bubbles = priorities.map((p, i) => ({
  text: p,
  x: Math.cos(i) * 300,
  y: Math.sin(i) * 300,
  size: 50 + Math.random() * 20
}));

function draw() {
  ctx.clearRect(0, 0, width, height);
  ctx.save();
  ctx.translate(width / 2 + offsetX, height / 2 + offsetY);
  ctx.scale(zoom, zoom);

  for (const b of bubbles) {
    ctx.beginPath();
    ctx.fillStyle = "#00ffd5";
    ctx.arc(b.x, b.y, b.size, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#000";
    ctx.font = "bold 16px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(b.text, b.x, b.y + 5);
  }

  ctx.restore();
  requestAnimationFrame(draw);
}

draw();

window.addEventListener("resize", () => {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
});

// Zoom with scroll
canvas.addEventListener("wheel", (e) => {
  e.preventDefault();
  const delta = e.deltaY > 0 ? 0.9 : 1.1;
  zoom *= delta;
});

// Drag to pan
canvas.addEventListener("mousedown", (e) => {
  isDragging = true;
  dragStart = { x: e.clientX, y: e.clientY };
});

canvas.addEventListener("mousemove", (e) => {
  if (isDragging) {
    offsetX += e.clientX - dragStart.x;
    offsetY += e.clientY - dragStart.y;
    dragStart = { x: e.clientX, y: e.clientY };
  }
});

canvas.addEventListener("mouseup", () => isDragging = false);
canvas.addEventListener("mouseleave", () => isDragging = false);

