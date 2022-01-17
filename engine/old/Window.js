// Responsible to gain access to the HTML element

// OLD CODE - NOT USED IN PRODUCTION

class Window {
  #canvas;
  #ctx;

  #width;
  #height;

  constructor(canvas, width, height) {
    this.#canvas = canvas;
    this.#ctx = this.#canvas.getContext('2d');

    // size
    this.#width = width;
    this.#height = height;

    this.init();
  }

  get ctx() {
    return this.#ctx;
  }

  init() {
    // size canvas accordingly
    this.#canvas.setAttribute('width', this.#width);
    this.#canvas.setAttribute('height', this.#height);
  }

  update() {}

  render() {}
}

export default Window;
