/* =======================
   PÁGINA DE LA PREGUNTA
======================= */

const screens = {
  intro: document.getElementById("screen-intro"),
  question: document.getElementById("screen-question"),
  yes: document.getElementById("screen-yes"),
  no: document.getElementById("screen-no"),
};

function showScreen(name) {
  Object.values(screens).forEach(s => s.classList.add("hidden"));
  screens[name].classList.remove("hidden");
}

document.getElementById("btn-start").onclick = () => showScreen("question");
document.getElementById("btn-yes").onclick = () => showScreen("yes");
document.getElementById("btn-no").onclick = () => showScreen("no");
document.getElementById("btn-reset-yes").onclick = () => showScreen("intro");
document.getElementById("btn-reset-no").onclick = () => showScreen("intro");

/* =======================
   GUARDAR RECUERDO
======================= */

document.getElementById("btn-save").onclick = () => {
  const canvas = document.getElementById("memoryCanvas");
  const ctx = canvas.getContext("2d");

  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, "#0e101a");
  gradient.addColorStop(1, "#1a1320");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#ffffff";
  ctx.textAlign = "center";

  ctx.font = "bold 60px sans-serif";
  ctx.fillText("San Valentín", canvas.width / 2, 200);

  ctx.font = "40px sans-serif";
  ctx.fillText("Jorge + Majojo", canvas.width / 2, 320);

  ctx.font = "32px sans-serif";
  ctx.fillText("14 de febrero · 8:00 PM", canvas.width / 2, 420);

  ctx.font = "28px sans-serif";
  ctx.fillStyle = "#ff7cab";
  ctx.fillText("Cita confirmada 💘", canvas.width / 2, 520);

  const link = document.createElement("a");
  link.download = "recuerdo-san-valentin.png";
  link.href = canvas.toDataURL();
  link.click();
};

/* =======================
        SNAKE
======================= */

const canvas = document.getElementById("snake");
const ctx = canvas.getContext("2d");

const size = 12;
let snake = [{ x: 10, y: 10 }];
let food = { x: 5, y: 5 };
let dx = 1;
let dy = 0;

function gameLoop() {
  moveSnake();
  draw();
}

function moveSnake() {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };

  if (
    head.x < 0 || head.y < 0 ||
    head.x >= canvas.width / size ||
    head.y >= canvas.height / size
  ) {
    resetGame();
    return;
  }

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    food = {
      x: Math.floor(Math.random() * (canvas.width / size)),
      y: Math.floor(Math.random() * (canvas.height / size))
    };
  } else {
    snake.pop();
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#ff4d8d";
  ctx.fillRect(food.x * size, food.y * size, size - 2, size - 2);

  ctx.fillStyle = "#f3f4f8";
  snake.forEach(segment => {
    ctx.fillRect(segment.x * size, segment.y * size, size - 2, size - 2);
  });
}

function resetGame() {
  snake = [{ x: 10, y: 10 }];
  dx = 1;
  dy = 0;
}

window.addEventListener("keydown", e => {
  switch (e.key) {
    case "ArrowUp":
      if (dy === 0) { dx = 0; dy = -1; }
      break;
    case "ArrowDown":
      if (dy === 0) { dx = 0; dy = 1; }
      break;
    case "ArrowLeft":
      if (dx === 0) { dx = -1; dy = 0; }
      break;
    case "ArrowRight":
      if (dx === 0) { dx = 1; dy = 0; }
      break;
  }
});

// swipe móvil
let touchStartX = 0;
let touchStartY = 0;

canvas.addEventListener("touchstart", e => {
  const touch = e.touches[0];
  touchStartX = touch.clientX;
  touchStartY = touch.clientY;
});

canvas.addEventListener("touchend", e => {
  const touch = e.changedTouches[0];
  const dxSwipe = touch.clientX - touchStartX;
  const dySwipe = touch.clientY - touchStartY;

  if (Math.abs(dxSwipe) > Math.abs(dySwipe)) {
    if (dxSwipe > 20 && dx === 0) { dx = 1; dy = 0; }
    else if (dxSwipe < -20 && dx === 0) { dx = -1; dy = 0; }
  } else {
    if (dySwipe > 20 && dy === 0) { dx = 0; dy = 1; }
    else if (dySwipe < -20 && dy === 0) { dx = 0; dy = -1; }
  }
});

setInterval(gameLoop, 120);
