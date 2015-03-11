function initSurface(containerDiv, meshAmbient, meshDiffuse, meshSpeed, lightAmbient, lightDiffuse) {
    function initBackground() {

    var container = document.getElementById('background-container' + containerDiv);
    var output = document.getElementById('background-output' + containerDiv);

    config.background.LIGHT.bounds = FSS.Vector3.create(),
    config.background.LIGHT.step = FSS.Vector3.create(
      Math.randomInRange(0.2, 1.0),
      Math.randomInRange(0.2, 1.0),
      Math.randomInRange(0.2, 1.0)
    )

    //------------------------------
    // Global Properties
    //------------------------------
    var now, start = Date.now();
    var center = FSS.Vector3.create();
    var attractor = FSS.Vector3.create();
    var renderer, scene, mesh, geometry, material;
    var webglRenderer, canvasRenderer, svgRenderer;
    var gui, autopilotController;


    //------------------------------
    // Methods
    //------------------------------
    function initialise() {
        createRenderer();
        createScene();
        createMesh();
        createLights();
        addEventListeners();
        resize(container.offsetWidth, container.offsetHeight);
        animate();
    }

    function createRenderer() {
        webglRenderer = new FSS.WebGLRenderer();
        canvasRenderer = new FSS.CanvasRenderer();
        svgRenderer = new FSS.SVGRenderer();
        setRenderer(config.background.RENDER.renderer);
    }

    function setRenderer(index) {
        if (renderer) {
          output.removeChild(renderer.element);
        }

        renderer = canvasRenderer;
        renderer.setSize(container.offsetWidth, container.offsetHeight);
        output.appendChild(renderer.element);
        }

        function createScene() {
        scene = new FSS.Scene();
        }

        function createMesh() {
        scene.remove(mesh);
        renderer.clear();
        geometry = new FSS.Plane(config.background.MESH.width * renderer.width, config.background.MESH.height * renderer.height, config.background.MESH.segments, config.background.MESH.slices);
        material = new FSS.Material(config.background.MESH.ambient, config.background.MESH.diffuse);
        mesh = new FSS.Mesh(geometry, material);
        scene.add(mesh);

        // Augment vertices for animation
        var v, vertex;
        for (v = geometry.vertices.length - 1; v >= 0; v--) {
          vertex = geometry.vertices[v];
          vertex.anchor = FSS.Vector3.clone(vertex.position);
          vertex.step = FSS.Vector3.create(
            Math.randomInRange(0.2, 1.0),
            Math.randomInRange(0.2, 1.0),
            Math.randomInRange(0.2, 1.0)
          );
          vertex.time = Math.randomInRange(0, Math.PIM2);
        }
    }

    function createLights() {
    var l, light;
    for (l = scene.lights.length - 1; l >= 0; l--) {
      light = scene.lights[l];
      scene.remove(light);
    }
    renderer.clear();
    for (l = 0; l < config.background.LIGHT.count; l++) {
      light = new FSS.Light(config.background.LIGHT.ambient, config.background.LIGHT.diffuse);
      light.ambientHex = light.ambient.format();
      light.diffuseHex = light.diffuse.format();
      scene.add(light);

      // Augment light for animation
      light.mass = Math.randomInRange(0.5, 1);
      light.velocity = FSS.Vector3.create();
      light.acceleration = FSS.Vector3.create();
      light.force = FSS.Vector3.create();

      // Ring SVG Circle
      light.ring = document.createElementNS(FSS.SVGNS, 'circle');
      light.ring.setAttributeNS(null, 'stroke', light.ambientHex);
      light.ring.setAttributeNS(null, 'stroke-width', '0.5');
      light.ring.setAttributeNS(null, 'fill', 'none');
      light.ring.setAttributeNS(null, 'r', '10');

      // Core SVG Circle
      light.core = document.createElementNS(FSS.SVGNS, 'circle');
      light.core.setAttributeNS(null, 'fill', light.diffuseHex);
      light.core.setAttributeNS(null, 'r', '4');
    }
    }

    function resize(width, height) {
    renderer.setSize(width, height);
    FSS.Vector3.set(center, renderer.halfWidth, renderer.halfHeight);
    createMesh();
    }

    function animate() {
    now = Date.now() - start;
    update();
    render();
    requestAnimationFrame(animate);
    }

    function update() {
    var ox, oy, oz, l, light, v, vertex, offset = config.background.MESH.depth/2;

    // Update Bounds
    FSS.Vector3.copy(config.background.LIGHT.bounds, center);
    FSS.Vector3.multiplyScalar(config.background.LIGHT.bounds, config.background.LIGHT.xyScalar);

    // Update Attractor
    FSS.Vector3.setZ(attractor, config.background.LIGHT.zOffset);

    // Overwrite the Attractor position
    if (config.background.LIGHT.autopilot) {
      ox = Math.sin(config.background.LIGHT.step[0] * now * config.background.LIGHT.speed);
      oy = Math.cos(config.background.LIGHT.step[1] * now * config.background.LIGHT.speed);
      FSS.Vector3.set(attractor,
        config.background.LIGHT.bounds[0]*ox,
        config.background.LIGHT.bounds[1]*oy,
        config.background.LIGHT.zOffset);
    }

    // Animate Lights
    for (l = scene.lights.length - 1; l >= 0; l--) {
      light = scene.lights[l];

      // Reset the z position of the light
      FSS.Vector3.setZ(light.position, config.background.LIGHT.zOffset);

      // Calculate the force Luke!
      var D = Math.clamp(FSS.Vector3.distanceSquared(light.position, attractor), config.background.LIGHT.minDistance, config.background.LIGHT.maxDistance);
      var F = config.background.LIGHT.gravity * light.mass / D;
      FSS.Vector3.subtractVectors(light.force, attractor, light.position);
      FSS.Vector3.normalise(light.force);
      FSS.Vector3.multiplyScalar(light.force, F);

      // Update the light position
      FSS.Vector3.set(light.acceleration);
      FSS.Vector3.add(light.acceleration, light.force);
      FSS.Vector3.add(light.velocity, light.acceleration);
      FSS.Vector3.multiplyScalar(light.velocity, config.background.LIGHT.dampening);
      FSS.Vector3.limit(light.velocity, config.background.LIGHT.minLimit, config.background.LIGHT.maxLimit);
      FSS.Vector3.add(light.position, light.velocity);
    }

    // Animate Vertices
    for (v = geometry.vertices.length - 1; v >= 0; v--) {
      vertex = geometry.vertices[v];
      ox = Math.sin(vertex.time + vertex.step[0] * now * config.background.MESH.speed);
      oy = Math.cos(vertex.time + vertex.step[1] * now * config.background.MESH.speed);
      oz = Math.sin(vertex.time + vertex.step[2] * now * config.background.MESH.speed);
      FSS.Vector3.set(vertex.position,
        config.background.MESH.xRange*geometry.segmentWidth*ox,
        config.background.MESH.yRange*geometry.sliceHeight*oy,
        config.background.MESH.zRange*offset*oz - offset);
      FSS.Vector3.add(vertex.position, vertex.anchor);
    }

    // Set the Geometry to dirty
    geometry.dirty = true;
    }

    function render() {
    renderer.render(scene);

    // Draw Lights
    if (config.background.LIGHT.draw) {
      var l, lx, ly, light;
      for (l = scene.lights.length - 1; l >= 0; l--) {
        light = scene.lights[l];
        lx = light.position[0];
        ly = light.position[1];
        switch(config.background.RENDER.renderer) {
          case CANVAS:
            renderer.context.lineWidth = 0.5;
            renderer.context.beginPath();
            renderer.context.arc(lx, ly, 10, 0, Math.PIM2);
            renderer.context.strokeStyle = light.ambientHex;
            renderer.context.stroke();
            renderer.context.beginPath();
            renderer.context.arc(lx, ly, 4, 0, Math.PIM2);
            renderer.context.fillStyle = light.diffuseHex;
            renderer.context.fill();
            break;
          case SVG:
            lx += renderer.halfWidth;
            ly = renderer.halfHeight - ly;
            light.core.setAttributeNS(null, 'fill', light.diffuseHex);
            light.core.setAttributeNS(null, 'cx', lx);
            light.core.setAttributeNS(null, 'cy', ly);
            renderer.element.appendChild(light.core);
            light.ring.setAttributeNS(null, 'stroke', light.ambientHex);
            light.ring.setAttributeNS(null, 'cx', lx);
            light.ring.setAttributeNS(null, 'cy', ly);
            renderer.element.appendChild(light.ring);
            break;
        }
      }
    }
    }

    function addEventListeners() {
    window.addEventListener('resize', onWindowResize);
    }

    //------------------------------
    // Callbacks
    //------------------------------


    function onWindowResize(event) {
    resize(container.offsetWidth, container.offsetHeight);
    render();
    }



    // Let there be light!
    initialise();
    }

    var config = {};

    $(function() {

    var $body = $(document.body),
        $window = $(window);

    // Background
    var canvas = document.createElement('canvas');

        config.background = {
            enabled: true,

            RENDER: {
                // Takes all the information in a Scene and renders it to a context.
                // A Scene sits at the very top of the stack. It simply manages arrays of Mesh & Light objects.
                renderer: 'canvas'
            },

            MESH: {      
                ambient: meshAmbient, // Default 
                diffuse: meshDiffuse, // Default
                width: 1.2, // Triangle Width
                height: 1.2, // Triangle Height
                depth: 10, // Transparency of the triangles
                segments: 16, // Number of triangles to display in 1 row
                slices: 8, // Number of triangles to display in 1 column
                xRange: 0.8, // Wideness of the triangles in X Position
                yRange: 0.1, // Wideness of the triangles in Y Position
                zRange: 1.0, // Wideness of the triangles in Z Position
                speed: meshSpeed // Speed of the moving traingles
            },

            LIGHT: {
                autopilot: true, // Set this to true if you want the light to follow your mouse cursor
                ambient: lightAmbient,
                diffuse: lightDiffuse,
                count: 1, // Contrast 
                zOffset: 500,
                xyScalar: 1,
                speed: 0.001,
                gravity: 1200,
                dampening: 0.15,
                minLimit: 8,
                maxLimit: null,
                minDistance: 20,
                maxDistance: 400,
                draw: false // Set to true if you want to just draw a background image (static).
            }
        }

        // Initialize the background
        initBackground();

    });

}
