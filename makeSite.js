var Nightmare = require("nightmare")
var fs = require("fs-extra")
var http = require("http")
var hash = require("./hash.js")
var resources = []

var port = 8080
var url = "http://localhost:" + port + "/"

fs.existsSync("./dist") && fs.removeSync("./dist")
fs.mkdirSync("./dist")

module.exports = function(cb) {

  return new Nightmare()
    .on("resourceReceived", function(response) {
      if (resources.indexOf(response.url) == -1 && 
          response.url != url &&
          response.url != url + hash &&
          response.url.indexOf(url) > -1) {
        
        resources.push(response.url)
        
        download(response.url, function(data) {
          fs.writeFileSync(
            "./dist/" + response.url
              .replace("http://localhost:9090/", "")
              .replace(url, ""), 
            data
          )
          console.log("saved: " + response.url)
        }) 
      }
    })
    .goto(url + hash)
    .evaluate(function() {
      return "<!DOCTYPE html>\n" + document.documentElement.outerHTML
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
