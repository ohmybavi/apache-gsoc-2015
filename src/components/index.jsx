import React from "react"
import List from "./list.jsx"
import TagFilter from "./tagFilter.jsx"

export default React.createClass({
  clickHandler(cb) {
    return _ => Object.keys(this.props.labels).forEach(cb)
  },
  render: function() {
    return (
      <div>
        <h1 className="top-header">Google Summer of Code</h1>
        <TagFilter className="top-tag-filter" labels={this.props.labels} />
        <List data={this.props.data} />
      </div>
    )
  }
})
