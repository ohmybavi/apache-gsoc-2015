import express from "express"
import make from "./makeSite.js"
import webpackMiddleware from "webpack-dev-middleware"
import WebpackDevServer from "webpack-dev-server"
import webpack from "webpack"
import fs from "fs-extra"
import autoprefixer from "autoprefixer"
import ExtractTextPlugin from "extract-text-webpack-plugin"

const dev = process.argv[2] == "--dev"
const prod = !dev

const devHost = "localhost"
const devPort = "9090"
const devUrl = "http://" + devHost + ":" + devPort + "/"

console.log((dev? "development" : "production") + " mode")

const app = express()

const entry = prod? "./index.js" : [ 
  "webpack-dev-server/client?" + devUrl,
  "webpack/hot/only-dev-server",
  "./index.js"
]
const publicPath = prod? "/" : devUrl
const plugins = prod? 
  [
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new ExtractTextPlugin("index.css")
  ] 
: 
  [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin("index.css")
  ]

const styleLoaders = "css-loader!postcss-loader!stylus-loader"
const stylus = prod? 
  ExtractTextPlugin.extract("style-loader", styleLoaders)
: 
  "style-loader!" + styleLoaders


const builder = webpack({
  devtool: "eval",
  context: __dirname + "/src/pages/main",
  entry: entry,
  output: {
    path: "/",
    publicPath: publicPath 
  },
  resolve: {
    fallback: [__dirname + "/src/components"],
    extensions: ["", ".webpack.js", ".web.js", ".js", ".jsx"]
  },
  module: {
    loaders: [
      { test: /\.styl$/, 
        exclude: /node_modules/, 
        loader: stylus},
      { test: /\.js$/, 
        exclude: /node_modules/, 
        loaders: ["react-hot", "babel-loader"]},
      { test: /\.jsx$/, 
        exclude: /node_modules/, 
        loaders: ["react-hot", "babel-loader"]},
    ]
  },
  postcss: {
      defaults: [autoprefixer]
  },
  plugins: plugins

})
const middleware = prod? webpackMiddleware(builder, {}) : _ => _

if (dev) {
  new WebpackDevServer(builder, {
    publicPath: publicPath,
    hot: true
  }).listen(devPort, devHost, function(err, result) {
    if (err) {
      console.log(err)
    }
    
    console.log("Webpack server is listening at " + devUrl)
  })
}


const read = x => fs.readFileSync(x, "utf-8")
  .replace(/\{host\}/g, dev? devUrl : "")

app.get("/", (req, res) => {
  res.send(read("src/pages/main/index.html"))
})


app.use(express.static("data"))
  .use(middleware)

const server = app.listen(8080, function () {

  const {address, port} = server.address()

  console.log("Express server is listening at http://%s:%s", address, port)


  if (prod) {
    make(
      _ => {
      server.close()
      middleware.close()
    })
  }

})
