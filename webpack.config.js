var ExtractTextPlugin = require("extract-text-webpack-plugin")
var autoprefixer = require("autoprefixer")

module.exports = {
  context: __dirname + "/src/components",
  entry: "./index.js",
  output: {
    path: __dirname + "/src/site/",
    filename: "bundle.js"
  },
  module: {
    loaders: [
      { test: /\.styl$/, 
        exclude: /node_modules/, 
        loader: ExtractTextPlugin.extract(
          "style-loader", 
          "css-loader!postcss-loader!stylus-loader")},
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
      { test: /\.jsx$/, exclude: /node_modules/, loader: 'babel-loader'},
    ]
  },
  postcss: {
      defaults: [autoprefixer]
  },
  plugins: [
      new ExtractTextPlugin("index.css")
  ]
}
