class Scene {
  actors;

  constructor() {
    this.actors = [];

    this.init();
  }

  init() {}

  update(deltaTime) {
    this.actors.forEach((actor) => {
      actor.update(deltaTime);
    });
  }

  render() {
    this.actors.forEach((actor) => {
      actor.render();
    });
  }

  addToScene(actor) {
    this.actors.push(actor);
  }

  removeFromScene(actor) {
    this.actors.splice(this.actors.indexOf(actor), 1);
  }
}

export default Scene;
