module.exports = {
  test: /\.glsl$/,
  exclude: /node_modules/,
  use: [
    'raw-loader',
    'glslify-loader'
  ]
}
