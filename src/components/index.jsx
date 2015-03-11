import React from "react"
import List from "./list.jsx"
import TagFilter from "./tagFilter.jsx"
import {filterByProject} from "../util/getData.js"

export default React.createClass({
  clickHandler(cb) {
    return _ => Object.keys(this.props.labels).forEach(cb)
  },
  render: function() {
    return (
      <div>
        <h1 className="top-header">Google Summer of Code</h1>
        <input 
          className="tag-trigger" 
          id="tag-trigger" 
          type="checkbox" />
        <label className="tag-filter-show-hide"
          htmlFor="tag-trigger">
        Show / hide tags</label>
        <input className="top-title-filter"
          placeholder="filter by project"
          onChange={e => filterByProject(e.target.value)}
        ></input>
        <TagFilter className="top-tag-filter" labels={this.props.labels} />
        <List data={this.props.data} />
      </div>
    )
  }
})
