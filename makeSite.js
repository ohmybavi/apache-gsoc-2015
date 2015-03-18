var fs = require("fs-extra")
var http = require("http")
var Nightmare = require("nightmare")

var has = function(x, y) {return y.indexOf(x) > -1}
var eq = function(x, y) {return x == y}

var hash = require("./hash.js")
var port = 8080
var hostname = "localhost"
var host = "http://" + hostname + ":" + port + "/"
var href = host + hash
var downloaded = []
var visited = [href]

fs.existsSync("./dist") && fs.removeSync("./dist")
fs.mkdirSync("./dist")

module.exports = function(cb) {

  var nightmare = new Nightmare()
    .on("resourceReceived", function(response) {
      var url = response.url
      
      if (!has(url, downloaded) && !eq(url, href) && has(hostname, url)) {
        
        downloaded.push(url)
        
        download(url, function(data) {
          fs.writeFileSync(
            "./dist/" + url.replace(host, ""), 
            data
          )
          console.log("saved: " + url)
        }) 
      }
    })

  var scraper = function() {
    return {
      html: "<!DOCTYPE html>\n" + document.documentElement.outerHTML,
      links: Array.prototype 
        .map.call(
          document.querySelectorAll("a"), 
          function(x) {return x.href})
    }
  }
  
  var scraperCallback = function(data) {
    data.html && fs.writeFileSync("./dist/" + "index.html", data.html)
    data.links && data.links
    .filter(function(x) {return has(x, hostname)})
    .forEach(function(x) {
      if (!has(x, visited)) {
        visited.push(x) 
        nightmare.goto(x).evaluate(scraper, scraperCallback)
      }
    })
  } 

  nightmare
    .goto(href)
    .evaluate(scraper, scraperCallback)
    .run(function(err, n) {
      console.log("done building")
      cb()
    })
}


function download(url, cb) {
  var data = ""

  http.get(url, function(res) {
    res.on("data", function(chunk) {data += chunk})
    res.on("end", function() {cb(data)})
  }).on("error", function(e) {console.log("Error: " + e.message)})
}
