const background = new Image();
background.src = 'images/bg.png';
const flappy = new Image();
flappy.src = 'images/flappy.png';
flappy.style = 'border: 1px solid red';
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

class Player {
  constructor() {
    this.y = canvas.height / 2;
    this.x = 0;
    this.width = 45;
    this.height = 45;
    this.speedX = -1;
    this.speedY = 1;
    this.gravity = 0.5;
    this.gravitySpeed = 1;
  }

  update() {
    console.log(this.gravity);
    paintBackground(this.x);
    paintBackground(this.x + canvas.width);
    paintFlappy(150, this.y, this.width, this.height);
    this.newPos();
    this.x += this.speedX;
    this.x %= canvas.width;
  }

  newPos() {
    this.gravitySpeed += this.gravity;
    this.y += this.speedY * this.gravitySpeed;
  }
}

let faby;
let isGameOver;

window.onload = function () {
  document.getElementById('start-button').onclick = function () {
    startGame();
  };

  window.addEventListener('keydown', (event) => {
    event.preventDefault();
    faby.gravity = -Math.abs(faby.gravity);
  });

  window.addEventListener('keyup', (event) => {
    event.preventDefault();
    faby.gravity = Math.abs(faby.gravity);
  });

  function startGame() {
    isGameOver = false;
    faby = new Player();
    update();
  }
};

const paintBackground = (x) => {
  ctx.drawImage(background, x, 0);
};

const paintFlappy = (x, y, width, height) => {
  ctx.drawImage(flappy, x, y, width, height);
};

const update = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  faby.update();

  if (!isGameOver) {
    window.requestAnimationFrame(() => {
      update();
    });
  }
  gameOver();
};

const gameOver = () => {
  if (faby.y + faby.height > canvas.height) {
    isGameOver = true;
    ctx.font = '100px sans-serif';
    ctx.fillStyle = 'red';
    ctx.fillText('GAME OVER!', 100, canvas.height / 2);
  }
};
