// Hello Cube App
// Your first Three.js application

let wdown = false;
const speed = 0.2;
let gravity = -0.05;
let i = 0;
let inity;
let final;

// sizes
const width = window.innerWidth;
const height = window.innerHeight;

// scene
const scene = new THREE.Scene();
scene.background = new THREE.Color("#262626");


// camera
const fov = 80;
const aspect = window.innerWidth / window.innerHeight;
const near = 0.1;   //  Where the objects starts to be visible
const far = 1000;   //  Where the objects stop being visible
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.set(16, 5, 0);
camera.lookAt(new THREE.Vector3(0,7,0));


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
        this.gravity = -0.1;
        
    }

    update(group) {
        this.bottom = this.position.y - this.height / 2;
        this.top = this.position.y + this.height / 2;

        this.velocity.y += this.gravity;
        this.applygravity()

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
const cube = new Box({width: 2, height: 2, depth: 2, velocity: {x: 0, y: -0.1, z: 0}, position: {x: 0, y: 10, z: 0}});
cube.castShadow = true;
scene.add(cube);


//  Add lights
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5,14,0);
light.castShadow = true;
scene.add(light);



//  Ground
const ground = new Box({width: 7, height: 2, depth: 40, color: "#0000ff", velocity: {x: 0, y: 0, z: 0}, position: {x: 0, y: -1, z: 0}})
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





document.addEventListener("keyup", function () {
    wdown = false;
})

document.addEventListener("keydown", function (event) {

    if (event.key == "w") {

        wdown = true;
        animatey(true);

    } else if (event.key == "s") {

        wdown = true;
        animatey(false);
    
    } else if (event.key == "a") {

        wdown = true;
        animatex(true);

    } else if (event.key == "d") {

        wdown = true;
        animatex(false);

    } else if (event.key == "m") {

        init = cube.position.y;
        rotatecube();

    } else {

        // const geometry = new THREE.BoxGeometry(random(), random(), random());
        // const material = new THREE.MeshNormalMaterial();
        // const cube = new THREE.Mesh(geometry, material);
        // cube.position.set(-random(),random(),-random());
        // scene.add(cube);
        // renderer.render(scene, camera);
    }

})


function random() {
    return Math.floor(Math.random() * 5);
}

//   True is forwards   False if backwords
function animatey(direction) {

    let delx;

    if (direction == true) {
        delx = -speed;
    } else if (direction == false) {

        delx = speed;
    }


    cube.translateZ(delx);
    renderer.render(scene, camera);

    if (wdown == true) {
        requestAnimationFrame(() => animatey(direction));
    } else {
        //  pass
    }
}

//  true is left     false is right (ironic)
function animatex(direction) {

    let dely;

    if (direction == true) {
        dely = -speed;
    } else {
        dely = speed;
    }

    cube.translateX(dely);
    renderer.render(scene, camera);

    if (wdown== true) {
        requestAnimationFrame(() => animatex(direction));
    } else {
        //  pass
    }

}


function rotatecube() {

    requestAnimationFrame(rotatecube);
    renderer.render(scene, camera);
    cube.update(ground)

    
}


document.getElementById("switch").addEventListener("click", function (event) {

    console.log("/")
    window.location.href = "index.html";

})

