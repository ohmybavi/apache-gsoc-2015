import getData from "../../util/getData.js"
import App from "main"
import React from "react"

getData.init(
  data => React.render(
    <App {...data}/>,
    document.querySelector(".container")
  )
)

