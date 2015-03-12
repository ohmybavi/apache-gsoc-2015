import express from "express"
import make from "./makeSite.js"

const app = express()

app.use(express.static("data"))
app.use(express.static("src/pages/main"))

const server = app.listen(8080, function () {

  const {address, port} = server.address()

  console.log('Example app listening at http://%s:%s', address, port)
  make(server.close.bind(server))


})
