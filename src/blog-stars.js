import * as THREE from "three";

/* -------------------- SETUP -------------------- */
const container = document.getElementById("starfield");

const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x000000, 0.002);

const rect = container.getBoundingClientRect();

const camera = new THREE.PerspectiveCamera(
  75,
  rect.width / rect.height,
  0.1,
  1000
);
camera.position.z = 50;

const renderer = new THREE.WebGLRenderer({
  alpha: true,
  antialias: true,
});
renderer.setSize(rect.width, rect.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
container.appendChild(renderer.domElement);

/* -------------------- LIGHTING -------------------- */
scene.add(new THREE.AmbientLight(0xffffff, 1));

const starGeometry = new THREE.BufferGeometry();
const starCount = 2000;
const positions = [];
const colors = [];

for (let i = 0; i < starCount; i++) {
  positions.push(
    THREE.MathUtils.randFloatSpread(200),
    THREE.MathUtils.randFloatSpread(200),
    THREE.MathUtils.randFloatSpread(200)
  );

  const color = new THREE.Color(`hsl(${Math.random() * 360}, 50%, 80%)`);
  colors.push(color.r, color.g, color.b);
}

starGeometry.setAttribute(
  "position",
  new THREE.Float32BufferAttribute(positions, 3)
);
starGeometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));

const starMaterial = new THREE.PointsMaterial({
  size: 0.5,
  vertexColors: true,
  transparent: true,
  opacity: 0.8,
});

const stars = new THREE.Points(starGeometry, starMaterial);
scene.add(stars);

/* -------------------- ANIMATION -------------------- */
function animate() {
  requestAnimationFrame(animate);
  stars.rotation.y += 0.0005;
  renderer.render(scene, camera);
}
animate();

/* -------------------- RESIZE -------------------- */
window.addEventListener("resize", () => {
  const rect = container.getBoundingClientRect();
  camera.aspect = rect.width / rect.height;
  camera.updateProjectionMatrix();
  renderer.setSize(rect.width, rect.height);
});
