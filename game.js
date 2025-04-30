// Prevent text selection and zoom on touch devices
document.addEventListener('touchstart', function(e) {
  if(e.touches.length > 1) {
    e.preventDefault();
  }
}, { passive: false });
document.addEventListener('touchmove', function(e) {
  if(e.touches.length > 1) {
    e.preventDefault();
  }
}, { passive: false });
document.addEventListener('dblclick', function(e) {
  e.preventDefault();
});
// Disable long-press context menu on mobile
window.oncontextmenu = function(event) {
  event.preventDefault();
  event.stopPropagation();
  return false;
};

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const restartBtn = document.getElementById('restartBtn');
const scoreDisplay = document.getElementById('scoreDisplay');
const leftBtn = document.getElementById('leftBtn');
const rightBtn = document.getElementById('rightBtn');
const shootBtn = document.getElementById('shootBtn');

function resizeCanvas() {
  const containerWidth = canvas.parentElement.clientWidth;
  canvas.width = containerWidth;
  canvas.height = containerWidth * (4 / 3);
}

resizeCanvas();
window.addEventListener('resize', () => {
  resizeCanvas();
  if (!gameOver) {
    player.x = (player.x / prevWidth) * canvas.width;
    prevWidth = canvas.width;
  }
});

let prevWidth = canvas.width;

let touchLeft = false;
let touchRight = false;
let touchShoot = false;

leftBtn.addEventListener('touchstart', () => touchLeft = true);
leftBtn.addEventListener('touchend', () => touchLeft = false);
rightBtn.addEventListener('touchstart', () => touchRight = true);
rightBtn.addEventListener('touchend', () => touchRight = false);
shootBtn.addEventListener('touchstart', () => touchShoot = true);
shootBtn.addEventListener('touchend', () => touchShoot = false);

leftBtn.addEventListener('mousedown', () => touchLeft = true);
leftBtn.addEventListener('mouseup', () => touchLeft = false);
rightBtn.addEventListener('mousedown', () => touchRight = true);
rightBtn.addEventListener('mouseup', () => touchRight = false);
shootBtn.addEventListener('mousedown', () => touchShoot = true);
shootBtn.addEventListener('mouseup', () => touchShoot = false);

const stars = [];
for (let i = 0; i < 100; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 1.5,
    speed: 0.2 + Math.random() * 0.5
  });
}

const player = {
  x: canvas.width / 2 - 20,
  y: canvas.height - 60,
  width: 40,
  height: 40,
  speed: 5
};

let score = 0;
let gameOver = false;
let bullets = [];
let enemies = [];
let powerups = [];
let keys = {};
let lastShot = 0;
let shootingCooldown = 250;

document.addEventListener("keydown", e => keys[e.key] = true);
document.addEventListener("keyup", e => keys[e.key] = false);
restartBtn.addEventListener("click", restartGame);

let touchX = null;
canvas.addEventListener('touchstart', handleTouchStart, { passive: false });
canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
canvas.addEventListener('touchend', handleTouchEnd, { passive: false });

function handleTouchStart(e) {
  e.preventDefault();
  const touch = e.touches[0];
  const rect = canvas.getBoundingClientRect();
  touchX = touch.clientX - rect.left;
  if (touch.clientY - rect.top < canvas.height / 2) {
    shoot();
  }
}
function handleTouchMove(e) {
  e.preventDefault();
  if (e.touches.length > 0) {
    const touch = e.touches[0];
    const rect = canvas.getBoundingClientRect();
    touchX = touch.clientX - rect.left;
  }
}
function handleTouchEnd(e) {
  e.preventDefault();
  touchX = null;
}

function restartGame() {
  player.x = canvas.width / 2 - 20;
  player.y = canvas.height - 60;
  bullets = [];
  enemies = [];
  powerups = [];
  score = 0;
  gameOver = false;
  restartBtn.style.display = "none";
  gameLoop();
}

function shoot() {
  const now = Date.now();
  if (now - lastShot > shootingCooldown) {
    bullets.push({
      x: player.x + 5,
      y: player.y + 10,
      width: 3,
      height: 15,
      speed: 8,
      color: "#0ff"
    });
    bullets.push({
      x: player.x + player.width - 8,
      y: player.y + 10,
      width: 3,
      height: 15,
      speed: 8,
      color: "#0ff"
    });
    lastShot = now;
  }
}

function spawnEnemy() {
  if (gameOver) return;
  const size = 30 + Math.random() * 20;
  const x = Math.random() * (canvas.width - size);
  enemies.push({
    x,
    y: -size,
    width: size,
    height: size,
    speed: 1.5 + Math.random() * 2,
    rotation: 0,
    rotationSpeed: (Math.random() - 0.5) * 0.1
  });
}

function spawnPowerup() {
  if (gameOver || Math.random() > 0.3) return;
  const size = 20;
  const x = Math.random() * (canvas.width - size);
  powerups.push({
    x,
    y: -size,
    width: size,
    height: size,
    speed: 1 + Math.random() * 1.5,
    type: Math.random() > 0.5 ? "speed" : "rapid",
    rotation: 0
  });
}

function update() {
  if (gameOver) return;

  const scaleFactor = canvas.width / 480;
  player.speed = 5 * scaleFactor;

  stars.forEach(star => {
    star.y += star.speed;
    if (star.y > canvas.height) {
      star.y = 0;
      star.x = Math.random() * canvas.width;
    }
  });

  if (keys["ArrowLeft"] && player.x > 0) player.x -= player.speed;
  if (keys["ArrowRight"] && player.x + player.width < canvas.width) player.x += player.speed;
  if (keys[" "] || keys["Spacebar"]) shoot();

  if (touchLeft && player.x > 0) player.x -= player.speed;
  if (touchRight && player.x + player.width < canvas.width) player.x += player.speed;
  if (touchShoot) shoot();

  if (touchX !== null) {
    const targetX = touchX - player.width / 2;
    player.x += (targetX - player.x) * 0.2;
    if (player.x < 0) player.x = 0;
    if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;
  }

  bullets.forEach((b, i) => {
    b.y -= b.speed;
    if (b.y < -b.height) bullets.splice(i, 1);
  });

  enemies.forEach((e, i) => {
    e.y += e.speed;
    e.rotation += e.rotationSpeed;
    if (e.y > canvas.height) {
      enemies.splice(i, 1);
      return;
    }

    if (
      e.x < player.x + player.width &&
      e.x + e.width > player.x &&
      e.y < player.y + player.height &&
      e.y + e.height > player.y
    ) {
      gameOver = true;
      restartBtn.style.display = "inline-block";
    }
  });

  powerups.forEach((p, i) => {
    p.y += p.speed;
    p.rotation += 0.05;
    if (p.y > canvas.height) {
      powerups.splice(i, 1);
      return;
    }

    if (
      p.x < player.x + player.width &&
      p.x + p.width > player.x &&
      p.y < player.y + player.height &&
      p.y + p.height > player.y
    ) {
      if (p.type === "speed") {
        player.speed = 8 * scaleFactor;
        setTimeout(() => { player.speed = 5 * scaleFactor; }, 5000);
      } else if (p.type === "rapid") {
        shootingCooldown = 100;
        setTimeout(() => { shootingCooldown = 250; }, 5000);
      }
      powerups.splice(i, 1);
    }
  });

  bullets.forEach((b, bi) => {
    enemies.forEach((e, ei) => {
      if (
        b.x < e.x + e.width &&
        b.x + b.width > e.x &&
        b.y < e.y + e.height &&
        b.y + b.height > e.y
      ) {
        bullets.splice(bi, 1);
        enemies.splice(ei, 1);
        score++;
      }
    });
  });

  scoreDisplay.textContent = "SCORE: " + score;
}

function drawPlayer() {
  ctx.save();
  ctx.translate(player.x + player.width / 2, player.y + player.height / 2);

  ctx.fillStyle = "#f83";
  ctx.beginPath();
  ctx.moveTo(-5, player.height / 2);
  ctx.lineTo(0, player.height / 2 + 5 + Math.random() * 8);
  ctx.lineTo(5, player.height / 2);
  ctx.fill();

  ctx.fillStyle = "#0ff";
  ctx.beginPath();
  ctx.moveTo(0, -player.height / 2);
  ctx.lineTo(-player.width / 2, player.height / 3);
  ctx.lineTo(-player.width / 4, player.height / 2);
  ctx.lineTo(player.width / 4, player.height / 2);
  ctx.lineTo(player.width / 2, player.height / 3);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = "#8cf";
  ctx.beginPath();
  ctx.ellipse(0, -player.height / 6, 5, 8, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawEnemy(enemy) {
  ctx.save();
  ctx.translate(enemy.x + enemy.width / 2, enemy.y + enemy.height / 2);
  ctx.rotate(enemy.rotation);

  ctx.fillStyle = "#f33";
  ctx.beginPath();
  ctx.moveTo(0, -enemy.height / 2);
  ctx.lineTo(-enemy.width / 2, enemy.height / 3);
  ctx.lineTo(0, enemy.height / 2);
  ctx.lineTo(enemy.width / 2, enemy.height / 3);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = "#800";
  ctx.beginPath();
  ctx.arc(0, 0, enemy.width / 5, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawPowerup(powerup) {
  ctx.save();
  ctx.translate(powerup.x + powerup.width / 2, powerup.y + powerup.height / 2);
  ctx.rotate(powerup.rotation);

  ctx.fillStyle = powerup.type === "speed" ? "#0f0" : "#ff0";
  ctx.beginPath();
  ctx.moveTo(0, -powerup.height / 2);
  ctx.lineTo(-powerup.width / 2, 0);
  ctx.lineTo(0, powerup.height / 2);
  ctx.lineTo(powerup.width / 2, 0);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  stars.forEach(star => {
    ctx.fillStyle = `rgba(255, 255, 255, ${0.5 + Math.random() * 0.5})`;
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fill();
  });

  drawPlayer();

  bullets.forEach(b => {
    ctx.fillStyle = b.color;
    ctx.shadowColor = b.color;
    ctx.shadowBlur = 10;
    ctx.fillRect(b.x, b.y, b.width, b.height);
    ctx.shadowBlur = 0;
  });

  enemies.forEach(e => {
    drawEnemy(e);
  });

  powerups.forEach(p => {
    drawPowerup(p);
  });

  if (gameOver) {
    ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#ff0";
    ctx.font = `bold ${Math.floor(canvas.width/12)}px monospace`;
    ctx.textAlign = "center";
    ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2 - 20);
    ctx.font = `${Math.floor(canvas.width/18)}px monospace`;
    ctx.fillText("Score: " + score, canvas.width / 2, canvas.height / 2 + 20);
    ctx.textAlign = "start";
  }
}

function gameLoop() {
  update();
  draw();
  if (!gameOver) requestAnimationFrame(gameLoop);
}

setInterval(spawnEnemy, 1000);
setInterval(spawnPowerup, 3000);
gameLoop();