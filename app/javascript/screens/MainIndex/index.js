import Canvas, { CONTAINER_SELECTOR, DEFAULT_SELECTOR as CANVAS_SELECTOR } from '../../components/Canvas';

// const CONTAINER_SELECTOR = '.container';

class MainIndexScreen {
  constructor() {
    this.containerElement = document.querySelector(CONTAINER_SELECTOR);
    this.canvasElement = this.containerElement.querySelector(CANVAS_SELECTOR);

    this._setup();
  }

  _setup() {
    this.canvas = new Canvas(this.canvasElement, this.containerElement);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('body.main.index') !== null) {
    new MainIndexScreen();
  }
});
