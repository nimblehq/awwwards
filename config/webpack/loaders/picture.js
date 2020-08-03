module.exports = {
  test: /\.(png|jpe?g|gif|svg)$/i,
  loader: 'file-loader',
  options: {
    name: '[name].[ext]',
    outputPath: 'images/',
    esModule: false
  }
}
