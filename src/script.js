import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import {
  BoxBufferGeometry,
  BufferAttribute,
  CameraHelper,
  Color,
  CylinderGeometry,
  LoadingManager,
  Mesh,
  MeshBasicMaterial,
  MeshLambertMaterial,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  MeshToonMaterial,
  PerspectiveCamera,
  PointLight,
  PointLightHelper,
  SpotLight,
  SpotLightHelper,
  TextBufferGeometry,
  TextureLoader,
  Vector3,
  WebGL1Renderer,
} from "three";
import * as dat from "dat.gui";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
// import typefaceFont from "three/examples/fonts/helvetiker_regular.typeface.json";

const gui = new dat.GUI();
const canvas = document.querySelector("canvas.webgl");
const scene = new THREE.Scene();
const group = new THREE.Group();
window.addEventListener("dblclick", () => {
  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else {
    canvas.requestFullscreen();
  }
});

const car = new THREE.Group();
const size = {
  height: window.innerHeight,
  width: window.innerWidth,
};
const table = new THREE.Group();
const loadingmanager = new LoadingManager();
const table_loader = new OBJLoader(loadingmanager);
table_loader.load("./Table IKEA Liatorp N200821.obj", (tableobj) => {
  console.log(tableobj);
  const children = [...tableobj.children];
  for (let child of children) {
    table.add(child);
  }
});
table.position.x = 10;
table.scale.set(0.0005, 0.0005, 0.0005);
group.add(table);
table.position.y = -1.9;
table.position.x = 12.3;
table.position.z = 11;
const texture = new TextureLoader(loadingmanager);
const gltfloader = new FBXLoader();
gltfloader.load(
  "./Jeep.fbx",
  (jeep) => {
    const children = [...jeep.children];
    for (let child of children) {
      child.receiveShadow = true;
      car.add(child);
    }
  },
  () => {
    console.log("progess");
  }
);
group.add(car);
const length = 1.5,
  width = 0.7;

const shape = new THREE.Shape();
shape.moveTo(0, 0);
shape.lineTo(0, width);
shape.lineTo(length, width);
shape.lineTo(length, 0);
shape.lineTo(0, 0);

const extrudeSettings = {
  steps: 2,
  depth: 3,
  bevelEnabled: true,
  bevelThickness: 0.5,
  bevelSize: 0.5,
  bevelOffset: 0,
  bevelSegments: 1,
};

const Light_house_light_geometry = new THREE.ExtrudeGeometry(
  shape,
  extrudeSettings
);
const Light_house_light_material = new THREE.MeshStandardMaterial();
const Light_house_light = new THREE.Mesh(
  Light_house_light_geometry,
  Light_house_light_material
);
Light_house_light.position.y = 11.4;
Light_house_light.position.x = -14.2;
Light_house_light.position.z = -12.8;
Light_house_light.rotation.x = 0.25;

gui.add(Light_house_light.rotation, "x").min(0).max(1).step(0.1);
gui.add(Light_house_light.rotation, "y").min(0).max(1).step(0.1);
gui.add(Light_house_light.rotation, "z").min(-1).max(1).step(0.1);

Light_house_light.geometry.center();
group.add(Light_house_light);

const lighthouse_pointlight = new PointLight(0xff0000, 3, 5);
lighthouse_pointlight.position.y = 11;
lighthouse_pointlight.position.x = -14;
lighthouse_pointlight.position.z = -8.5;
group.add(lighthouse_pointlight);
const lighthouse_geomotry = new THREE.CylinderGeometry(0.8, 2, 13, 32);
const lighthouse_material = new THREE.MeshStandardMaterial();
const lighthouse = new THREE.Mesh(lighthouse_geomotry, lighthouse_material);
lighthouse.position.y = 4.64;
lighthouse.position.x = -14;
lighthouse.position.z = -12.8;
group.add(lighthouse);

gui.add(lighthouse_pointlight.position, "x").min(-15).max(-1).step(0.05);
gui.add(lighthouse_pointlight.position, "y").min(1).max(15).step(0.01);
gui.add(lighthouse_pointlight.position, "z").min(-15).max(-1).step(0.1);

const translate = {
  x: 0,
  y: -1893063,
  z: 4263000,
};

const lighthouse_spotlight = new THREE.SpotLight(
  0xff00000,
  0.2,
  40,
  Math.PI * 0.2
);
lighthouse_spotlight.decay = 1;
lighthouse_spotlight.position.set(-14, 11.4, -12.8);

lighthouse_spotlight.shadow.camera.far = 3;
const direction = () => {
  const look = new THREE.Object3D();
  look.translateX(translate.x);
  look.translateY(translate.y);
  look.translateZ(translate.z);
  lighthouse_spotlight.target = look;
  lighthouse_spotlight.updateMatrixWorld();
  lighthouse_spotlight.target.updateMatrixWorld();
  group.add(lighthouse_spotlight);
  group.add(lighthouse_spotlight.target);
};
let angle = 0;
let angle_y = -1893063;
let start = true;
const control_lighthouse = () => {
  if (start) {
    angle = angle + 20000;
    angle_y = angle_y - 5000;
    lighthouse_pointlight.position.x += 0.009;
    lighthouse_pointlight.position.z -= 0.009;
    Light_house_light.rotation.z -= 0.0009;
    Light_house_light.rotation.y += 0.003;
    translate.x = angle;
    translate.y = angle_y;
    if (angle === 10000000) {
      start = false;
    }
  } else {
    angle = angle - 20000;
    angle_y = angle_y + 5000;
    Light_house_light.rotation.z += 0.0009;
    Light_house_light.rotation.y -= 0.003;
    translate.x = angle;
    translate.y = angle_y;
    lighthouse_pointlight.position.z += 0.009;
    lighthouse_pointlight.position.x -= 0.009;
    if (angle === 0) {
      lighthouse.position.x = -14;
      lighthouse.position.z = -12.8;
      start = true;
      angle_y = -1893063;
    }
  }
  window.requestAnimationFrame(control_lighthouse);
  direction();
};
control_lighthouse();
const floor_geomotry = new BoxBufferGeometry(4, 3, 4);
const floor_material = new THREE.MeshPhongMaterial({
  color: "rgb(190,203,255)",
});
floor_material.transparent = false;
floor_material.shiness = 1000;
const floor_1 = new Mesh(floor_geomotry, floor_material);
floor_1.position.y = 1.1 + 0.1;
floor_material.side = THREE.DoubleSide;
group.add(floor_1);
car.position.x = 5;
car.position.y = -1.92;
// car.position.y=5
// car.position.z=5
car.scale.set(0.5, 0.5, 0.5);

const groundfloor_geomotry = new BoxBufferGeometry(7, 1.5, 7);
const groundfloor_material = new MeshStandardMaterial({});
const groundfloor = new Mesh(groundfloor_geomotry, groundfloor_material);
groundfloor.position.y = -1.16;

group.add(groundfloor);
const cone_geometry = new THREE.ConeGeometry(5, 1, 32);
const cone_material = new THREE.MeshStandardMaterial();
const cone = new THREE.Mesh(cone_geometry, cone_material);
cone.position.y = 6.038;
group.add(cone);
const floor_2 = new Mesh(floor_geomotry, floor_material);
floor_2.position.y = 4;
gui.add(cone.position, "y").min(6).max(7).step(0.1);
group.add(floor_2);

let count = 500;
const point_gemotry = new THREE.BufferGeometry();
const point_material = new THREE.PointsMaterial({ color: 0xffff00 });
const own_shape = new Float32Array(count * 3);

let y = 1;
for (let i = 0; i < count * 3; i++) {
  // own_shape[i] = (Math.random() - 0.5) * 22;
  own_shape[i] = (Math.random() - 0.5) * 35;
}
const attributes = new THREE.BufferAttribute(own_shape, 3);
point_gemotry.setAttribute("position", attributes);
point_material.size = 0.005;
point_material.sizeAttenuation = true;
// point_material.depthWrite = false;
const point = new THREE.Points(point_gemotry, point_material);
group.add(point);
const drum_material = new THREE.CylinderGeometry(0.4, 0.5, 0.5, 32);
const material_drum = new THREE.MeshStandardMaterial({});

const drum_fire_geometry = new THREE.DodecahedronGeometry(0.4, 2);
const drum_fire_material = new THREE.PointsMaterial({
  color: "#C63D3D",
});
drum_fire_material.size = 0.001;
drum_fire_material.sizeAttenuation = true;
const drum_fire = new THREE.Points(drum_fire_geometry, drum_fire_material);
drum_fire.position.set(-1.2, -0.9, -4.2);
group.add(drum_fire);

const drum = new THREE.Mesh(drum_material, material_drum);
drum.position.y = -1.63;
drum.position.x = -1.2;
drum.position.z = -4.2;
group.add(drum);

const drum_fire_2 = new THREE.Points(drum_fire_geometry, drum_fire_material);
drum_fire_2.position.set(1.2, -0.9, -4.2);
group.add(drum_fire_2);

gui.add(drum_fire.position, "y").min(-2).max(0).step(0.01).name("shvcs");

const drum_2 = new THREE.Mesh(drum_material, material_drum);
drum_2.position.y = -1.63;
drum_2.position.x = 1.2;
drum_2.position.z = -4.2;
group.add(drum_2);

const drum_3 = new THREE.Mesh(drum_material, material_drum);
drum_3.position.y = -1.63;
drum_3.position.x = 1.2;
drum_3.position.z = 4.2;
group.add(drum_3);

const drum_fire_3 = new THREE.Points(drum_fire_geometry, drum_fire_material);
drum_fire_3.position.set(1.2, -0.9, 4.2);
group.add(drum_fire_3);

const drum_4 = new THREE.Mesh(drum_material, material_drum);
drum_4.position.y = -1.63;
drum_4.position.x = -1.2;
drum_4.position.z = 4.2;
group.add(drum_4);

const drum_fire_4 = new THREE.Points(drum_fire_geometry, drum_fire_material);
drum_fire_4.position.set(-1.2, -0.9, 4.2);
group.add(drum_fire_4);

const pillar_geometry = new THREE.CylinderGeometry(0.3, 0.3, 7, 32);
const pillar_material = new THREE.MeshStandardMaterial({});
const pillar = new THREE.Mesh(pillar_geometry, pillar_material);
pillar.position.y = 1.65;
pillar.position.x = 11;
pillar.position.z = 13.8;
group.add(pillar);

const pillar_1 = new THREE.Mesh(pillar_geometry, pillar_material);
pillar_1.position.y = 1.65;
pillar_1.position.x = 10.5;
pillar_1.position.z = 8.5;
group.add(pillar_1);

const pillar_2 = new THREE.Mesh(pillar_geometry, pillar_material);
pillar_2.position.y = 1.65;
pillar_2.position.x = 14.8;
pillar_2.position.z = 11;
group.add(pillar_2);

gui.add(pillar_1.position, "x").min(1).max(20).step(0.5).name("xe");

gui.add(pillar_1.position, "z").min(1).max(20).step(0.5).name("ze");

const pillar_top_geometry = new THREE.IcosahedronBufferGeometry(1.4, 1);
const pillar_top_material = new THREE.MeshStandardMaterial({});
const pillar_top = new THREE.Mesh(pillar_top_geometry, pillar_top_material);
pillar_top.position.y = 7.5;
pillar_top.position.x = 12;
pillar_top.position.z = 11;
group.add(pillar_top);

const outline_gemotry = new THREE.DodecahedronGeometry(16, 10);
const outline_material = new THREE.PointsMaterial({ color: 0xff0000 });
outline_material.size = 0.01;
outline_material.sizeAttenuation = true;

const outline_point = new THREE.Points(outline_gemotry, outline_material);

const spotlight = new THREE.SpotLight(0xfff000, 0.3, 40, Math.PI * 0.3);
spotlight.position.y = 20;

group.add(spotlight);

group.add(car);
const pointlight = new THREE.PointLight(0xff0000, 0.3);
pointlight.castShadow = true;

group.add(pointlight);
pointlight.position.x = 2.5;
pointlight.position.y = 1;
const pointlight_2 = new THREE.PointLight(0x00ff00, 0.3);
group.add(pointlight_2);
pointlight_2.position.x = -2.5;
pointlight_2.position.y = 1;

const pillar_light = new THREE.PointLight(0xff0f00, 0.6, 20);
group.add(pillar_light);
pillar_light.position.set(17, 4, 16);
const pillar_light_2 = new THREE.PointLight(0xff0f00, 0.6, 20);
group.add(pillar_light_2);
pillar_light_2.position.set(15.4, 13.3, 10.8);
const Pillar_torus_geometry = new THREE.TorusGeometry(3, 0.4, 100, 100);
const Pillar_material = new THREE.MeshStandardMaterial();
const Pillar_torus = new THREE.Mesh(Pillar_torus_geometry, Pillar_material);
Pillar_torus.position.y = 5.5;
Pillar_torus.position.x = 12;
Pillar_torus.position.z = 11;
Pillar_torus.rotation.x = Math.PI * 0.5;
group.add(Pillar_torus);

const Pillar_torus_geometry_1 = new THREE.TorusGeometry(2.5, 0.4, 100, 100);
const Pillar_torus_1 = new THREE.Mesh(Pillar_torus_geometry_1, Pillar_material);
Pillar_torus_1.position.y = 6;
Pillar_torus_1.position.x = 12;
Pillar_torus_1.position.z = 11;
Pillar_torus_1.rotation.x = Math.PI * 0.5;
group.add(Pillar_torus_1);
const Pillar_torus_geometry_2 = new THREE.TorusGeometry(2, 0.4, 100, 100);
const Pillar_torus_2 = new THREE.Mesh(Pillar_torus_geometry_2, Pillar_material);
Pillar_torus_2.position.y = 6.5;
Pillar_torus_2.position.x = 12;
Pillar_torus_2.position.z = 11;
Pillar_torus_2.rotation.x = Math.PI * 0.5;
group.add(Pillar_torus_2);
const Pillar_torus_geometry_3 = new THREE.TorusGeometry(1.5, 0.4, 100, 100);
const Pillar_torus_3 = new THREE.Mesh(Pillar_torus_geometry_3, Pillar_material);
Pillar_torus_3.position.y = 7;
Pillar_torus_3.position.x = 12;
Pillar_torus_3.position.z = 11;
Pillar_torus_3.rotation.x = Math.PI * 0.5;
group.add(Pillar_torus_3);
gui.add(Pillar_torus_3.position, "y").min(1).max(20).step(0.5).name("ye");
const camera = new PerspectiveCamera(75, size.height / size.width);
camera.position.z = 25;
camera.position.y = 6;
const control = new OrbitControls(camera, canvas);
control.enableDamping = true;
window.addEventListener("resize", () => {
  size.width = window.innerWidth;
  size.height = window.innerHeight;
  camera.aspect = size.width / size.height;
  camera.updateProjectionMatrix();
  render.setSize(size.width, size.height);
  render.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

const plane_mesh = new THREE.Mesh(
  new THREE.PlaneBufferGeometry(7, 7),
  new THREE.MeshStandardMaterial({
    side: THREE.DoubleSide,
  })
);
group.add(plane_mesh);

const ground_plane = new THREE.Mesh(
  new THREE.PlaneBufferGeometry(35, 35),
  new THREE.MeshStandardMaterial({
    side: THREE.DoubleSide,
  })
);
ground_plane.rotation.x = Math.PI * 0.5;
ground_plane.position.y = -1.89;
group.add(ground_plane);
ground_plane.receiveShadow = true;
group.castShadow = true;
group.receiveShadow = true;
const plane_mesh_1 = new THREE.Mesh(
  new THREE.PlaneBufferGeometry(7, 7),
  new THREE.MeshStandardMaterial({
    side: THREE.DoubleSide,
  })
);
plane_mesh_1.position.y = 2.6;

const plane_mesh_2 = new THREE.Mesh(
  new THREE.PlaneBufferGeometry(7, 7),
  new THREE.MeshStandardMaterial({
    side: THREE.DoubleSide,
  })
);

plane_mesh_2.position.y = 5.51;
plane_mesh_2.rotation.x = Math.PI * 0.5;
group.add(plane_mesh_2);
gui.add(plane_mesh_2.position, "y").min(2.5).max(10.0);
gui.add(plane_mesh_2.rotation, "x").min(2.5).max(10.0);
plane_mesh_1.rotation.x = Math.PI * 0.5;
group.add(plane_mesh_1);
scene.add(group);
plane_mesh.position.set(0, -0.4, 0);
plane_mesh.rotation.x = Math.PI * 0.5;
plane_mesh.receiveShadow = true;
group.add(plane_mesh);

const cart_wheel_1_geometry = new THREE.RingGeometry(0.2, 1, 32);
const cart_wheel_1_material = new THREE.MeshNormalMaterial({
  side: THREE.DoubleSide,
});
const cart_wheel_1 = new THREE.Mesh(
  cart_wheel_1_geometry,
  cart_wheel_1_material
);
cart_wheel_1.position.x = 10;
cart_wheel_1.position.z = -12;
cart_wheel_1.position.y = -0.87;
group.add(cart_wheel_1);

const cart_wheel_1_geometry_torus = new THREE.TorusBufferGeometry(
  0.8,
  0.3,
  64,
  64
);
const cart_wheel_1_torus = new THREE.Mesh(
  cart_wheel_1_geometry_torus,
  cart_wheel_1_material
);
cart_wheel_1_torus.position.x = 10;
cart_wheel_1_torus.position.z = -12;
cart_wheel_1_torus.position.y = -0.79;
group.add(cart_wheel_1_torus);

const cart_wheel_2 = new THREE.Mesh(
  cart_wheel_1_geometry,
  cart_wheel_1_material
);
cart_wheel_2.position.x = 10;
cart_wheel_2.position.z = -8.5;
cart_wheel_2.position.y = -0.87;
group.add(cart_wheel_2);

const cart_wheel_2_geometry_torus = new THREE.TorusBufferGeometry(
  0.8,
  0.3,
  64,
  64
);
const cart_wheel_2_torus = new THREE.Mesh(
  cart_wheel_2_geometry_torus,
  cart_wheel_1_material
);
cart_wheel_2_torus.position.x = 10;
cart_wheel_2_torus.position.z = -8.5;
cart_wheel_2_torus.position.y = -0.79;
group.add(cart_wheel_2_torus);

const cart_center_rod_geometry = new THREE.CylinderGeometry(0.25, 0.25, 5, 32);
const cart_center_rod_material = new THREE.MeshStandardMaterial();
const cart_center_rod = new THREE.Mesh(
  cart_center_rod_geometry,
  cart_center_rod_material
);
cart_center_rod.position.y = -0.85;
cart_center_rod.rotation.x = Math.PI * 0.5;
cart_center_rod.position.x = 10;
cart_center_rod.position.z = -10.19;
group.add(cart_center_rod);

const cart_plane = new THREE.Mesh(
  new THREE.PlaneBufferGeometry(3.5,2.7),
  cart_center_rod_material
);
group.add(cart_plane);

gui.add(cart_plane.position, "x").min(10).max(20).step(0.1);
gui.add(cart_plane.position, "y").min(-1).max(1).step(0.01);
gui.add(cart_plane.position, "z").min(-13).max(-8).step(0.01);


cart_plane.position.y = -0.47;
cart_plane.rotation.x = 1.6;
cart_plane.rotation.y = 3.45;
cart_plane.rotation.z = Math.PI;
cart_plane.position.x = 10.4;
cart_plane.position.z = -10.3;
gui.add(cart_plane.rotation, "x").min(1).max(Math.PI).step(0.1);
gui.add(cart_plane.rotation, "y").min(1).max(Math.PI*2).step(0.01);
gui.add(cart_plane.rotation, "z").min(1).max(Math.PI).step(0.01);

const render = new THREE.WebGLRenderer({
  canvas: canvas,
});
render.setSize(window.innerHeight, window.innerWidth);
render.shadowMap.enabled = true;
render.shadowMap.type = THREE.PCFSoftShadowMap;
// render.outputEncoding = THREE.sRGBEncoding;
render.toneMapping = THREE.CineonToneMapping;
const clock = new THREE.Clock();
const animate = () => {
  let time = clock.getElapsedTime();
  render.render(scene, camera);
  control.update();
  window.requestAnimationFrame(animate);
};
animate();
