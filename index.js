/**@type{HTMLCanvasElement} */

const playBtn = document.getElementById("btn");
const offsetMultSelect = document.getElementById("offsetMult");

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
const size = 600;
canvas.width = size;
canvas.height = size;
const tracks = [];
const balls = [];
const trackCenter = { x: size / 2, y: size / 2 };
const trackRadius = 50;
const trackRadiusStep = 25;
const ballRadius = 6;
const ballMinSpeed = 0.01;
const ballSpeedStep = -0.0005;
let offsetMult = 1;
const num = 9;

const soundFrequencies = [
  1760, 1567.98, 1396.91, 1318.51, 1174.66, 1046.5, 987.77, 880, 783.99, 698.46,
  659.25, 587.33, 523.25, 493.88, 440, 392, 349.23, 329.63, 293.66, 261.63,
];

function updateOffset(event) {
  offsetMult = parseInt(event.target.value);
  initializeTracksAndBalls();
}

function initializeTracksAndBalls() {
  tracks.length = 0; // Clear existing tracks
  balls.length = 0; // Clear existing balls

  for (let i = 0; i < num; i++) {
    const radius = trackRadius + i * trackRadiusStep;
    const ballSpeed = ballMinSpeed + i * ballSpeedStep;
    const ballSoundFrequency = soundFrequencies[i];
    const hue = (i * 360) / num;
    const track = new Track(trackCenter, radius, hue, offsetMult);
    const ball = new Ball(
      track,
      ballRadius,
      ballSpeed,
      ballSoundFrequency,
      hue
    );

    tracks.push(track);
    balls.push(ball);
  }
}

offsetMultSelect.addEventListener("change", updateOffset);
initializeTracksAndBalls();

playBtn.addEventListener("click", () => {
  if (getAudioContext().state !== "running") {
    getAudioContext().resume();
  }
});

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  tracks.forEach((track) => {
    track.draw(ctx);
  });
  balls.forEach((ball) => {
    ball.move();
    ball.draw(ctx);
  });

  requestAnimationFrame(animate);
}
animate();

window.addEventListener("resize", () => {
  canvas.width = canvas.width;
  canvas.height = canvas.height;
});
