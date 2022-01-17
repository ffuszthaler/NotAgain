// Everything surrounding randomness

let randomNumberBetween = (minRandomNumber, maxRandomNumber) => {
  return Math.floor(Math.random() * (maxRandomNumber - minRandomNumber + 1) + minRandomNumber);
};

class Random {
  constructor(callback, options = { min: 1000, max: 5000 }) {
    if (typeof callback !== 'function') throw Error('Callback must be a function.');

    this.callback = callback;
    this.options = options;

    this.loop();
  }

  loop() {
    let wait = randomNumberBetween(this.options.min, this.options.max);

    if (this.timeout) window.clearTimeout(this.timeout);

    this.timeout = window.setTimeout(() => {
      this.callback();
      this.loop();
    }, wait);
  }
}

export default RandomDispatcher;

export { randomNumberBetween };
