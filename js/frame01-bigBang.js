function step01() {
    // variables used in init()
    var scene, camera, renderer, stats, stats2, clock;
    var particleEmitter, particleEmitter2, particleGroup
    var mouseX = 0, mouseY = 0;

    var obj = { end: false };
    var child = document.getElementById("frame01");
    var parent = document.getElementById("container");

    var windowHalfX = window.innerWidth / 2;
    var windowHalfY = window.innerHeight / 2;

    var stepSphere = 0;

    var sphereGeometry = new THREE.SphereGeometry(0.4, 20, 20);
    var sphereMaterial = new THREE.MeshBasicMaterial({color: 0xffffff});
    var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

    // position the sphere
    sphere.position.x = 0;
    sphere.position.y = 0;
    sphere.position.z = 0;

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
        stats.domElement.style.opacity = '0';

        document.body.appendChild( renderer.domElement );
        document.body.appendChild( stats.domElement );
    }

    function initParticles() {
        particleGroup = new SPE.Group({
            texture: THREE.ImageUtils.loadTexture('images/particle.png'),
            maxAge: 60,
            hasPerspective: 1,
            colorize: 0,
            transparent: 1,
            alphaTest: 0.5,
            depthWrite: false,
            depthTest: true,
            blending: THREE.AdditiveBlending
        });

        particleEmitter = new SPE.Emitter({
            type: 'sphere',
            particleCount: 1000,
            position: new THREE.Vector3( 0, 0, 0 ),
            positionSpread: new THREE.Vector3( 0, 0, 0 ),
            radius: 0.001,
            radiusSpread: 0,
            radiusSpreadClamp: 0,
            radiusScale: new THREE.Vector3( 1, 1, 1 ),
            speed: 10,
            speedSpread: -20,
            sizeStart: 1,
            sizeStartSpread: 0,
            sizeMiddle: 1,
            sizeMiddleSpread: 0,
            sizeEnd: 1,
            sizeEndSpread: 0,
            angleStart: 0,
            angleStartSpread: 0,
            angleMiddle: 0,
            angleMiddleSpread: 0,
            angleEnd: 0,
            angleEndSpread: 0,
            angleAlignVelocity: false,
            colorStart: new THREE.Color( 0xffffff ),
            colorStartSpread: new THREE.Vector3( 0, 0, 0 ),
            colorMiddle: new THREE.Color( 0xffffff ),
            colorMiddleSpread: new THREE.Vector3( 0, 0, 0 ),
            colorEnd: new THREE.Color( 0x000000 ),
            colorEndSpread: new THREE.Vector3( 0, 0, 0 ),
            opacityStart: 1,
            opacityStartSpread: 0,
            opacityMiddle: 1,
            opacityMiddleSpread: 0,
            opacityEnd: 1,
            opacityEndSpread: 0,
            duration: 0.01,
            alive: 1,
            isStatic: 0
        });

        // Add the emitter to the group.
        particleGroup.addEmitter( particleEmitter );

        // Add particle group to scene.
        scene.add( particleGroup.mesh );
        scene.add( sphere );
    }

    function animate() {
        stepSphere += 1;
        sphere.position.z = 0.1 * stepSphere;

        // Use a fixed time-step here to avoid gaps
        render( clock.getDelta() );
        requestAnimationFrame( animate );
        stats.update();

        if (obj.end === false && sphere.position.z >= (camera.position.z - 0.5)) {
            obj.end = true;
        };
    }

    function render( dt ) {
        particleGroup.tick( dt );
        renderer.render( scene, camera );

/*        camera.position.x = ( mouseX - camera.position.x ) * 0.005;
        camera.position.y = ( - mouseY - camera.position.y ) * 0.005;*/

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

    var timerAnimate = setTimeout(animate, 0);

    watch(obj, "end", function() {
        if (obj.end == true) {
            step.current = 2;
        }
    });

}