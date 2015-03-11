import React from "react"
import Detail from "./detail.jsx"

export default React.createClass({
  render: function() {
    const ideas = this.props.data
    return (
      <ul className="list">{ideas.map((x, i) => 
        <li>
          <div>
            <input 
              className="list-trigger" 
              id={"trigger-" + i} 
              type="checkbox" />
            <label 
              className="list-label"
              htmlFor={"trigger-" + i}>
              {x.project}: {x.summary}
            </label>
            <Detail className="list-detail" {...x} />
          </div>
        </li>)}
      </ul>
    )
  }
})
