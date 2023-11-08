import * as THREE from './three.module.js';

const width = window.innerWidth;
const height = window.innerHeight;

const renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true } );
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( width, height );
renderer.setAnimationLoop( animation );
document.body.appendChild( renderer.domElement );

// init
//const camera = new THREE.PerspectiveCamera( 45, width / height, 0.001, 1000 );
const camera = new THREE.OrthographicCamera( width / - 80, width / 80, height / 80, height / - 80, 1, 1000 );
camera.position.y = 100;
camera.position.z = 100;
camera.lookAt(0, 0, 0);

const scene = new THREE.Scene();

const directionalLight1 = new THREE.DirectionalLight( 0xffffff, 2 );
directionalLight1.position.set( 0, 2, 2 );
scene.add( directionalLight1 );

const geometry = new THREE.BoxGeometry( 10, 10, 10 );
const material = new THREE.MeshLambertMaterial({color: 0xff0000});

const mesh = new THREE.Mesh( geometry, material );
scene.add( mesh );

// animation
function animation( time ) {

	//scene.rotation.x = time / 2000;
	scene.rotation.y = time / 2000;

	renderer.render( scene, camera );

}
