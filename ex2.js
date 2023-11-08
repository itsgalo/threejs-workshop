import * as THREE from './three.module.js';

const width = window.innerWidth;
const height = window.innerHeight;

const renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true } );
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( width, height );
renderer.setAnimationLoop( animation );
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
document.body.appendChild( renderer.domElement );

// init
//const camera = new THREE.PerspectiveCamera( 45, width / height, 0.001, 1000 );
const camera = new THREE.OrthographicCamera( width / - 80, width / 80, height / 80, height / - 80, 1, 1000 );
camera.position.y = 100;
camera.position.z = 100;
camera.lookAt(0, 0, 0);

const scene = new THREE.Scene();

const directionalLight1 = new THREE.DirectionalLight( 0xffffff, 2 );
directionalLight1.position.set( 20, 20, 20 );
directionalLight1.castShadow = true;

//Set up shadow properties for the light
directionalLight1.shadow.mapSize.width = 2048; // default
directionalLight1.shadow.mapSize.height = 2048; // default
directionalLight1.shadow.camera.near = 0.5; // default
directionalLight1.shadow.camera.far = 100; // default

directionalLight1.shadow.camera.left = - 50;
directionalLight1.shadow.camera.right = 50;
directionalLight1.shadow.camera.top = 50;
directionalLight1.shadow.camera.bottom = - 50;

scene.add( directionalLight1 );

const geometry = new THREE.BoxGeometry( 5, 10, 5 );
const material = new THREE.MeshLambertMaterial({color: 0xff0000});


const mesh = new THREE.Mesh( geometry, material );
mesh.position.set(0, 5, 0);
mesh.castShadow = true;
scene.add( mesh );

const planegeo = new THREE.BoxGeometry(20, 1, 20);
const planemat = new THREE.MeshLambertMaterial({color: 0x0000ff});

const planemesh = new THREE.Mesh( planegeo, planemat);
planemesh.receiveShadow = true;
scene.add( planemesh );

//Create a helper for the shadow camera (optional)
const helper = new THREE.CameraHelper( directionalLight1.shadow.camera );
//scene.add( helper );

// animation
function animation( time ) {

	helper.update();

	scene.rotation.y = time / 2000;
	//mesh.rotation.y = time / 2000;

	renderer.render( scene, camera );

}
