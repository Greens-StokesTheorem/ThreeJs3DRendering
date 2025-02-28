// Hello Cube App
// Your first Three.js application

let wdown = false;


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
camera.position.set(5, 4, 6);
// camera.position.set(0, 0, 4);
camera.lookAt(new THREE.Vector3(0,0,0));

// cube
const geometry = new THREE.BoxGeometry(2, 2, 2);
const material1 = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    wireframe: true
});

const material = new THREE.MeshNormalMaterial();

const cube = new THREE.Mesh(geometry, material);
scene.add(cube);


//  Ground
const geometryground = new THREE.PlaneGeometry( 7, 40 );
const materialground = new THREE.MeshBasicMaterial( {color: 0xff, side: THREE.DoubleSide} );
const planeground = new THREE.Mesh( geometryground, materialground );
planeground.position.set(0,0,0);
planeground.rotateX(Math.PI/2)
scene.add( planeground );



// renderer
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(width, height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// rendering the scene
const container = document.querySelector('#threejs-container');
container.append(renderer.domElement);
renderer.render(scene, camera);





document.addEventListener("pointerdown", function (event) {

    let camerax = 0;
    let cameray = 0;

    let initx = event.clientX;
    let inity = event.clientY;

    document.addEventListener("pointermove", function (event) {

        let posx = event.clientX;
        let posy = event.clientY;

        let delx = posx - initx;
        let dely = posy - inity;

        camerax += delx;
        cameray += dely;

        camera.lookAt(camerax, 0, cameray)
    
    })


})

document.addEventListener("keyup", function () {
    wdown = false;
})

document.addEventListener("keydown", function (event) {

    if (event.key == "w") {

        wdown = true;
        animate(-1);

    } else if (event.key == "d") {

        wdown = true;
        animate(+1);

    } else {

        const geometry = new THREE.BoxGeometry(random(), random(), random());
        const material = new THREE.MeshNormalMaterial();
        const cube = new THREE.Mesh(geometry, material);
        cube.position.set(-random(),random(),-random());
        scene.add(cube);
        renderer.render(scene, camera);
    }

})


function random() {
    return Math.floor(Math.random() * 5);
}

function animate(num) {

    alert(num)
    cube.translateZ(num)
    renderer.render(scene, camera);

    if (wdown == true) {
        requestAnimationFrame(animate);
    } else {
        //  pass
    }
}
