// variables used in init()
var scene, camera, renderer, stats, stats2, clock;

// Used in initParticles()
var emitter, particleGroup, pool,
    pos = new THREE.Vector3(),
    emitterSettings = {
        type: 'sphere',
        positionSpread: new THREE.Vector3(0, 0, 0),
        radius: 1,
        speed: 10,
        sizeStart: 1,
        sizeEnd: 1,
        opacityStart: 1,
        opacityEnd: 1,
        colorStart: new THREE.Color('white'),
        colorEnd: new THREE.Color('white'),
        particleCount: 1000
    };

var mouseX = 0, mouseY = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

// Setup the scene
function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 10000);
    camera.position.z = 50;
    camera.lookAt( scene.position );

    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setClearColor(0x000000);

    stats = new Stats();
    clock = new THREE.Clock();

    stats.domElement.style.position = 'absolute';
    stats.domElement.style.top = '0';

    document.body.appendChild( renderer.domElement );
    document.body.appendChild( stats.domElement );
}

// Create particle group and emitter
function initParticles() {
    particleGroup = new SPE.Group({
                    texture: THREE.ImageUtils.loadTexture('images/particle.png'),
                    maxAge: 60
                });

    particleGroup.addPool( 1, emitterSettings, false );

    // Add particle group to scene.
    scene.add( particleGroup.mesh );
}

// Generate a random number between -size/2 and +size/2
function rand( size ) {
    return size * Math.random() - (size/2);
}
// Trigger an explosion
function createExplosion() {
    var num = 1000;
    particleGroup.triggerPoolEmitter( 1, (0, 0, 0) );
}

function animate() {
    requestAnimationFrame( animate );

    // Using a fixed time-step here to avoid pauses
    render();
    stats.update();
}


function render( dt ) {
    particleGroup.tick( dt );
    renderer.render( scene, camera );

    camera.position.x = ( mouseX - camera.position.x ) * 0.01;
    camera.position.y = ( - mouseY - camera.position.y ) * 0.01;

    camera.lookAt( scene.position );
}

function onDocumentMouseMove( event ) {

    mouseX = event.clientX - windowHalfX;
    mouseY = event.clientY - windowHalfY;

}

function onDocumentTouchStart( event ) {

    if ( event.touches.length === 1 ) {

        event.preventDefault();

        mouseX = event.touches[ 0 ].pageX - windowHalfX;
        mouseY = event.touches[ 0 ].pageY - windowHalfY;

    }

}

function onDocumentTouchMove( event ) {

    if ( event.touches.length === 1 ) {

        event.preventDefault();

        mouseX = event.touches[ 0 ].pageX - windowHalfX;
        mouseY = event.touches[ 0 ].pageY - windowHalfY;

    }

}

document.addEventListener( 'mousemove', onDocumentMouseMove, false );
document.addEventListener( 'touchstart', onDocumentTouchStart, false );
document.addEventListener( 'touchmove', onDocumentTouchMove, false );

window.addEventListener( 'resize', function() {
    var w = window.innerWidth,
        h = window.innerHeight;

    camera.aspect = w / h;
    camera.updateProjectionMatrix();

    renderer.setSize( w, h );
}, false );

init();
initParticles();

setTimeout(animate, 0);

// Add a mousedown listener. When mouse is clicked, a new explosion will be created.
setTimeout(function () {createExplosion()}, 1000);