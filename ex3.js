import * as THREE from './three.module.js';
import { Rhino3dmLoader } from './3DMLoader.js';

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
directionalLight1.position.set( 0, 0, 2 );
scene.add( directionalLight1 );

const directionalLight2 = new THREE.DirectionalLight( 0xffffff, 2 );
directionalLight2.position.set( 0, 1, -2 );
scene.add( directionalLight2 );

const gridHelper = new THREE.GridHelper( 20, 20 );
scene.add( gridHelper );

const loader = new Rhino3dmLoader();
//generally, use this for the Library Path: https://cdn.jsdelivr.net/npm/rhino3dm@8.0.0-beta2/
loader.setLibraryPath( 'https://cdn.jsdelivr.net/npm/rhino3dm@8.0.0-beta2/' );
loader.load( './Sample.3dm', function ( object ) {

  scene.add( object );

} );

// animation
function animation( time ) {

	//scene.rotation.x = time / 2000;
	scene.rotation.y = time / 5000;

	renderer.render( scene, camera );

}
