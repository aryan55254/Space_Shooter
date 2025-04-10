const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const restartBtn = document.getElementById('restartBtn');

    // Stars background
    const stars = [];
    for (let i = 0; i < 100; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5,
        speed: 0.2 + Math.random() * 0.5
      });
    }

    // Player
    const player = {
      x: canvas.width / 2 - 20,
      y: canvas.height - 60,
      width: 40,
      height: 40,
      speed: 5
    };

    // Game state
    let score = 0;
    let gameOver = false;
    let bullets = [];
    let enemies = [];
    let powerups = [];
    let keys = {};
    let lastShot = 0;
    let shootingCooldown = 250; // ms

    // Event listeners
    document.addEventListener("keydown", e => keys[e.key] = true);
    document.addEventListener("keyup", e => keys[e.key] = false);
    
    restartBtn.addEventListener("click", restartGame);

    function restartGame() {
      // Reset game state
      player.x = canvas.width / 2 - 20;
      player.y = canvas.height - 60;
      bullets = [];
      enemies = [];
      powerups = [];
      score = 0;
      gameOver = false;
      restartBtn.style.display = "none";
      
      // Restart game loop
      gameLoop();
    }

    function shoot() {
      const now = Date.now();
      if (now - lastShot > shootingCooldown) {
        // Two bullets, one from each "wing"
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

      // Move stars
      stars.forEach(star => {
        star.y += star.speed;
        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }
      });

      // Player movement
      if (keys["ArrowLeft"] && player.x > 0) player.x -= player.speed;
      if (keys["ArrowRight"] && player.x + player.width < canvas.width) player.x += player.speed;
      if (keys[" "] || keys["Spacebar"]) shoot();

      // Bullets
      bullets.forEach((b, i) => {
        b.y -= b.speed;
        if (b.y < -b.height) bullets.splice(i, 1);
      });

      // Enemies
      enemies.forEach((e, i) => {
        e.y += e.speed;
        e.rotation += e.rotationSpeed;
        
        if (e.y > canvas.height) {
          enemies.splice(i, 1);
          return;
        }

        // Collision with player
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

      // Powerups
      powerups.forEach((p, i) => {
        p.y += p.speed;
        p.rotation += 0.05;
        
        if (p.y > canvas.height) {
          powerups.splice(i, 1);
          return;
        }

        // Collision with player
        if (
          p.x < player.x + player.width &&
          p.x + p.width > player.x &&
          p.y < player.y + player.height &&
          p.y + p.height > player.y
        ) {
          if (p.type === "speed") {
            player.speed = 8; // Temporary speed boost
            setTimeout(() => { player.speed = 5; }, 5000);
          } else if (p.type === "rapid") {
            shootingCooldown = 100; // Temporary rapid fire
            setTimeout(() => { shootingCooldown = 250; }, 5000);
          }
          
          powerups.splice(i, 1);
        }
      });

      // Bullet-enemy collisions
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
    }

    function drawPlayer() {
      // Spaceship body
      ctx.save();
      ctx.translate(player.x + player.width / 2, player.y + player.height / 2);
      
      // Engine flame
      ctx.fillStyle = "#f83";
      ctx.beginPath();
      ctx.moveTo(-5, player.height / 2);
      ctx.lineTo(0, player.height / 2 + 5 + Math.random() * 8);
      ctx.lineTo(5, player.height / 2);
      ctx.fill();
      
      // Ship body
      ctx.fillStyle = "#0ff";
      ctx.beginPath();
      ctx.moveTo(0, -player.height / 2);
      ctx.lineTo(-player.width / 2, player.height / 3);
      ctx.lineTo(-player.width / 4, player.height / 2);
      ctx.lineTo(player.width / 4, player.height / 2);
      ctx.lineTo(player.width / 2, player.height / 3);
      ctx.closePath();
      ctx.fill();
      
      // Cockpit
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
      
      // Ship body
      ctx.fillStyle = "#f33";
      ctx.beginPath();
      ctx.moveTo(0, -enemy.height / 2);
      ctx.lineTo(-enemy.width / 2, enemy.height / 3);
      ctx.lineTo(0, enemy.height / 2);
      ctx.lineTo(enemy.width / 2, enemy.height / 3);
      ctx.closePath();
      ctx.fill();
      
      // Details
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
      
      // Powerup shape
      if (powerup.type === "speed") {
        ctx.fillStyle = "#0f0";
      } else {
        ctx.fillStyle = "#ff0";
      }
      
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

      // Draw stars
      stars.forEach(star => {
        ctx.fillStyle = `rgba(255, 255, 255, ${0.5 + Math.random() * 0.5})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw player
      drawPlayer();

      // Draw bullets
      bullets.forEach(b => {
        ctx.fillStyle = b.color;
        ctx.fillRect(b.x, b.y, b.width, b.height);
        
        // Bullet glow
        ctx.shadowColor = b.color;
        ctx.shadowBlur = 10;
        ctx.fillRect(b.x, b.y, b.width, b.height);
        ctx.shadowBlur = 0;
      });

      // Draw enemies
      enemies.forEach(e => {
        drawEnemy(e);
      });
      
      // Draw powerups
      powerups.forEach(p => {
        drawPowerup(p);
      });

      // Score and UI
      ctx.shadowBlur = 0;
      ctx.fillStyle = "#fff";
      ctx.font = "18px monospace";
      ctx.fillText("SCORE: " + score, 10, 25);

      if (gameOver) {
        ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
        ctx.fillRect(0, canvas.height / 2 - 50, canvas.width, 100);
        
        ctx.fillStyle = "#ff0";
        ctx.font = "36px monospace";
        ctx.textAlign = "center";
        ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2);
        ctx.font = "24px monospace";
        ctx.fillText("Score: " + score, canvas.width / 2, canvas.height / 2 + 40);
        ctx.textAlign = "start";
      }
    }

    function gameLoop() {
      update();
      draw();
      if (!gameOver) requestAnimationFrame(gameLoop);
    }

    // Start the game
    setInterval(spawnEnemy, 1000);
    setInterval(spawnPowerup, 3000);
    gameLoop();