import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export const DEFAULT_SELECTOR = '.canvas';

class Canvas {
  constructor(elementRef) {
    this.elementRef = elementRef;

    this._setup(this.elementRef);
  }

  _setup(element) {
    var scene = new THREE.Scene();
    var camera;

    var renderer = new THREE.WebGLRenderer({
      antialias: true
    });
    renderer.setClearColor(0x808080);
    // renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setSize(element.clientWidth, element.clientHeight);
    // renderer.setPixelRatio( window.devicePixelRatio );

    // document.body.appendChild(renderer.domElement);
    element.appendChild(renderer.domElement);

    // var light = new THREE.HemisphereLight(0xffffff, 0x080820, 1);
    // var light2 = new THREE.RectAreaLight(0xffffff,  1, 100, 100);
    // scene.add(light);
    // scene.add(light2);

    var loader = new GLTFLoader();

    loader.load( 'nimble.glb', (gltf) => {
      scene.add(gltf.scene);

      console.log(gltf.animations);
      console.log(gltf.scene);
      console.log(gltf.scenes);
      console.log(gltf.cameras);
      console.log(gltf.asset);

      camera = gltf.cameras[0];
      console.log('camera', camera);
      console.log('camera position', camera.position);

      camera.position.set(30.609, 27, -31.609);
      camera.rotateX(60);
      camera.rotateY(45);
      camera.rotateZ(0);
      // camera.near = 1;
      // camera.far = 60;

      // gltf.scene.children.forEach((child) => {
      //   scene.add(child);
      // });

      this._setupLight(scene);

      new OrbitControls(camera, renderer.domElement);

      render(element);
    }, undefined, (error) => {
      console.error(error);
    });

    function render(element) {
      requestAnimationFrame(render);
      renderer.render(scene, camera);

      if (resize(renderer)) {
        // camera.aspect = element.clientWidth / element.clientHeight;
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
      }
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
  }

  _setupLight(scene) {
    var rectLight = new THREE.RectAreaLight(0xffffff, 1, 1024, 1024);
    rectLight.position.set(-9, -16.292, 11.152);
    rectLight.lookAt(0, 0, 0);
    scene.add(rectLight);

    var rectLight2 = new THREE.RectAreaLight(0xffffff, 1, 1024, 1024);
    rectLight2.position.set(0, 0.97926, 15.176);
    rectLight2.lookAt(0, 0, 0);
    scene.add(rectLight2);

    // let rectLightHelper = new THREE.RectAreaLightHelper(rectLight);
    // rectLight.add(rectLightHelper);
  }
}

export default Canvas;
