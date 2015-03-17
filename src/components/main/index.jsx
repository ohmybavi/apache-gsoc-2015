import React from "react"
import List from "list"
import TagFilter from "tag-filter"
import Toggle from "toggle"
import Count from "count"
import {toggle, removeLabel} from "../../util/getData.js"
import Tags from "tags"
import style from "./index.styl"

export default React.createClass({
  clickHandler(cb) {
    return _ => this.props.activeLabels.forEach(cb)
  },
  render: function() {
    const {proposals, projects, labels, activeLabels} = this.props    
    const isModified = activeLabels.length > 0 
    return (
      <div className="main">
        <input id="tags--toggle" className="main--toggle-tags" type="checkbox"/>
        <div className="main--cover">
          <h1 className="main--header">Apache Software Foundation Proposals</h1>
          <h2 className="main--header">Google Summer of Code</h2>
        </div>
        <div className="main--toolbar">
          <Count className="main--count" data={proposals.length}>
            Proposal
          </Count>
          <span> in </span>
          <Count className="main--count" data={projects.length}>
            Project 
          </Count>
          <span> </span>
          <label 
            className="main--reset-tags"
            onClick={this.clickHandler(removeLabel)}
            style={{display: isModified? "inline-block" : "none"}}>
            (Show all)
          </label>
          <label className="main--show-tags" htmlFor="tags--toggle">
            labels
          </label>
        </div>
        <Tags className="main--tag-list" 
          activeLabels={activeLabels}
          labels={labels} />
        <List className="main--list" data={projects} />
      </div>
    )
  }
})

