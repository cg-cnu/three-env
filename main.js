const t = THREE;

// camera
const aspectRatio = window.innerWidth / window.innerHeight;
const camera = new t.PerspectiveCamera(35, aspectRatio, 0.1, 3000);
camera.position.set(-20, 6, -45);
camera.rotation.x = -0.5;

// scene 
const scene = new t.Scene()

// ground 
const groundGeo = new t.SphereGeometry(6, 20);
const groundMtl = new t.MeshLambertMaterial({
    color: 0x32CD32
});
const ground = new t.Mesh(groundGeo, groundMtl);
ground.rotation.x += 90;
ground.position.y = 0;
ground.scale.z = 0.02;
ground.receiveShadow = true;
scene.add(ground);

// tree
const tree = new t.Group()

// trunk
const trunkGeo = new t.CylinderGeometry(0.2, 0.6, 6, 8, 6, false)
const trunkMtl = new t.MeshLambertMaterial({
    color: 0xD2691E
});
const trunk = new t.Mesh(trunkGeo, trunkMtl)
trunk.position.y = 3;
trunk.castShadow = true;
tree.add(trunk)

// leafs
const leafsGeo = new t.Geometry();
const leafGeo = new t.ConeGeometry(1.5, 3, 4, 2, false);
const leafMtl = new t.MeshLambertMaterial({
    color: 0x228B22
});
const leafCount = 3;
for (var i = 0; i < leafCount; i++) {
    leafGeo.translate(0, 5 + (i/100), 0);
    leafsGeo.merge(leafGeo);
}
var leaf = new t.Mesh(leafsGeo, leafMtl);
leaf.castShadow = true;
tree.add(leaf);

scene.add(tree)

// sun 
const sun = new t.Group();

// sun mtl
const sunMtl = new t.MeshLambertMaterial({
    color: 0xffff00
});

// sun face
const sunFaceGeo = new t.SphereGeometry(2, 20);
const sunFace = new t.Mesh(sunFaceGeo, sunMtl);
sunFace.scale.z = 0.02;
sun.add(sunFace)

// sun rays
// const noOfRays = 6;
// for (let i = 0; i < noOfRays; i++) {
//     let rayGeo = new t.CylinderGeometry(2, 2, 3, 2);
//     let ray = t.Mesh(rayGeo, sunMtl);
//     ray.position.x = 4;
//     ray.position.x = 4;
//     ray.rotation.x = 4;
//     sun.add(ray);
// }

// directional light as sun
const sunLight = new t.DirectionalLight(0xffffff, 0.5);
sunLight.target = tree;
sunLight.castShadow = true;
sun.add(sunLight);

sun.position.y = 8;
sun.position.x = 5;
scene.add(sun);

// env light
const env = new t.AmbientLight(0xffffff, 0.25);
scene.add(env);

// renderer
const renderer = new t.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.shadowMap.enabled = true;
renderer.shadowMap = t.PCFShadowMap;

// main render function
render = () => {
    // console.log()
    renderer.render(scene, camera)
}

// orbital controls
const controls = new THREE.OrbitControls( camera, renderer.domElement );
controls.addEventListener( 'change', render ); // remove when using animation loop

render();
document.body.appendChild(renderer.domElement);