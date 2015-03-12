import React from "react"
import Tags from "./tags.jsx"
import {addLabel, removeLabel} from "../util/getData.js"

export default React.createClass({
  clickHandler(cb) {
    return _ => Object.keys(this.props.labels).forEach(cb)
  },
  render: function() {
    return (
      <div className={this.props.className}>
        <label className="tags--clear"
          onClick={this.clickHandler(removeLabel)}>
          Clear filter 
        </label>
        <Tags className="tags--tag-list" 
          activeLabels={this.props.activeLabels}
          labels={this.props.labels} />
      </div>
    )
  }
})
