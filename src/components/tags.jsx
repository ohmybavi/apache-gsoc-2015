import React from "react"
import {addLabel, removeLabel} from "../util/getData.js"

export default React.createClass({
  tagClickHandler(x) {
    return function(e) {
      if (e.target.className == "tag-add") {
        addLabel(x)      
      }
      else if (e.target.className == "tag-remove") {
        removeLabel(x)  
      }
      // update(ys => ys.filter(y => y.labels.indexOf(x) > - 1))
    }
  },
  render: function() {
    const labels = Object.keys(this.props.labels)
    return (
      <ul className="tags">
        {labels.map(x => 
          <li className="tag" onClick={this.tagClickHandler(x)}> 
            <label className="tag-add">{x}</label>
            <label className="tag-remove">
              {this.props.labels[x]? " x" : ""}
            </label>
          </li>)}
      </ul>
    )
  }
})
