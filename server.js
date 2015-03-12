import express from "express"

const app = express()

app.use(express.static("src/components/"))
app.use(express.static("src/site/"))

const server = app.listen(8080, function () {

  const {address, port} = server.address()

  console.log('Example app listening at http://%s:%s', address, port)

})
