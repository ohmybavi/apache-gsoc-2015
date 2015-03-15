import React from "react"
import Detail from "detail"
import style from "./index.styl"

export default React.createClass({
  render: function() {
    // const ideas = this.props.data
    return (
      <ul className="list">{this.props.data.map(x => 
        <li>
          <div>
            {x.project}
            <ul>
            {x.proposals.map((x, i) =>
              <li>
                <input 
                  className="list-trigger" 
                  id={"trigger-" + x.project + i} 
                  type="checkbox" />
                <label 
                  className="list-label"
                  htmlFor={"trigger-" + x.project + i}>
                {x.summary}
                </label>
                <Detail className="list-detail" {...x} />
              </li>
            )}
            </ul>
          </div>
        </li>)}
      </ul>
    )
  }
})
