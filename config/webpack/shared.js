const { join, resolve } = require('path');
const { sync } = require('glob');
const polyfillDir = resolve('app', 'javascript', 'polyfills');

const polyfills = [
  ...sync(join(polyfillDir, '*.js')).map(polyfill => {
    return polyfill;
  })
];

module.exports = {
  polyfills
}
