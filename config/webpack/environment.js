const { environment } = require('@rails/webpacker')
const glslify = require('./loaders/glslify')
const picture = require('./loaders/picture')

environment.loaders.prepend('glslify', glslify);
environment.loaders.prepend('picture', picture);

module.exports = environment
