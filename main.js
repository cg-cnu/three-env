const t = THREE;

// camera
const aspectRatio = window.innerWidth / window.innerHeight;
const camera = new t.PerspectiveCamera(35, aspectRatio, 0.1, 3000);
camera.position.set(-2, 5, 50);
camera.rotation.set(0, 0, 0);

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
ground.castShadow = false;
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
trunk.receiveShadow = false;
tree.add(trunk)

// leafs
const leafsGeo = new t.Geometry();
const leafGeo = new t.ConeGeometry(1.5, 3, 4, 2, false);
leafGeo.translate(0, 4, 0);
const leafMtl = new t.MeshLambertMaterial({
    color: 0x228B22
});
const leafCount = 3;
for (var i = 0; i < leafCount; i++) {
    leafGeo.translate(0, 1.2, 0);
    leafsGeo.merge(leafGeo);
}
var leaf = new t.Mesh(leafsGeo, leafMtl);
leaf.castShadow = true;
leaf.receiveShadow = false;
tree.add(leaf);

scene.add(tree)

// sun 
const sunGroup = new t.Group();
const sunGeos = new t.Geometry();

// sun face
const sunFaceGeo = new t.SphereGeometry(1.6, 20);
sunFaceGeo.scale(1, 1, 0.25);
sunGeos.merge(sunFaceGeo);


const rayGeo = new t.CylinderGeometry(0.1, 0.1, 5, 8, 2 );
const rayCount = 6;
for (var ray = 0; ray < rayCount; ray++) {
    rayGeo.rotateZ( Math.PI/rayCount );
    sunGeos.merge( rayGeo)
}

// sun mtl
const sunMtl = new t.MeshLambertMaterial({
    color: 0xffff00
});

// sun mesh
const sunMesh = new t.Mesh(sunGeos, sunMtl)
sunGroup.add(sunMesh);

// directional light as sun
const sunLight = new t.DirectionalLight(0xffffff, 2);
sunLight.target = tree;
sunLight.castShadows = true;
// sunLight.receiveShadow = false;
sunGroup.add(sunLight);
    
sunGroup.position.y = 8;
sunGroup.position.x = 5;
scene.add(sunGroup);

// env light
const envLight = new t.AmbientLight(0xffffff, 0.5);
scene.add(envLight);

// renderer
const renderer = new t.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.shadowMap.enabled = true;
renderer.shadowMap = t.PCFShadowMap;

// main render function
render = () => {
    renderer.render(scene, camera)
}

// orbital controls
const controls = new THREE.OrbitControls( camera, renderer.domElement );
controls.addEventListener( 'change', render );

render();
document.body.appendChild(renderer.domElement);