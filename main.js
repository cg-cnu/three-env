const t = THREE;

// camera
const aspectRatio = window.innerWidth / window.innerHeight;
const camera = new t.PerspectiveCamera(150, aspectRatio, 0.1, 3000);
camera.position.z = 4;
camera.position.y = 8;
camera.rotation.x = -0.5;
const scene = new t.Scene()

// ground 
const groundGeo = new t.SphereGeometry(6, 20);
const groundMtl = new t.MeshLambertMaterial({
    color: 0x32CD32
});
const ground = new t.Mesh(groundGeo, groundMtl);
ground.rotation.x = -40;
ground.position.y = 0;
ground.scale.z = 0.01
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
const leafCount = 3;
for (var i = 0; i < leafCount; i++) {
    let leafGeo = new t.ConeGeometry(1.5, 3, 4, 2, false);
    let leafMtl = new t.MeshLambertMaterial({
        color: 0x228B22
    });
    var leaf = new t.Mesh(leafGeo, leafMtl);
    leaf.position.y = 5 + i;
    leaf.castShadow = true;
    tree.add(leaf);
}

scene.add(tree)

// sun light
const sun = new t.DirectionalLight(0xffffff, 0.5);
sun.position.y = 5;
sun.position.x = 3;
sun.castShadow = true;
scene.add(sun);

// env light
const env = new t.AmbientLight(0xffffff, 0.25);
scene.add(env);

const renderer = new t.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.shadowMap.enabled = true;
renderer.shadowMap = t.PCFShadowMap;

renderer.render(scene, camera)
document.body.appendChild(renderer.domElement);