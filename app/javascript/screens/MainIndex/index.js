// import * as THREE from 'vendor/three';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

class MainIndexScreen {
  constructor() {

    this.body = document.querySelector('body');

    this._setup();
    // setInterval(() => {
    //   this._animate();
    // }, 100);
  }

  _setup() {
    // var scene = new THREE.Scene();
    // var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    //
    // var renderer = new THREE.WebGLRenderer();
    // renderer.setSize( window.innerWidth, window.innerHeight );
    // document.body.appendChild( renderer.domElement );

    this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10);
    this.camera.position.z = 1;

    this.scene = new THREE.Scene();

    let loader = new GLTFLoader();

    // Optional: Provide a DRACOLoader instance to decode compressed mesh data
    // let dracoLoader = new THREE.DRACOLoader();
    // dracoLoader.setDecoderPath('/examples/js/libs/draco/');
    // loader.setDRACOLoader(dracoLoader);

    // Load a glTF resource
    loader.load(
      // resource URL
      'nimble.glb',
      // called when the resource is loaded
      (gltf) => {
        this.scene.add(gltf.scene);

        gltf.animations; // Array<THREE.AnimationClip>
        gltf.scene; // THREE.Group
        gltf.scenes; // Array<THREE.Group>
        gltf.cameras; // Array<THREE.Camera>
        gltf.asset; // Object
      },
      // called while loading is progressing
      (xhr) => {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
      },
      // called when loading has errors
      (error) => {
        console.log('An error happened', error);
      }
    );

    // this.geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
    // this.material = new THREE.MeshNormalMaterial();
    //
    // this.cube = new THREE.Mesh(this.geometry, this.material);
    // this.scene.add(this.cube);

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    // this.renderer.domElement.addEventListener('wheel', (event) => {
    //   event.preventDefault();
    //
    //   this.cube.translateY(0.001 * event.deltaY);
    //   this.cube.translateX(-0.001 * event.deltaX);
    //
    //   this.renderer.render(this.scene, this.camera);
    // });

    document.body.appendChild(this.renderer.domElement);

    this.renderer.render(this.scene, this.camera);
  };

  _animate() {
    // requestAnimationFrame(this._animate());
    // requestAnimationFrame( animate );

    // this.cube.rotation.x += 0.01;
    // this.cube.rotation.y += 0.02;
    // this.cube.rotation.x += 0.03;

    // this.cube.translate(1,0,0);
    // this.cube.translateOnAxis('x', 0.5);
    this.cube.translateY(0.1);

    this.renderer.render(this.scene, this.camera);

  };
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('body.main.index') !== null) {
    new MainIndexScreen();
  }
});
