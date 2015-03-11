import React from "react"
import List from "./list.jsx"
import Tags from "./tags.jsx"
import {update} from "../util/getData.js"

export default React.createClass({
  render: function() {
    return (
      <div>
        <h1 className="top-header">Google Summer of Code</h1>
        <Tags labels={this.props.labels} />
        <List data={this.props.data} />
      </div>
    )
  }
})
