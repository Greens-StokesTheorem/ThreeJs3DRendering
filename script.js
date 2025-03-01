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
const aspect = width /height;
const near = 0.1;   //  Where the objects starts to be visible
const far = 30000;   //  Where the objects stop being visible
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.set(0, 2, 6);
camera.lookAt(new THREE.Vector3(0,1,0));

class Box extends THREE.Mesh {

    constructor({width, height, depth, color = "#00ff00", velocity = {
        x: 0,
        y: 0,
        z: 0
    }, position = {
        x: 0,
        y: 0,
        z: 0}}) {

        super(new THREE.BoxGeometry(width, height, depth), 
              new THREE.MeshStandardMaterial({ color: color}));

        this.width = width;
        this.height = height;
        this.depth = depth;

        this.position.set(position.x, position.y, position.z);
        this.bottom = this.position.y - this.height / 2;
        this.top = this.position.y + this.height / 2;

        this.velocity = velocity;
        this.gravity = -0.06;
        
    }

    update(group) {

        this.bottom = this.position.y - this.height / 2;
        this.top = this.position.y + this.height / 2;

        this.position.x += this.velocity.x;
        this.position.z += this.velocity.z;

        this.velocity.y += this.gravity;
        this.applygravity();

    }

    applygravity() {

        if (this.bottom + this.velocity.y <= ground.top) {

            //  Changes direction of movement
            this.velocity.y *= 0.8;
            this.velocity.y = -this.velocity.y;

        } else {

            //  Keeps moving
            this.position.y += this.velocity.y;

        }
    }

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
    materialarray[i].side = THREE.BackSide;
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

    } else if (event.key == "m") {

        rotatecube();

    } else if (event.key == "p") {

        animate(ground);

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


function random() {
    return Math.floor(Math.random() * 5);
}


//  true is left     false is right (ironic)


document.getElementById("switch").addEventListener("click", function (event) {

    console.log("/")
    window.location.href = "gravitytest.html";

})

function animate() {

    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    skybox.rotateY(0.0001);


    cube.velocity.x = 0;
    cube.velocity.z = 0;


    if (controls.w.pressed) {
        cube.velocity.z = -0.1;
    } else if (controls.s.pressed) {
        cube.velocity.z = 0.1;
    }
    
    if (controls.a.pressed) {
        cube.velocity.x = -0.1;
    } else if (controls.d.pressed) {
        cube.velocity.x = 0.1;
    } 

    cube.update(ground);

}



animate();