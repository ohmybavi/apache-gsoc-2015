import getData from "../util/getData.js"
import App from "./index.jsx"
import React from "react"

getData.init(
  "http://localhost:8080/data.json",
  (data, labels) => React.render(
    <App data={data} labels={labels}/>,
    document.querySelector(".container")
  )
)

