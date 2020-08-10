import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { BloomPass } from 'three/examples/jsm/postprocessing/BloomPass.js';
import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass.js';

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
    var camera = this._setupCamera();
    this._setupLight(scene);

    var renderer = new THREE.WebGLRenderer({
      element,
      antialias: true
    });
    renderer.setSize(element.clientWidth, element.clientHeight);
    // renderer.setClearColor(0x808080);

    element.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    makeCube(geometry, 0xcc3344, -5, -1, -4.5);
    makeCube(geometry, 0xcc3344, 7, -1, -8);
    makeCube(geometry, 0xcc3344, 2, -2.5, -3);
    makeCube(geometry, 0xcc3344, -2, 2.2, -2);

    // scene.add(cube);

    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));

    const bloomPass = new BloomPass(
      1,
      25,
      4,
      256
    );
    composer.addPass(bloomPass);

    const filmPass = new FilmPass(
      0,
      0,
      0,
      false
    );
    filmPass.renderToScreen = true;
    composer.addPass(filmPass);

    requestAnimationFrame(render);

    function render() {
      if (resize(renderer)) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
        composer.setSize(canvas.width, canvas.height);
      }

      composer.render();
      // renderer.render(scene, camera);
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

    function makeCube(geometry, color, positionX, positionY, positionZ) {
      const material = new THREE.MeshBasicMaterial({color: 0xcc3344});
      let cube = new THREE.Mesh(geometry, material);
      cube.position.set(positionX, positionY, positionZ);

      scene.add(cube);
    }

    element.addEventListener('mousemove', (event) => {
      event.preventDefault();
      // camera.setFocalLength(35);
      // const x = event.clientX;
      // const y = event.clientY;
      const sensitivity = 0.3;
      const maxHeight = element.clientHeight;
      const maxWidth = element.clientWidth;
      // camera.setRotationFromAxisAngle()
      // camera.position.x = camera.position.x + x * 0.5;
      // camera.position.y = camera.position.y + y * 0.5;
      const movementX = (event.movementX * Math.PI * sensitivity) / 180;
      const movementY = (-event.movementY * Math.PI * sensitivity) / 180;

      // console.log('maxWidth', maxWidth);
      // console.log('maxHeight', maxHeight);
      // const movementX = (event.movementX / maxWidth) * 100;
      // const movementY = (-event.movementY / maxHeight) * 100;
      // console.log('movementX', movementX);
      // console.log('movementY', movementY);
      camera.position.x = camera.position.x + movementX;
      camera.position.y = camera.position.y + movementY;
      camera.updateProjectionMatrix();
    });
  }

  _setupCamera() {
    const fov = 75;
    const aspect = 2;// the canvas default
    const near = 0.1;
    const far = 10;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    // camera.position.set(0, 0, 0);
    // camera.position.set(-2, 1, -3);
    // camera.position.x = 2;
    // camera.position.y = 1;
    // camera.position.z = 3;

    return camera;
  }

  _setupLight(scene) {
    // const light = new THREE.SpotLight(0xffffff,1);
    // light.position.set(0,0,0);
    // scene.add(light);

    // const light = new THREE.DirectionalLight(0xffffff, 2);
    // light.position.set(2, 1, 3);
    // scene.add(light);

    // const light2 = new THREE.AmbientLight(0xffffff, 5);
    // light2.position.set(0,0,0);
    // scene.add(light2);

    // var rectLight = new THREE.RectAreaLight(0xffff00, 1, 1024, 1024);
    // rectLight.position.set(0, 0, 0);
    // rectLight.lookAt(0, 0, 0);
    // scene.add(rectLight);

    // var rectLight = new THREE.RectAreaLight(0xffffff, 1, 1024, 1024);
    // rectLight.position.set(-9, -16.292, 11.152);
    // rectLight.lookAt(0, 0, 0);
    // scene.add(rectLight);

    // var rectLight2 = new THREE.RectAreaLight(0xffffff, 1, 1024, 1024);
    // rectLight2.position.set(0, 0.97926, 15.176);
    // rectLight2.lookAt(0, 0, 0);
    // scene.add(rectLight2);
  }
}

export default Canvas;
