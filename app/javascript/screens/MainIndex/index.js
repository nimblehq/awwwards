import Canvas, { DEFAULT_SELECTOR as CANVAS_SELECTOR } from '../../components/Canvas';

class MainIndexScreen {
  constructor() {
    this.canvasElement = document.querySelector(CANVAS_SELECTOR);

    this._setup();
  }

  _setup() {
    this.canvas = new Canvas(this.canvasElement);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('body.main.index') !== null) {
    new MainIndexScreen();
  }
});
