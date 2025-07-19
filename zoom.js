<!-- zoom.js -->
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
  { text: "🧠 Infinite Wordles", link: "wordle.html" },
  { text: "📊 Rank Priorities", link: "rank.html" },
  { text: "🎵 Song Rankings", link: "songs.html" },
  { text: "🕹️ 3D Platformer", link: "dino.html" },
  { text: "🌌 Upcoming", link: "upcoming.html" }
];

const bubbles = priorities.map((p, i) => ({
  ...p,
  x: Math.cos(i * 1.25) * 500,
  y: Math.sin(i * 1.25) * 300,
  size: 70 + Math.random() * 30,
  color: `hsl(${Math.random() * 360}, 100%, 65%)`
}));

function drawStarfield() {
  for (let i = 0; i < 150; i++) {
    const x = Math.random() * width;
    const y = Math.random() * height;
    ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
    ctx.beginPath();
    ctx.arc(x, y, Math.random() * 1.2, 0, Math.PI * 2);
    ctx.fill();
  }
}

function draw() {
  ctx.clearRect(0, 0, width, height);

  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, width, height);
  drawStarfield();

  ctx.save();
  ctx.translate(width / 2 + offsetX, height / 2 + offsetY);
  ctx.scale(zoom, zoom);

  for (const b of bubbles) {
    ctx.shadowBlur = 30;
    ctx.shadowColor = b.color;

    ctx.beginPath();
    ctx.fillStyle = b.color;
    ctx.arc(b.x, b.y, b.size, 0, Math.PI * 2);
    ctx.fill();

    ctx.shadowBlur = 0;
    ctx.fillStyle = "#fff";
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

canvas.addEventListener("wheel", (e) => {
  e.preventDefault();
  const delta = e.deltaY > 0 ? 0.9 : 1.1;
  zoom *= delta;
  zoom = Math.min(Math.max(zoom, 0.3), 4);
});

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

// Click to navigate
canvas.addEventListener("click", (e) => {
  const x = (e.clientX - width / 2 - offsetX) / zoom;
  const y = (e.clientY - height / 2 - offsetY) / zoom;
  for (const b of bubbles) {
    const dx = x - b.x;
    const dy = y - b.y;
    if (Math.sqrt(dx * dx + dy * dy) < b.size) {
      window.location.href = b.link;
      break;
    }
  }
});
