// import * as THREE from 'vendor/three';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

class MainIndexScreen {
  constructor() {

    this.body = document.querySelector('body');

    this._setup();
  }

  _setup() {
    var scene = new THREE.Scene();

    var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    camera.position.set(0, 0, 500);

    var renderer = new THREE.WebGLRenderer({
      antialias: true
    });
    renderer.setClearColor(0x808080);
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    new OrbitControls(camera, renderer.domElement);

    var light = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
    scene.add( light );

    var loader = new GLTFLoader();

    loader.load( 'nimble.glb', function ( gltf ) {
      scene.add( gltf.scene );

    }, undefined, function ( error ) {
      console.error( error );
    } );

    render();

    function render() {
      if (resize(renderer)) {
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
      }
      renderer.render(scene, camera);
      requestAnimationFrame(render);
    }

    function resize(renderer) {
      const canvas = renderer.domElement;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const needResize = canvas.width !== width || canvas.height !== height;
      if (needResize) {
        renderer.setSize(width, height, false);
      }
      return needResize;
    }
  };
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('body.main.index') !== null) {
    new MainIndexScreen();
  }
});
