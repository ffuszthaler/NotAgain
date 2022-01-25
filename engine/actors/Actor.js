// Actor parent class for layout and basic logic
// Every 'actor' inside the scene inherits this

class Actor {
  constructor(x, y, width, height) {
    this.x;
    this.y;

    this.width;
    this.height;
  }

  init() {}

  update(deltaTime) {}

  render() {}
}

export default Actor;
