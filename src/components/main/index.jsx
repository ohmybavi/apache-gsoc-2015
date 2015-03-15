import React from "react"
import List from "list"
import TagFilter from "tag-filter"
import Toggle from "toggle"
import Count from "count"
import style from "./index.styl"

export default React.createClass({
  clickHandler(cb) {
    return _ => Object.keys(this.props.labels).forEach(cb)
  },
  render: function() {
    const {proposals, projects, labels, activeLabels} = this.props    

    return (
      <div className="main">
        <h1 className="main--header">Apache Software Foundation Proposals</h1>
        <h2 className="main--header">Google Summer of Code</h2>
        <Count className="main--count" data={projects.length}>
          Projects
        </Count>
        <Count className="main--count" data={proposals.length}>
          Proposals
        </Count>
        <Toggle className="main--show-tags" fn="and" label="Labels v">
          <TagFilter className="show-tags--tags" 
            activeLabels={activeLabels}
            labels={labels} />
        </Toggle>
        <List className="main--list" data={projects} />
      </div>
    )
  }
})
