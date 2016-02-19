/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import express from "express"
import make from "./makeSite.js"
import webpackMiddleware from "webpack-dev-middleware"
import WebpackDevServer from "webpack-dev-server"
import webpack from "webpack"
import fs from "fs-extra"
import autoprefixer from "autoprefixer"
import ExtractTextPlugin from "extract-text-webpack-plugin"
import rupture from "rupture"

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
const devtool = prod? null : "eval"
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
  devtool: devtool,
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
      { test: /\.json$/,
        exclude: /node_modules/,
        loader: "json"},
      { test: /\.styl$/,
        exclude: /node_modules/,
        loader: stylus},
      { test: /\.js$/,
        exclude: /node_modules/,
        loaders: ["react-hot", "babel-loader"]},
      { test: /\.jsx$/,
        exclude: /node_modules/,
        loaders: ["react-hot", "babel-loader"]},
      { test: /\.woff(2)?([\?]?.*)?$/,
        loader: "url-loader?limit=10000&minetype=application/font-woff" },
      { test: /\.(ttf|eot|svg)([\?]?.*)?$/,
        loader: "file-loader" }
    ]
  },
  stylus: {
    use: [rupture()]
  },
  postcss: {
    defaults: [autoprefixer]
  },
  plugins: plugins,
  externals: {React: "React"}

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


app.use(express.static("src/fonts"))
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
