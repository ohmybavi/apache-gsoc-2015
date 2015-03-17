import React from "react"
import hash from "../../hash"

export default (App, container) => {
  const _container = document.querySelector(container)
  
  if (location.hash == hash) {
    return data => 
      _container.innerHTML = React.renderToString(<App {...data}/>)
  } else {
    return data => React.render(<App {...data}/>, _container)
  }

}

