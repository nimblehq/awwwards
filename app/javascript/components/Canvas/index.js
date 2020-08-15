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
    makeCube(geometry, -5, -1, -4.5);
    makeCube(geometry, 7, -1, -8);
    makeCube(geometry, 2, -2.5, -3);
    makeCube(geometry, -2, 2.2, -2);

    drawTriangle(7, -1, -8);
    drawTriangle(-5, -1, -4.5);

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

    function makeCube(geometry, positionX, positionY, positionZ) {
      const material = new THREE.MeshBasicMaterial({color: 0xcc3344});
      let cube = new THREE.Mesh(geometry, material);
      cube.position.set(positionX, positionY, positionZ);

      scene.add(cube);
    }

    function drawTriangle(positionX, positionY, positionZ) {
      const vector1 = new THREE.Vector3(0, 0, 0);
      const vector2 = new THREE.Vector3(5, 0, 0);
      const vector3 = new THREE.Vector3(5, 5, 0);

      const geometry = new THREE.Geometry();
      geometry.vertices.push(vector1, vector2, vector3);
      geometry.faces.push(new THREE.Face3(0, 1, 2));

      const material = new THREE.MeshBasicMaterial({color: 0x2B2050});
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(positionX, positionY, positionZ);
      mesh.rotateZ(Math.floor(Math.random() * 10));

      scene.add(mesh);
    }

    element.addEventListener('mousemove', (event) => {
      event.preventDefault();

      const maxHeight = element.clientHeight;
      const maxWidth = element.clientWidth;

      let movementX = event.clientX / maxWidth;
      let movementY = -event.clientY / maxHeight;
      let sensitivity = 0.45;
      camera.position.x = sensitivity * movementX;
      camera.position.y = sensitivity * movementY;

      // console.log('X', x, camera.position.x);
      // console.log('Y', y, camera.position.y);
      camera.updateProjectionMatrix();
    });
  }

  _setupCamera() {
    const fov = 75;
    const aspect = 2;// the canvas default
    const near = 0.1;
    const far = 10;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

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
