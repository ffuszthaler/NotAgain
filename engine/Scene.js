class Scene {
  actors;

  constructor(actors = []) {
    this.actors = actors;
  }

  init() {}

  update() {}

  addToScene(actor) {
    actors.push(actor);
  }

  removeFromScene(actor) {
    this.actors.splice(this.actors.indexOf(actor), 1);
  }
}

export default Scene;
