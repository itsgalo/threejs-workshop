import * as THREE from './three.module.js';
import { DragControls } from './DragControls.js';
import { Rhino3dmLoader } from './3DMLoader.js';

const width = window.innerWidth;
const height = window.innerHeight;

const renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true } );
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( width, height );
renderer.setAnimationLoop( animation );
document.body.appendChild( renderer.domElement );

const objects = [];
const mouse = new THREE.Vector2()
let raycaster = new THREE.Raycaster();

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


const loader = new Rhino3dmLoader();
//generally, use this for the Library Path: https://cdn.jsdelivr.net/npm/rhino3dm@8.0.0-beta2/
loader.setLibraryPath( 'https://cdn.jsdelivr.net/npm/rhino3dm@8.0.0-beta2/' );
loader.load( './Cubes.3dm', function ( object ) {

	object.traverse( child => {
		if (child.isMesh) {
				//child.material = material;
				objects.push( child );
		}
	});
  scene.add( object );

} );

let controls = new DragControls( [ ... objects ], camera, renderer.domElement );
controls.addEventListener( 'drag', animation );

document.addEventListener( 'click', onClick );

function onClick( event ) {

	event.preventDefault();

	const draggableObjects = controls.getObjects();
	draggableObjects.length = 0;

	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

	raycaster.setFromCamera( mouse, camera );

	const intersections = raycaster.intersectObjects( objects, true );

	if ( intersections.length > 0 ) {

		const object = intersections[ 0 ].object;
		draggableObjects.push( object );

	}
}

// animation
function animation( time ) {

	scene.rotation.y = time / 2000;

	renderer.render( scene, camera );

}
