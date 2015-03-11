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
        <label className="tag-filter-add-all"
          onClick={this.clickHandler(addLabel)}>
          Add all
        </label>
        <label className="tag-filter-remove-all"
          onClick={this.clickHandler(removeLabel)}>
          Remove all
        </label>
        <Tags labels={this.props.labels} />
      </div>
    )
  }
})
