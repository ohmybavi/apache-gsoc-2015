import getData from "../../util/getData.js"
import App from "main"
import React from "react"

getData.init(
  "http://localhost:8080/data.json",
  (data, labels, activeLabels) => React.render(
    <App 
      proposals={data.proposals}
      projects={data.projects}
      labels={labels} 
      activeLabels={activeLabels}/>,
    document.querySelector(".container")
  )
)

