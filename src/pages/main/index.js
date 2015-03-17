import getData from "../../util/getData.js"
import App from "main"
import React from "react"


if (location.hash == "#prerender") {
console.log("hello")
  getData.init(
    data => document.querySelector(".container").innerHTML = 
      React.renderToString(<App {...data}/>)
  )
} else {
  getData.init(
    data => React.render(
      <App {...data}/>,
      document.querySelector(".container")
    )
  )
}




