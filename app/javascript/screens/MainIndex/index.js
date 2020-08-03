import * as THREE from 'three';
import Plane from '../../gl/Plane';
import { preloadImages } from '../../gl/utils';
import Smooth from '../../components/Smooth';

// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// import Stats from 'three/examples/jsm/libs/stats.module'

class MainIndexScreen {
  constructor() {
    this.body = document.querySelector('body');

    this._setup();
  }

  _setup() {
    preloadImages().then(() => {
      const elements = document.querySelectorAll('.js-plane');
      elements.forEach((el, index) => new Plane().init(el, index));
      const smooth = new Smooth();
    })
  }

  __setup() {
    let scene = new THREE.Scene();
    const axesHelper = new THREE.AxesHelper(5)
    scene.add(axesHelper);

    let light = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
    scene.add( light );

    // Camera
    // let camera = new THREE.OrthographicCamera(-25.42300033569336, 25.42300033569336, 25.42300033569336, -25.42300033569336, 0.1, 1000);

    // Renderer
    let renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0x808080);
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );



    const stats = Stats()
    document.body.appendChild(stats.dom);

    let loader = new GLTFLoader();

    loader.load( 'nimble.glb', function ( gltf ) {
      scene.add( gltf.scene );

      let camera = gltf.cameras[0]

      const controls = new OrbitControls(camera, renderer.domElement);

      window.addEventListener('resize', onWindowResize, false);
      function onWindowResize() {
          camera.aspect = window.innerWidth / window.innerHeight
          camera.updateProjectionMatrix()
          renderer.setSize(window.innerWidth, window.innerHeight)
          render()
      }

      var animate = function () {
        requestAnimationFrame(animate)
        controls.update()
        render()
        stats.update()
      };

      function render() {
        renderer.render(scene, camera)
      }
      animate();

        console.log(gltf)

      }, undefined, function ( error ) {
        console.error( error );
      } );
  };
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('body.main.index') !== null) {
    new MainIndexScreen();
  }
});
