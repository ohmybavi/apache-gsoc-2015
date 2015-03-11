import React from "react"
import List from "./list.jsx"
import Tags from "./tags.jsx"
import {addLabel, removeLabel} from "../util/getData.js"

export default React.createClass({
  clickHandler(cb) {
    return _ => Object.keys(this.props.labels).forEach(cb)
  },
  render: function() {
    return (
      <div>
        <h1 className="top-header">Google Summer of Code</h1>
        <label className="top-add-all"
          onClick={this.clickHandler(addLabel)}>
          Add all
        </label>
        <label className="top-remove-all"
          onClick={this.clickHandler(removeLabel)}>
          Remove all
        </label>
        <Tags labels={this.props.labels} />
        <List data={this.props.data} />
      </div>
    )
  }
})
