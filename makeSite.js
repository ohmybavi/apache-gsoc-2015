var Nightmare = require("nightmare")
var fs = require("fs-extra")
var http = require("http")
var resources = []

var port = 8080
var url = "http://localhost:" + port + "/"

fs.existsSync("./dist") && fs.removeSync("./dist")
fs.mkdirSync("./dist")

module.exports = function(cb) {

  return new Nightmare()
    .on("resourceReceived", function(response) {
      if (resources.indexOf(response.url) == -1 && response.url != url) {
        resources.push(response.url)
        download(response.url, function(data) {
          fs.writeFileSync("./dist/" + response.url.replace(url, ""), data)
          console.log("saved: " + response.url)
        }) 
      }
    })
    .goto(url)
    .evaluate(function() {
      return document.documentElement.outerHTML
    }, function(data) {
      fs.writeFileSync("./dist/index.html", data)
    })
    .run(function(err, n) {
      console.log("done")
      cb()
    })
}


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
