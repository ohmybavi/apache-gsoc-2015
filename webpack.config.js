var ExtractTextPlugin = require("extract-text-webpack-plugin")
var autoprefixer = require("autoprefixer")

module.exports = {
  context: __dirname + "/src/pages/main",
  entry: "./index.js",
  output: {
    path: __dirname + "/src/pages/main",
    filename: "bundle.js"
  },
  resolve: {
    fallback: [__dirname + "/src/components"],
    extensions: ["", ".webpack.js", ".web.js", ".js", ".jsx"]
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
