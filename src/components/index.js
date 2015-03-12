import getData from "../util/getData.js"
import App from "./index.jsx"
import React from "react"
import style from "./index.styl"

getData.init(
  "http://localhost:8080/data.json",
  (data, labels, activeLabels) => React.render(
    <App data={data} labels={labels} activeLabels={activeLabels}/>,
    document.querySelector(".container")
  )
)

