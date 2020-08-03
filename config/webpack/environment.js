const { environment } = require('@rails/webpacker')
const glslify = require('./loaders/glslify')

environment.loaders.prepend('glslify', glslify);

module.exports = environment
