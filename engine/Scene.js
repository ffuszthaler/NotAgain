import GLOBAL from './Globals.js';

class Scene {
  actors;

  constructor() {
    this.actors = [];

    this.init();
  }

  init() {}

  render() {
    this.actors.forEach((actor) => {
      actor.render();
    });
  }

  update() {
    this.actors.forEach((actor) => {
      actor.update(GLOBAL.deltaTime);
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
