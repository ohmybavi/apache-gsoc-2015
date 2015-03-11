var Nightmare = require("nightmare")
var fs = require("fs")
var resources = []
var http = require("http")

var port = 8080
var url = "http://localhost:" + port + "/"

new Nightmare()
.on("resourceReceived", function(response) {
  if (resources.indexOf(response.url) == -1 && response.url != url) {
    resources.push(response.url)
  }
})
.goto(url)
.evaluate(function() {
  return document.documentElement.outerHTML
}, function(data) {
  fs.writeFileSync("./dist/index.html", data)
})
.run(function(err, n) {
  resources.forEach(function(r) {
    download(r, function(data) {
      fs.writeFileSync("./dist/" + r.replace(url, ""), data) 
    }) 
  })
})

function download(url, cb) {

  var data = "";
  var request = http.get(url, function(res) {

    res.on('data', function(chunk) {
      data += chunk;
    });

    res.on('end', function() {
      cb(data);
    })
  });

  request.on('error', function(e) {
    console.log("Got error: " + e.message);
  });
}
