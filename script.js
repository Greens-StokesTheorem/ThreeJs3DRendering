// Hello Cube App
// Your first Three.js application
// import { OrbitControls } from "OrbitControls.js";


let wdown = false;
const speed = 0.2;
let controls = {w: {pressed: false},
                a: {pressed: false},
                s: {pressed: false},
                d: {pressed: false}}


// sizes
const width = window.innerWidth;
const height = window.innerHeight;

// scene
const scene = new THREE.Scene();
scene.background = new THREE.Color("#262626");



// camera
const fov = 80;
const aspect = width / height;
const near = 0.1;   //  Where the objects starts to be visible
const far = 30000;   //  Where the objects stop being visible
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.set(0, 7, 6);
camera.lookAt(new THREE.Vector3(0,1,0));

class Box extends THREE.Mesh {

    constructor({width, height, depth, color = "#00ff00", velocity = {
        x: 0,
        y: 0,
        z: 0
    }, position = {
        x: 0,
        y: 0,
        z: 0}, zAcceleration = false}) {

        super(new THREE.BoxGeometry(width, height, depth), 
              new THREE.MeshStandardMaterial({ color: color}));

        this.width = width;
        this.height = height;
        this.depth = depth;

        this.position.set(position.x, position.y, position.z);
        this.bottom = this.position.y - this.height / 2;
        this.top = this.position.y + this.height / 2;

        this.right = this.position.x + this.width / 2;
        this.left = this.position.x - this.width / 2;

        this.front = this.position.z - this.depth / 2;
        this.back = this.position.z + this.depth / 2;

        this.velocity = velocity;
        this.gravity = -0.06;
        this.zAcceleration = zAcceleration;
        
    }

    updateSides() {

        this.bottom = this.position.y - this.height / 2;
        this.top = this.position.y + this.height / 2;

        this.right = this.position.x + this.width / 2;
        this.left = this.position.x - this.width / 2;

        this.front = this.position.z - this.depth / 2;
        this.back = this.position.z + this.depth / 2;

    }

    update(ground) {

        this.updateSides();

        if (this.zAcceleration) this.velocity.z += 0.001;

        this.position.x += this.velocity.x;
        this.position.z += this.velocity.z;

        // const xCollision = this.right >= ground.left && this.left <= ground.right;
        // const yCollision = this.bottom <= ground.top && this.top >= ground.bottom;
        // const zCollision = this.back >= ground.front && this.front <= ground.back;

        //  Detech the collision

        if (boxcollision({box1: cube, box2: ground})) {
            console.log("collision");
        }

        this.velocity.y += this.gravity;
        this.applygravity(ground);


    }

    applygravity(ground) {

        if (boxcollision({box1: this, box2: ground})) {

            //  Changes direction of movement
            this.velocity.y *= 0.8;
            this.velocity.y = -this.velocity.y;

        } else {

            //  Keeps moving
            this.position.y += this.velocity.y;

        }
    }

}

function boxcollision({box1, box2}) {

    const xCollision = box1.right >= box2.left && box1.left <= box2.right;
    const yCollision = box1.bottom + box1.velocity.y <= box2.top && box1.top >= box2.bottom;
    const zCollision = box1.back >= box2.front && box1.front <= box2.back;


    return xCollision && yCollision && zCollision

}


// cube
const cube = new Box({width: 1, height: 1, depth: 1, velocity: {x: 0, y: -0.1, z: 0}, position: {x: 0, y: 5, z: 0}});
cube.castShadow = true;
scene.add(cube);


//  Add lights
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(4,8,5);
light.castShadow = true;
scene.add(light);


let materialarray = [];
let texture_ft = new THREE.TextureLoader().load("clouds1_north.bmp")
let texture_bk = new THREE.TextureLoader().load("clouds1_south.bmp")
let texture_up = new THREE.TextureLoader().load("clouds1_up.bmp")
let texture_dn = new THREE.TextureLoader().load("clouds1_down.bmp")
let texture_rt = new THREE.TextureLoader().load("clouds1_east.bmp")
let texture_lf = new THREE.TextureLoader().load("clouds1_west.bmp")


materialarray.push(new THREE.MeshBasicMaterial({map: texture_ft}));
materialarray.push(new THREE.MeshBasicMaterial({map: texture_bk}));
materialarray.push(new THREE.MeshBasicMaterial({map: texture_up}));
materialarray.push(new THREE.MeshBasicMaterial({map: texture_dn}));
materialarray.push(new THREE.MeshBasicMaterial({map: texture_lf}));
materialarray.push(new THREE.MeshBasicMaterial({map: texture_rt}));
// materialarray.push(new THREE.MeshBasicMaterial({map: texture_up}))

for (i = 0; i < 6; i++) {
    materialarray[i].side = THREE.DoubleSide;
}

//  Box
let length = 150;
skyboxGeo = new THREE.BoxGeometry(length, length, length);
skybox = new THREE.Mesh(skyboxGeo, materialarray);
scene.add(skybox);




//  Ground
const ground = new Box({width: 20, height: 2, depth: 40, color: "#0000ff", velocity: {x: 0, y: 0, z: 0}, position: {x: 0, y: -1, z: 0}})
ground.receiveShadow = true;
scene.add( ground );


// const enemy = new Box({width: 1, height: 1, depth: 1, velocity: {x: 0, y: -0.1, z: 0.03}, position: {x: 0, y: 2, z: -14}, color: "red", zAcceleration: true});
// enemy.castShadow = true;
// scene.add(enemy);
// const enemies = [enemy];
const enemies = [];


// renderer
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(width, height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// rendering the scene
const container = document.querySelector('#threejs-container');
container.append(renderer.domElement);
renderer.shadowMap.enabled = true;
renderer.render(scene, camera);



document.addEventListener("keydown", function (event) {



    if (event.code == "KeyW") {

        controls.w.pressed = true;

    } else if (event.code == "KeyS") {

        controls.s.pressed = true;
    
    } else if (event.code == "KeyA") {

        controls.a.pressed = true;

    } else if (event.code == "KeyD") {

        controls.d.pressed = true;

    } else if (event.code == "Space") {

        cube.velocity.y = 0.6;

    }

})

document.addEventListener("keyup", function (event) {

    if (event.code == "KeyW") {
        controls.w.pressed = false;

    } else if (event.code == "KeyS") {
        controls.s.pressed = false;
    
    } else if (event.code == "KeyA") {
        controls.a.pressed = false;

    } else if (event.code == "KeyD") {
        controls.d.pressed = false;

    }

})


function random(min, max) {

    return Math.floor(Math.random() * (max - min + 1)) + min;

}


document.getElementById("switch").addEventListener("click", function (event) {

    console.log("/")
    window.location.href = "gravitytest.html";

})
document.getElementById("switchcamera").addEventListener("click", function (event) {

    window.location.href = "changecamera.html"

})



let frames = 0;
function animate() {

    frames++;
    const animationId = requestAnimationFrame(animate);
    renderer.render(scene, camera);
    skybox.rotateY(0.0001);


    cube.velocity.x = 0;
    cube.velocity.z = 0;


    if (controls.w.pressed) {
        cube.velocity.z = -0.2;
    } else if (controls.s.pressed) {
        cube.velocity.z = 0.2;
    }
    
    if (controls.a.pressed) {
        cube.velocity.x = -0.2;
    } else if (controls.d.pressed) {
        cube.velocity.x = 0.2;
    } 

    cube.update(ground);
    enemies.forEach(Enemy => {
        Enemy.update(ground);
        if (boxcollision({box1: cube, box2: Enemy})) {
            cancelAnimationFrame(animationId)
        }
    })

    if (frames % 30 === 0) {

        console.log("/")
        const enemy = new Box({width: 1, height: 1, depth: 1, 
            velocity: {x: 0, y: -0.1, z: Math.random()}, 
            position: {x: random(-5,5), y: 2, z: -14}, color: "red", 
            zAcceleration: true});

        enemy.castShadow = true;
        scene.add(enemy);
        enemies.push(enemy);

    }


}



animate();