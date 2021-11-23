
import "./style.css";
import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
const canvas = document.querySelector("canvas.webgl");
const scene = new THREE.Scene();
const group = new THREE.Group();
const cursor = {
  x: 0,
  y: 0,
};
window.addEventListener("mousemove", (event) => {
  cursor.x = event.clientX / sizes.x - 0.5;
  cursor.y = -(event.clientY / sizes.y - 0.5);
  console.log(cursor.y);
});
scene.add(new THREE.AxesHelper());
const mesh = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0x00ff00 })
);
// scene.add(mesh);
mesh.position.x = 2;
group.add(mesh);
const mesh_1 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0x00ff00 })
);
// scene.add(mesh_1);
// group.add(mesh_1);
mesh_1.position.y = 2;
const mesh_2 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0x00ff00 })
);
// mesh_2.position.x = -2;
mesh_2.scale.x = 2;
// scene.add(mesh_2);
// group.add(mesh_2);
// group.scale.x=2
scene.add(group);
const sizes = {
  x: window.innerWidth,
  y:  window.innerHeight,
};
const camera = new THREE.PerspectiveCamera(100, sizes.x / sizes.y,0.1,100);
camera.position.z = 5;
// camera.lookAt(mesh.position);
// camera.lookAt(mesh_1.position)
// camera.position.y=2;
// camera.position.x=4;
scene.add(camera);
// scene.add(group);

// const particles_geometry = new THREE.SphereBufferGeometry(0.02, 10, 10);
// const particles_material = new THREE.MeshBasicMaterial({ color: 0xff00000 });
// for (let i = 0; i < 200; i++) {
//   const particles = new Mesh(particles_geometry, particles_material);
//   scene.add(particles);
//   particles.position.x=(Math.random()-0.5)*20;
//   particles.position.y=(Math.random()-0.3)*20;
//   particles.position.z=(Math.random()-0.5)*20;
// }

// const particles_geometry_2 = new THREE.SphereBufferGeometry(0.02, 10, 10);
// const particles_material_2 = new THREE.MeshBasicMaterial({ color: 0x00ff000 });

// for (let i = 0; i < 200; i++) {
//   const particles = new Mesh(particles_geometry_2, particles_material_2);
//   scene.add(particles);
//   particles.position.x=(Math.random()-0.5)*20;
//   particles.position.y=(Math.random()-0.3)*20;
//   particles.position.z=(Math.random()-0.5)*20;
// }

const control = new OrbitControls(camera,canvas);
control.enableDamping = true ;


const render = new THREE.WebGLRenderer({
  canvas: canvas,
});
console.log(window.devicePixelRatio);
render.setSize(sizes.x, sizes.y);
render.render(scene, camera);
const clock = new THREE.Clock();
const animate = () => {
  const elapsedTime = clock.getElapsedTime();
  
  camera.lookAt(mesh.position);
  render.render(scene, camera);
  control.update();
  window.requestAnimationFrame(animate);
};
animate();











//light

const ambientlight = new THREE.AmbientLight(0xffffff, 1);
const pointlight = new THREE.PointLight(0xff00ff, 3);
pointlight.position.x = 2;
const hemisphere = new THREE.HemisphereLight(0xffff00,0x0000ff,1);
scene.add(hemisphere);
pointlight.position.y = 3;
pointlight.position.z = 4;
scene.add(ambientlight);
// scene.add(pointlight);
const camera = new PerspectiveCamera(75, size.height / size.width);
camera.position.z = 20;
scene.add(camera);
const material = new MeshPhysicalMaterial({ color: "#ea5737" });
material.envMap;
material.map = texture;
material.aomap = amibenttexture;
// amibenttexture.magFilter= THREE.NearestFilter;
// amibenttexture.minFilter= THREE.NearestFilter;
// amibenttexture.wrapS=THREE.MirroredRepeatWrapping;
// amibenttexture.wrapT=THREE.MirroredRepeatWrapping;
material.roughness = 0;
material.flatShading = true;
material.metalness = 0;
material.reflectivity = 2;
material.clearcoatRoughness = 1;
material.aoMapIntensity = 1;
material.displacementMap = heighttexture;
material.normalMap = normaltexture;
material.roughnessMap = roughnesstexture;
const control = new OrbitControls(camera, canvas);
control.enableDamping = true;
const torus = new BoxBufferGeometry(1, 1, 1, 10);
// material.wireframe=true;
const mesh = new Mesh(torus, material);
mesh.position.y=2
scene.add(mesh);



// font loader

const load_font = new THREE.FontLoader();
load_font.load("./Arimo_Bold.json", function (font) {
  const geometry_1 = new TextBufferGeometry("VED VARDHAN", {
    font: font,
    size: 0.5,
    height: 0.5,
    curveSegments: 19,
    bevelEnabled: true,
    bevelThickness: 0.001,
    bevelSize: 0.007,
    bevelOffset: 0,
    bevelSegments: 5,
  });
  geometry_1.center();
  const material_1 = new THREE.MeshMatcapMaterial({ color: "#ea5737" });

  const mesh = new THREE.Mesh(geometry_1, material_1);

  scene.add(mesh);
  const geometry = new THREE.SphereGeometry(0.02, 25, 16);
  const material = new THREE.MeshBasicMaterial({});
  const material_9 = new THREE.MeshBasicMaterial({});
  for (let i = 0; i < 100; i++) {
    console.log("11");
    const sphere = new THREE.Mesh(geometry, material);
    sphere.position.x = (Math.random() - 0.5) * 20;
    sphere.position.y = (Math.random() - 0.5) * 10;
    sphere.position.z = (Math.random() - 0.5) * 20;

    scene.add(sphere);
  }
  for (let i = 0; i < 100; i++) {
    console.log("11");
    const sphere = new THREE.Mesh(geometry, material_9);
    sphere.position.x = (Math.random() - 0.5) * 20;
    sphere.position.y = (Math.random() - 0.5) * 10;
    sphere.position.z = (Math.random() - 0.5) * 20;
    sphere.rotation.x = (Math.random() - 0.5) * 20;
    sphere.rotation.y = (Math.random() - 0.5) * 10;
    sphere.rotation.z = (Math.random() - 0.5) * 20;
    sphere.scale.x = (Math.random() - 0.5) * 5;
    sphere.scale.y = (Math.random() - 0.5) * 5;
    sphere.scale.z = (Math.random() - 0.5) * 5;
    scene.add(sphere);
  }
});

//texture loader

const loader = new THREE.LoadingManager();
const textureloader = new THREE.TextureLoader(loader);
const texture = textureloader.load("./Material_1742.jpg");
const amibenttexture = textureloader.load(
  "./Rocks_Hexagons_001_ambientOcclusion.jpg"
);
const heighttexture = textureloader.load("./Rocks_Hexagons_001_basecolor.jpg");
const basecolortexture = textureloader.load("./Rocks_Hexagons_001_height.png");
const normaltexture = textureloader.load("./Rocks_Hexagons_001_normal.jpg");
const roughnesstexture = textureloader.load(
  "./Rocks_Hexagons_001_roughness.jpg"
);


//circle

const circle_mesh = new THREE.Mesh(
  new THREE.SphereBufferGeometry(0.45, 64, 64),
  new THREE.MeshStandardMaterial({
    color: 0xffffff,
    side: THREE.DoubleSide,
  })
);
circle_mesh.castShadow = true;
circle_mesh.position.y = 1;
scene.add(circle_mesh);


// bounce

const animate = () => {
  // camera.lookAt(mesh.position);
  let time = clock.getElapsedTime();
  // circle_mesh.position.x = Math.cos(time);
  // circle_mesh.position.z = Math.sin(time);
  // circle_mesh.position.y=Math.abs(Math.sin(time)*2            )
  // mesh.rotation.x = time;
  // mesh.rotation.y = time;
  // mesh.rotation.z= time *0.1;
  render.render(scene, camera);
  control.update();
  window.requestAnimationFrame(animate);
};
animate();