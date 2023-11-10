import * as THREE from './three.module.js';
import { PointerLockControls } from './PointerLockControls.js';
import { Rhino3dmLoader } from './3DMLoader.js';

const width = window.innerWidth;
const height = window.innerHeight;

const renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true } );
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( width, height );
renderer.setAnimationLoop( animation );
document.body.appendChild( renderer.domElement );

let raycaster;

let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;
let canJump = false;

let prevTime = performance.now();
const velocity = new THREE.Vector3();
const direction = new THREE.Vector3();
const vertex = new THREE.Vector3();
const color = new THREE.Color();

// init
const camera = new THREE.PerspectiveCamera( 45, width / height, 0.001, 1000 );
//const camera = new THREE.OrthographicCamera( width / - 80, width / 80, height / 80, height / - 80, 1, 1000 );

camera.position.z = 100;

const scene = new THREE.Scene();

const directionalLight1 = new THREE.DirectionalLight( 0xffffff, 2 );
directionalLight1.position.set( 0, 0, 2 );
scene.add( directionalLight1 );

const directionalLight2 = new THREE.DirectionalLight( 0xffffff, 2 );
directionalLight2.position.set( 0, 1, -2 );
scene.add( directionalLight2 );

const light = new THREE.AmbientLight( 0xffffff, 2 );
scene.add( light );

const geometry = new THREE.BoxGeometry( 2, 2, 2 );
const material = new THREE.MeshLambertMaterial({color: 0xff0000});

const mesh = new THREE.Mesh( geometry, material );
//scene.add( mesh );

const gridHelper = new THREE.GridHelper( 10, 10 );
//scene.add( gridHelper );

const loader = new Rhino3dmLoader();
//generally, use this for the Library Path: https://cdn.jsdelivr.net/npm/rhino3dm@8.0.0-beta2/
loader.setLibraryPath( 'https://cdn.jsdelivr.net/npm/rhino3dm@8.0.0-beta2/' );
loader.load( './Sample.3dm', function ( object ) {

  scene.add( object );

} );

let controls = new PointerLockControls( camera, document.body );

window.addEventListener( 'click', function () {

	controls.lock();

} );

scene.add( controls.getObject() );

const onKeyDown = function ( event ) {

	switch ( event.code ) {

		case 'ArrowUp':
		case 'KeyW':
			moveForward = true;
			break;

		case 'ArrowLeft':
		case 'KeyA':
			moveLeft = true;
			break;

		case 'ArrowDown':
		case 'KeyS':
			moveBackward = true;
			break;

		case 'ArrowRight':
		case 'KeyD':
			moveRight = true;
			break;

		case 'Space':
			if ( canJump === true ) velocity.y += 350;
			canJump = false;
			break;

	}

};

const onKeyUp = function ( event ) {

	switch ( event.code ) {

		case 'ArrowUp':
		case 'KeyW':
			moveForward = false;
			break;

		case 'ArrowLeft':
		case 'KeyA':
			moveLeft = false;
			break;

		case 'ArrowDown':
		case 'KeyS':
			moveBackward = false;
			break;

		case 'ArrowRight':
		case 'KeyD':
			moveRight = false;
			break;

	}

};

document.addEventListener( 'keydown', onKeyDown );
document.addEventListener( 'keyup', onKeyUp );

// animation
function animation() {

	const time = performance.now();

	if ( controls.isLocked === true ) {

		const delta = ( time - prevTime ) / 1000;

		velocity.x -= velocity.x * 10.0 * delta;
		velocity.z -= velocity.z * 10.0 * delta;

		velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass

		direction.z = Number( moveForward ) - Number( moveBackward ); //weird way of saying either 1 or -1
		direction.x = Number( moveRight ) - Number( moveLeft );
		direction.normalize(); // this ensures consistent movements in all directions

		if ( moveForward || moveBackward ) velocity.z -= direction.z * 400.0 * delta;
		if ( moveLeft || moveRight ) velocity.x -= direction.x * 400.0 * delta;

		controls.moveRight( - velocity.x * delta );
		controls.moveForward( - velocity.z * delta );

		controls.getObject().position.y += ( velocity.y * delta ); // new behavior

		if ( controls.getObject().position.y < 10 ) {

			velocity.y = 0;
			controls.getObject().position.y = 10;

			canJump = true;

		}

	}

	prevTime = time;

	renderer.render( scene, camera );

}
