import React from "react"
import List from "./list.jsx"
import TagFilter from "./tagFilter.jsx"
import {filterByProject} from "../util/getData.js"
import Toggle from "./toggle.jsx"


export default React.createClass({
  clickHandler(cb) {
    return _ => Object.keys(this.props.labels).forEach(cb)
  },
  render: function() {
    return (
      <div className="main">
        <h1 className="main--header">Google Summer of Code</h1>
        <input className="main--filter-by-title"
          placeholder="filter by project"
          onChange={e => filterByProject(e.target.value)}>
        </input>
        <Toggle className="main--show-tags" fn="and">
          <label>Show / hide tags</label>
          <TagFilter className="show-tags--tags" 
            activeLabels={this.props.activeLabels}
            labels={this.props.labels} />
        </Toggle>
        <List data={this.props.data} />
      </div>
    )
  }
})
