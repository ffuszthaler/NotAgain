import GameObject from './GameObject.js';

class Player extends GameObject {
  constructor(context, x, y, width, height, CONFIG) {
    super(context, x, y, width, height, CONFIG);

    // movement direction
    this.dx = 0;
    this.dy = 0;

    // player movement speed multiplier
    this.velocity = 0.3;

    // last direction the player looked
    this.lastDirection = 1;

    // saves all currently pressed keys
    this.currentKeys = {};

    // player state
    this.state = 'idle';
  }

  init() {
    document.addEventListener('keydown', (e) => {
      this.currentKeys[e.code] = true;

      // prevents scrolling if one of these keys is pressed
      if (
        this.currentKeys['ArrowUp'] === true ||
        this.currentKeys['KeyW'] === true ||
        this.currentKeys['ArrowDown'] === true ||
        this.currentKeys['KeyS'] === true ||
        this.currentKeys['ArrowLeft'] === true ||
        this.currentKeys['KeyA'] === true ||
        this.currentKeys['ArrowRight'] === true ||
        this.currentKeys['KeyD'] === true
      ) {
        e.preventDefault();
      }
    });

    document.addEventListener('keyup', (e) => {
      this.currentKeys[e.code] = false;
    });

    // animation sprites
    this.sprites = {
      run: {
        src: '../testGame/assets/run-sprite.png',
        frames: 8,
        fps: 20,
        frameSize: {
          width: 400,
          height: 400,
        },
        image: null,
      },
      idle: {
        src: '../testGame/assets/idle-sprite.png',
        frames: 10,
        fps: 20,
        frameSize: {
          width: 400,
          height: 400,
        },
        image: null,
      },
    };

    // load images
    Object.values(this.sprites).forEach((sprite) => {
      sprite.image = new Image();
      sprite.image.src = sprite.src;
    });
  }

  update(timePassedSinceLastRender) {
    if (this.currentKeys['ArrowUp'] === true) {
      this.dy = -1;
    } else if (this.currentKeys['ArrowDown'] === true) {
      this.dy = 1;
    } else {
      this.dy = 0;
    }

    if (this.currentKeys['ArrowLeft'] === true) {
      this.dx = -1;
    } else if (this.currentKeys['ArrowRight'] === true) {
      this.dx = 1;
    } else {
      this.dx = 0;
    }

    // speed boost
    if (this.currentKeys['Space'] === true) {
      // 1.5x of normal speed (0.3)
      this.velocity = 0.45;
    } else {
      this.velocity = 0.3;
    }

    // save last view direction
    if (this.dx != 0) this.lastDirection = this.dx;

    // bounds detection
    // right
    if (this.x + this.width / 2 > this.CONFIG.width) this.x = this.CONFIG.width - this.width / 2;
    // left
    else if (this.x - this.width / 2 < 0) this.x = 0 + this.width / 2;

    // bottom
    if (this.y + this.height / 2 > this.CONFIG.height) this.y = this.CONFIG.height - this.height / 2;
    // top
    else if (this.y - this.height / 2 < 0) this.y = 0 + this.height / 2;

    // change state depending on movement speed
    this.state = this.dx === 0 && this.dy === 0 ? 'idle' : 'run';
    // console.log(this.state);

    // correct velocity for moving diagonally
    if (this.dx !== 0 && this.dy !== 0) {
      this.dx /= Math.hypot(this.dx, this.dy);
      this.dy /= Math.hypot(this.dx, this.dy);
    }

    // calculate new position
    this.x += timePassedSinceLastRender * this.dx * this.velocity;
    this.y += timePassedSinceLastRender * this.dy * this.velocity;
  }

  render() {
    // run render function from parent class
    super.render();

    // move canvas origin to x and y
    this.context.translate(this.x, this.y);

    // rotate sprite based on direction
    this.context.scale(this.lastDirection, 1);

    // get individual frame coordinates
    let coords = this.getImageSpriteCoordinates(this.sprites[this.state]);

    // draw player with running sprites
    this.context.drawImage(
      this.sprites[this.state].image, // src
      coords.sourceX, // source x
      coords.sourceY, // source y
      coords.sourceWidth, // source width
      coords.sourceHeight, // source height
      -this.width / 2, // dest x
      -this.height / 2, // dest y
      this.width, // dest width
      this.height // dest height
    );

    // reset any remaining transform call
    this.context.resetTransform();
  }

  getImageSpriteCoordinates(sprite) {
    // loop through frames
    let frameX = Math.floor(((performance.now() / 1000) * sprite.fps) % sprite.frames);

    let coords = {
      sourceX: frameX * sprite.frameSize.width,
      sourceY: 0,
      sourceWidth: sprite.frameSize.width,
      sourceHeight: sprite.frameSize.height,
    };

    return coords;
  }

  getBoundingBox() {
    let bb = super.getBoundingBox();

    // shrinking bounding box of player to fit sprite
    // width: 20% | 60% | 20% = 100%
    bb.w = bb.w * 0.6;
    bb.x = bb.x + this.width * 0.2;

    // height: 10% | 80% | 10% = 100%
    bb.h = bb.h * 0.8;
    bb.y = bb.y + this.height * 0.1;

    return bb;
  }
}

export default Player;
