// Hello Cube App
// Your first Three.js application

let wdown = false;
const speed = 0.2;


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
camera.position.set(30, 20, 0);
camera.lookAt(new THREE.Vector3(0,20,0));

// cube
const geometry = new THREE.BoxGeometry(2, 2, 2);
const material2 = new THREE.MeshNormalMaterial();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00});
const cube = new THREE.Mesh(geometry, material);
cube.position.set(0,40,0);
cube.castShadow = true;
scene.add(cube);


//  Add lights
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(1,4,0);
light.castShadow = true;
scene.add(light);



//  Ground
const geometryground = new THREE.PlaneGeometry( 7, 40 );
const materialground = new THREE.MeshBasicMaterial( {color: 0xff, side: THREE.DoubleSide} );
const planeground = new THREE.Mesh( geometryground, materialground );
planeground.position.set(0,-1,0);
planeground.rotateX(Math.PI/2)
planeground.receiveShadow = true;
scene.add( planeground );



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

let gravity = -0.001;
let i = 0;

function rotatecube() {

    cube.position.y += 0.4 * (i * i * gravity);
    i += 1;
    console.log(i);

    renderer.render(scene, camera)
    requestAnimationFrame(() => rotatecube());

}


document.getElementById("switch").addEventListener("click", function (event) {

    console.log("/")
    window.location.href = "index.html";

})

// rotatecube();