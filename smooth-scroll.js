let current = 0;
let target = 0;
let velocity = 0;

const ease = 0.08;
const maxSpeed = 100; // limits crazy fast scroll

const container = document.getElementById("scroll-container");

// Set dynamic height
function setBodyHeight() {
  document.body.style.height = container.scrollHeight + "px";
}
setBodyHeight();
window.addEventListener("resize", setBodyHeight);

// Wheel input with velocity
window.addEventListener("wheel", (e) => {
  velocity += e.deltaY * 0.8;

  // clamp velocity
  velocity = Math.max(-maxSpeed, Math.min(maxSpeed, velocity));

  target += velocity;
});

// Keyboard support
window.addEventListener("keydown", (e) => {
  const step = 120;

  if (e.key === "ArrowDown") target += step;
  if (e.key === "ArrowUp") target -= step;
});

// Touch support
let touchStartY = 0;

window.addEventListener("touchstart", (e) => {
  touchStartY = e.touches[0].clientY;
});

window.addEventListener("touchmove", (e) => {
  const touchY = e.touches[0].clientY;
  const delta = touchStartY - touchY;

  target += delta * 1.5;
  touchStartY = touchY;
});

// Animation loop
function loop() {
  const maxScroll = document.body.scrollHeight - window.innerHeight;

  // clamp target
  target = Math.max(0, Math.min(target, maxScroll));

  // smooth interpolation
  current += (target - current) * ease;

  // apply transform (GPU friendly)
  container.style.transform = `translate3d(0, ${-current}px, 0)`;

  // decay velocity (important for natural feel)
  velocity *= 0.9;

  requestAnimationFrame(loop);
}

loop();
