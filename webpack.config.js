module.exports = {
  context: __dirname + "/src/components",
  entry: "./index.js",
  output: {
    path: __dirname + "/src/site/",
    filename: "bundle.js"
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
      { test: /\.jsx$/, exclude: /node_modules/, loader: 'babel-loader'},
    ]
  }
}
