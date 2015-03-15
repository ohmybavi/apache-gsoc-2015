import React from "react"
import List from "list"
import TagFilter from "tag-filter"
import Toggle from "toggle"
import Count from "count"
import {removeLabel} from "../../util/getData.js"
import Tags from "tags"
import style from "./index.styl"

export default React.createClass({
  clickHandler(cb) {
    return _ => Object.keys(this.props.labels).forEach(cb)
  },
  componentWillMount() {
    this.setState({
      proposals: this.props.proposals
    })
  },
  render: function() {
    const {proposals, projects, labels, activeLabels} = this.props    
    const isModified = proposals.length < this.state.proposals.length 
    console.log(proposals.length)    
    return (
      <div className="main">
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
          <label 
            className="main--show-tags"
            onClick={e => 
              this.setState({tagsVisible: !this.state.tagsVisible})}>
            {this.state.tagsVisible? "Hide " : "Show "} labels
          </label>
        </div>
        <Tags className="tags--tag-list" 
          style={{display: this.state.tagsVisible? "block" : "none"}}
          activeLabels={activeLabels}
          labels={labels} />
        <List className="main--list" data={projects} />
      </div>
    )
  }
})

          // <Toggle 
          //   className="main--show-tags" 
          //   onClick={e => {
          //     console.log(e.target)
          //     this.setState({tagsVisible: !this.state.tagsVisible})
          //   }}
          //   fn="and" 
          //   label="Labels v">
          // </Toggle>

            // <TagFilter className="show-tags--tags" 
            //   activeLabels={activeLabels}
            //   labels={labels} />
